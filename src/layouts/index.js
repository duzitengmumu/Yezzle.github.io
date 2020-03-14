import React from 'react';
import styles from './index.less';

export default (props) => {
  return (
    <div classnmae={styles.main}>
      <header classnmae={styles.header}>header</header>
        <content classnmae={styles.content}>
            <sider classnmae={styles.sider}>sider</sider>
            {props.children}
        </content>
      <footer classnmae={styles.footer}>footer</footer>
    </div>
  );
}
