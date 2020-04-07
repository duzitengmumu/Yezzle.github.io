import React, { useState, useEffect, useRef } from 'react'
import { tickRender, renderMarked, createStyleElement, renderCss } from "@/utils/funcs"
import data, { cssStyles } from '@/jianli.js'
import { createAnimateRenderMarked } from '../utils/funcs'
import axios from "axios";

export default function(){

  const ref = useRef(null)

  // const [data, setdata] = useState('')
  // useEffect(() => {
  //   axios.get('http://yezzle.github.io/jianli.txt')
  //   .then(res=> setdata( res.data))
  // }, [])

  useEffect(() => {

    if(!ref||!data) return;
    const styleElement = createStyleElement()
    // 开发时放开这两行
    // ref.current.innerHTML = marked(data)
    // styleElement.innerHTML = cssStyles
    console.log(ref.current, data)
    tickRender(data, createAnimateRenderMarked(renderMarked, ref.current), 20 , ref.current ).then(()=>{
      console.log('渲染完成')
    })
    tickRender(cssStyles, renderCss, 40, styleElement)
    
  }, [data])

  return (
    // <div className={styles.box} ref={ref} >
    <div className='box' ref={ref}> 
  </div>
  )
}
