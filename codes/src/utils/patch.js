export function compareTowVnode(vnode, newVnode, node) {
  let { parentNode } = node;
  if (!vnode) {
    // 第一次进来
    node.vNode = newVnode;
  } else if (!newVnode) {
    node.vNode = null;
    // 把真实节点从父节点里删除:
    parentNode.removeChild(node);
  } else if (
    vnode.nodeType !== newVnode.nodeType ||
    vnode.nodeName !== newVnode.nodeName
  ) {
    // 拿到真实dom节点替换
    let dom = newVnode.vDom.cloneNode(true);
    dom.vNode = newVnode
    parentNode.replaceChild(dom, node);
  } else {
    // 相同类型 则更新
    updateVnode(vnode, newVnode, node);
  }
}

function updateVnode(vnode, newVnode, node) {
  updateVChildren(vnode, newVnode, node);
//   updateVelem(vnode, newVnode, node);
}

function updateVChildren(vnode, newVnode, node) {
  // 更新children，产出三个patch数组
  let patches = {
    removes: [],
    updates: [],
    creates: []
  };
  diffVchildren(patches, vnode, newVnode, node);
  eachApply(patches.removes, applyDestroy);
  eachApply(patches.updates, applyUpdate);
  eachApply(patches.creates, applyCreate);
}

function updateVelem(vnode, newVnode, node) {

}

function diffVchildren(patches, vnode, newVnode, node){
    if (!node.vNode) return 

    let { childNodes, vNode: { childNodes: vchildren} } = node
    let newVchildren = node.vNode.childNodes = newVnode.childNodes
    let vchildrenLen = vchildren.length
    let newVchildrenLen = newVchildren.length

    if (vchildrenLen === 0) {
        if (newVchildrenLen > 0) {
            for (let i = 0; i < newVchildrenLen; i++) {
                patches.creates.push({
                    vnode: newVchildren[i],
                    parentNode: node,
                    index: i,
                })
            }
        }
        return
    } else if (newVchildrenLen === 0) {
        for (let i = 0; i < vchildrenLen; i++) {
            patches.removes.push({
                vnode: vchildren[i],
                node: childNodes[i],
            })
        }
        return
    }


    let updates = Array(newVchildrenLen)
    let removes = null
    let creates = null

    // 找相同节点
    for (let i = 0; i < vchildrenLen; i++) {
        let vnode = vchildren[i]
        for (let j = 0; j < newVchildrenLen; j++) {
            if (updates[j]) {
                continue
            }
            let newVnode = newVchildren[j]
            if (eqeuls(vnode ,newVnode)) {
                updates[j] = {
                    vnode: vnode,
                    newVnode: newVnode,
                    node: childNodes[i],
                    index: j,
                }
                vchildren[i] = null
                break
            }
        }
    }

    // 移除没找到的老节点
    for (let i = 0; i < vchildrenLen; i++) {
        let vnode = vchildren[i]
        if (vnode === null) {
            continue
        }
        // 将没找到的就删掉
        let shouldRemove = true
        if (shouldRemove) {
            if (!removes) {
                removes = []
            }
            removes.push({
                vnode: vnode,
                node: childNodes[i]
            })
        }
    }

    // 递归处理新增
    for (let i = 0; i < newVchildrenLen; i++) {
        let item = updates[i]
        if (!item) {
            if (!creates) {
                creates = []
            }
            creates.push({
                vnode: newVchildren[i],
                parentNode: node,
                index: i,
            })
        } else {
            if(item.vnode.nodeType !== 3 ) diffVchildren(patches, item.vnode, item.newVnode, item.node)
        }
    }

    if (removes) {
        patches.removes.push(removes)
    }
    if (creates) {
        patches.creates.push(creates)
    }
    patches.updates.push(updates)
}

function eachApply(arr, func) {
    let len = arr.length
    for (let i = 0; i < len; i++) {
        const element = arr[i];
        if(Array.isArray(element)){
            eachApply(element, func)
        }else{
            func(element)
        }
    }
}

// 属性更新
function applyUpdate(data) {
    // if (!data) {
    //     return
    // }
    // let vnode = data.vnode
    // let newNode = data.node

    // // update
    // if (!data.shouldIgnore) {
    //     if (!vnode.vtype) {
    //         newNode.replaceData(0, newNode.length, data.newVnode)
    //     } else if (vnode.vtype === VELEMENT) {
    //         updateVelem(vnode, data.newVnode, newNode, data.parentContext)
    //     } else if (vnode.vtype === VSTATELESS) {
    //         newNode = updateVstateless(vnode, data.newVnode, newNode, data.parentContext)
    //     } else if (vnode.vtype === VCOMPONENT) {
    //         newNode = updateVcomponent(vnode, data.newVnode, newNode, data.parentContext)
    //     }
    // }

    // // re-order
    // let currentNode = newNode.parentNode.childNodes[data.index]
    // if (currentNode !== newNode) {
    //     newNode.parentNode.insertBefore(newNode, currentNode)
    // }
    // return newNode
}

function applyDestroy(data) {
    // destroyVnode(data.vnode, data.node)
    data.node.parentNode.removeChild(data.node)
}

function applyCreate(data) {
    let node = data.vnode.vDom
    node.vNode = data.vnode
    data.parentNode.insertBefore(node, data.parentNode.childNodes[data.index])
}

function eqeuls(vNode1, vNode2){
    return vNode1.nodeName === vNode2.nodeName && 
    vNode1.nodeType === vNode2.nodeType && 
    vNode1.childElementCount === vNode2.childElementCount &&
    vNode1.innerText === vNode2.innerText
}
