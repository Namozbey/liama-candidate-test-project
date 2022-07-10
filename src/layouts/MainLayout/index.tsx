/* eslint-disable react/display-name */
import "./style.scss";
import React from "react";
import { Breadcrumb, Layout } from "antd";

const { Header, Content, Footer } = Layout;

interface Props {
  component: React.FC;
}

type options = {
  [key: string]: string | number | boolean;
};

const Wrapper = (props: Props): JSX.Element => {
  const { component: Component } = props;
  return (
    <Layout className="main-layout">
      <Header>
        <div className="logo">Logo</div>
      </Header>
      <Content className="content">
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Items</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <Component />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default function mainLayout(component: React.FC, options?: options) {
  return () => <Wrapper component={component} {...options} />;
}
