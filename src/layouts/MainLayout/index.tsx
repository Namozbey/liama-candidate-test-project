/* eslint-disable react/display-name */
import "./style.scss";
import React, { useMemo } from "react";
import { Breadcrumb, Layout } from "antd";
import { useLocation } from "react-router-dom";
import makeTitleCase from "../../utils/makeTitleCase";

const { Header, Content, Footer } = Layout;

interface Props {
  component: React.FC;
}

type options = {
  [key: string]: string | number | boolean;
};

const Wrapper = (props: Props): JSX.Element => {
  const { component: Component } = props;
  const location = useLocation();

  const breadcrumbOptions = useMemo(() => {
    return location.pathname.split("/");
  }, [location]);

  return (
    <Layout className="main-layout">
      <Header className="header">
        <div className="logo">Logo</div>
        <div className="right-content">
          <p>John Doe</p>
        </div>
      </Header>
      <Content className="content">
        <Breadcrumb style={{ margin: "16px 0" }}>
          {breadcrumbOptions.map((route, i) =>
            i === 0 ? (
              <Breadcrumb.Item key="home" href="/">
                Home
              </Breadcrumb.Item>
            ) : route ? (
              <Breadcrumb.Item key={route} href={"/" + route}>
                {makeTitleCase(route)}
              </Breadcrumb.Item>
            ) : undefined
          )}
        </Breadcrumb>
        <div className="site-layout-content">
          <Component />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>© Namoz Ostonaev</Footer>
    </Layout>
  );
};

export default function mainLayout(component: React.FC, options?: options) {
  return () => <Wrapper component={component} {...options} />;
}
