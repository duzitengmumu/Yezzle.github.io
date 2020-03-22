import marked from "marked";

export function tickRender(content, renderFunc, speed = 30, cb,...args) {
    
    let n = 0
    let clock = setInterval(() => {
        n+=1
        renderFunc(content.substr(0, n), ...args)
        if(n == (content.length - 1)) clearTick(cb)
    }, speed);
    
    function clearTick(cb){
        clearInterval(clock)
        cb.call()
    }
    return clearTick
}

export function renderMarked(content, element, options){
    element.innerHTML = marked(content, options)
}

export function renderCss(content, element ){
    element.innerHTML = content
}

export function createStyleElement(){
    let styleElement = document.createElement('style')
    document.head.appentChild(styleElement)
    return styleElement
}