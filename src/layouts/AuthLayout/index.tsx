/* eslint-disable react/display-name */
import "./style.scss";
import React from "react";
import { loginImageUrl } from "../../constants/basic";
interface Props {
  component: React.FC;
}

type options = {
  [key: string]: string | number | boolean;
};

const Wrapper = (props: Props) => {
  const { component: Component } = props;
  return (
    <div className="auth-layout">
      <div className="left-side">
        <img src={loginImageUrl} alt="login-image" />
      </div>
      <div className="right-side">
        <Component />
      </div>
    </div>
  );
};

export default function authLayout(component: React.FC, options?: options) {
  return () => <Wrapper component={component} {...options} />;
}
