import React, { useState, useEffect } from 'react';
import styles from './index.css';
import marked from "marked";
import data from '@/jianli.js'

export default () => {

  const setRef = (elm) => {
    elm.innerHTML= marked(data)
  }

  return (
    <div ref={setRef}>
    </div>
  );
}
