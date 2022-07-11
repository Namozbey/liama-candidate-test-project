import React from "react";
import { Tag } from "antd";
import type { ColumnsType } from "antd/lib/table";

const sortByName = (a: Variation, b: Variation) => b.name.localeCompare(a.name);

export const initialColumns: ColumnsType<Variation> = [
  {
    title: "Bar code",
    key: "barcode",
    dataIndex: "barcode",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: sortByName,
  },
  {
    title: "Properties",
    key: "properties",
    dataIndex: "properties",
    render: (_, { properties }) =>
      properties.map((item, i) => (
        <Tag key={"properties-" + i} color="blue">
          {item.name}
        </Tag>
      )),
  },
  {
    title: "Product properties",
    key: "productProperties",
    dataIndex: "productProperties",
    render: (_, { productProperties }) =>
      productProperties.map((item, i) => (
        <Tag key={"productProperties-" + i}>{item.name}</Tag>
      )),
  },
];
