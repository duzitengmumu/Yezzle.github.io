import marked from "marked";
import {compareTowVnode } from "./patch";

export function tickRender(content, renderFunc, speed = 30, ...args) {
  let contentArr = prepareContent(content)
  return new Promise((resolve, reject) => {
    let n = 0;
    let clock = setInterval(() => {
      n += 1;
      renderFunc(contentArr.slice(0,n).join(''), ...args);
      if (n == content.length - 1) {
        clearTick();
      }
    }, speed);

    function clearTick() {
      clearInterval(clock);
      resolve();
    }
  });
}

export function prepareContent(content){
  const spaceReg = /&nbsp;/
  return content.split(spaceReg).map(c => c.split('').concat('&nbsp;')).flat()
}

export function renderMarked(content, element, options) {
  // element.innerHTML = marked(content, options);
  // 仿照react简单diff一下 减少重绘和回流
  let domStr = marked(marked(content, options))
  let vNode = stringToVNode(domStr)
  compareTowVnode(element.vNode, vNode, element)
  // element.scrollIntoView({behavior: "instant", block: "end", inline: "nearest"})
}

export function createAnimateRenderMarked(renderMarked, element, speed){
  const animateScroll = createAnimateScroll(element, speed||1)
  return function(content, element, options){
    renderMarked(content, element, options)
    animateScroll()
  }
}

export function renderCss(content, element) {
  element.innerHTML = content;
}

export function createStyleElement() {
  let styleElement = document.createElement("style");
  document.head.appendChild(styleElement);
  return styleElement;
}

export function stringToVNode(str){
  let temp = document.createElement('div')
  temp.innerHTML = str
  return domToVnode(temp)
}

function domToVnode(dom){
  // 理论上可以调用babel运行时接口 先摸个虚拟dom出来
  let { nodeType , nodeName, innerText, childElementCount, childNodes, nodeValue, ...props } = dom
  if(childNodes.length>0){
    childNodes = Array.prototype.map.call(childNodes, (e) => {
      return domToVnode(e)
    })
  }
  return {nodeType, nodeName, innerText, childElementCount, childNodes, nodeValue, vDom: dom}
}

export function createAnimateScroll(element,speed) {
  let requestId;

  return function(){
    //获取元素相对窗口的top值，此处应加上窗口本身的偏移
    let rect=element.getBoundingClientRect();
    let currentTop = window.pageYOffset+window.innerHeight;
    if(requestId){
      cancelAnimationFrame(requestId)
      requestId = null;
    }
    //采用requestAnimationFrame，平滑动画
    function step(timestamp) {
      currentTop+=speed;
      window.scrollBy(0, speed)
      if(currentTop<=rect.height){
        requestId=window.requestAnimationFrame(step);
      }else{
        window.cancelAnimationFrame(requestId);
      }
    }
    window.requestAnimationFrame(step);
  }
}