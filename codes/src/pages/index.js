import React, { useState, useEffect, useRef } from 'react'
import { tickRender, renderMarked, createStyleElement, renderCss } from "@/utils/funcs"
import data, { cssStyles } from '@/jianli.js'
import { createAnimateRenderMarked } from '../utils/funcs'

export default function(){

  const ref = useRef(null)
  
  useEffect(() => {
    if(!ref) return;
    const styleElement = createStyleElement()
    // 开发时放开这两行
    // ref.current.innerHTML = marked(data)
    // styleElement.innerHTML = cssStyles

    tickRender(data, createAnimateRenderMarked(renderMarked, ref.current), 20 , ref.current ).then(()=>{
      console.log('渲染完成')
    })
    tickRender(cssStyles, renderCss, 20, styleElement)
    
  }, [])

  return (
    // <div className={styles.box} ref={ref} >
    <div className='box' ref={ref}> 
  </div>
  )
}
