import "./style.scss";
import React from "react";
import { Card, Input, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function Dashboard(): JSX.Element {
  const extra = <Input placeholder="Search..." prefix={<SearchOutlined />} />;

  return (
    <div className="dashboard">
      <Card title="Items" extra={extra}>
        <Table />
      </Card>
    </div>
  );
}
