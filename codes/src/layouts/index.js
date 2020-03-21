import React from "react";
import styles from "./index.less";
import ProLayout from "@ant-design/pro-layout";

import Header from "@/components/header";
import Footer from "@/components/footer";
import ContentWrapper from "@/components/contentWrapper";

export default props => {
  return (
    <div classnmae={styles.main}>
      <Header styles={styles}></Header>
      <ContentWrapper styles={styles}>
        {props.children}
      </ContentWrapper>
      <Footer styles={styles}></Footer>
    </div>
  );
};
