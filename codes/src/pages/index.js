import React, { useState, useEffect } from 'react'
import styles from './index.css'
import marked from "marked";
import { tickRender, renderMarked, createStyleElement, renderCss } from "@/utils/funcs"
import data, { cssStyle } from '@/jianli.js'

export default function(){
  
  function setRef(elm){
    if(!elm) return;
    tickRender(data, renderMarked, 50 ,elm ).then(()=>{
      // elm.innerHTML = marked(data)
      const styleElement = createStyleElement()
      tickRender(cssStyle, renderCss, 50, styleElement)
    })
  }

  return (
    // <div className={styles.box} ref={setRef}>
    <div className='box' ref={setRef}>
    </div>
  );
}
