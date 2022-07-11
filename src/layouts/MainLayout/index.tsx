/* eslint-disable react/display-name */
import "./style.scss";
import React, { useState } from "react";
import { destroyCookie } from "nookies";
import { LogoutOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Button, Tooltip, Popover } from "antd";

const { Header, Content, Footer } = Layout;

interface Props {
  component: React.FC;
}

type options = {
  [key: string]: string | number | boolean;
};

const Wrapper = (props: Props): JSX.Element => {
  const { component: Component } = props;
  const [visible, setVisible] = useState(false);

  const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };

  const logOut = () => {
    destroyCookie(null, "token");
    location.reload();
  };

  const popoverContent = (
    <div className="logout-popover">
      <Button size="small" type="link" onClick={hide}>
        Cancel
      </Button>
      <Button size="small" type="primary" onClick={logOut}>
        Yes
      </Button>
    </div>
  );

  return (
    <Layout className="main-layout">
      <Header className="header">
        <div className="logo">Logo</div>
        <div className="right-content">
          <p>John Doe</p>
          <Popover
            trigger="focus"
            title="Do you really want to log out?"
            visible={visible}
            content={popoverContent}
            onVisibleChange={handleVisibleChange}
          >
            <Tooltip title="Log out">
              <Button
                icon={<LogoutOutlined className="logout-icon" />}
                type="text"
              />
            </Tooltip>
          </Popover>
        </div>
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
