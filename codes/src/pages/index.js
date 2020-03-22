import React, { useState, useEffect, useRef } from 'react'
import styles from './index.css'
import marked from "marked";
import { tickRender, renderMarked, createStyleElement, renderCss } from "@/utils/funcs"
import data, { cssStyles } from '@/jianli.js'

export default function(){

  const ref = useRef(null)
  
  useEffect(() => {
    if(!ref) return;
    const styleElement = createStyleElement()
    // ref.current.innerHTML = marked(data)
    // styleElement.innerHTML = cssStyles

    tickRender(data, renderMarked, 20 , ref.current ).then(()=>{
      console.log('渲染完成')
    })
    tickRender(cssStyles, renderCss, 80, styleElement)
    
  }, [])

  return (
    // <div className={styles.box} ref={setRef} >
    <div className='box' ref={ref}> 
    </div>
  )
}
