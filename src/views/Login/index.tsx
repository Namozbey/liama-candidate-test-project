import "./style.scss";
import React, { useState } from "react";
import { Input, Form, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { subdomain } from "../../constants/basic";
import { postLogin } from "../../services";
import { setCookie } from "nookies";

type values = {
  [key: string]: string | number | boolean;
};

type responce = {
  token: string;
  expires_at: string;
  lifetime: number;
};

export default function Login(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values: values) => {
    setLoading(true);
    postLogin({
      _username: values.username,
      _password: values.password,
      _subdomain: subdomain,
    })
      .then((res: responce) => {
        setCookie(null, "token", res.token, {
          path: "/",
          expires: new Date(res.expires_at),
        });
        location.reload();
      })
      .catch(() => {
        form.setFields([
          {
            name: "username",
            errors: [""],
          },
          {
            name: "password",
            errors: [""],
          },
        ]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="login">
      <h1 className="title">Sign in</h1>
      <Form form={form} name="login" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            size="large"
            placeholder="Enter username"
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            size="large"
            placeholder="Enter password"
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Sign in
        </Button>
      </Form>
    </div>
  );
}
