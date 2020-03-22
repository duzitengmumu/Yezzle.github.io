import React, { useState, useEffect } from 'react';
import styles from './index.css';
// import marked from "marked";
import { tickRender, renderMarked } from "@/utils/funcs";
import data from '@/jianli.js'

export default () => {

  const setRef = (elm) => {
    tickRender(data, renderMarked, 50 , ()=>{},elm)
  }

  return (
    <div ref={setRef}>
    </div>
  );
}
