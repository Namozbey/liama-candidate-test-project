import React, { useEffect, useState } from "react";
import useParseQuery from "../../hooks/use-parse-query";
import { useHistory } from "react-router-dom";
import { Button, Drawer, Form, Input, message, Select } from "antd";
import { selectOptions } from "../../constants/categories";
import { getOneProduct, postProduct, putProduct } from "../../services";
import { LoadingOutlined } from "@ant-design/icons";

const defaultRule = {
  required: true,
  message: "required field",
};

interface Props {
  fetchItems: (search?: string, category?: string) => void;
}

export default function ProductForm({ fetchItems }: Props) {
  const history = useHistory();
  const { product_id } = useParseQuery();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (product_id && product_id !== "create") {
      setIsFetching(true);
      getOneProduct({ id: +product_id })
        .then((res) => {
          form.setFieldsValue(res);
        })
        .catch((err) => {
          message.error(err);
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  }, [product_id]);

  const closeDrawer = () => {
    history.push({ search: "" });
    form.resetFields();
  };

  const onFinish = (values: Omit<ProductType, "id">) => {
    // console.log(values);
    setLoading(true);
    (product_id === "create" ? postProduct : putProduct)({
      data: values,
      id: +product_id,
    })
      .then((res) => {
        message.success("Success");
        fetchItems();
        closeDrawer();
      })
      .catch((err) => {
        message.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const footer = (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Button size="large" onClick={closeDrawer}>
        Cancel
      </Button>
      <Button
        size="large"
        type="primary"
        loading={loading}
        onClick={() => form.submit()}
      >
        Save
      </Button>
    </div>
  );

  return (
    <Drawer
      width="50%"
      closable={false}
      onClose={closeDrawer}
      open={Boolean(product_id)}
      footer={footer}
      title={product_id === "create" ? "Create Product" : "Edit Product"}
    >
      {isFetching ? (
        <div style={{ textAlign: "center" }}>
          <LoadingOutlined style={{ fontSize: 42 }} />
        </div>
      ) : (
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="name" label="Name" rules={[defaultRule]}>
            <Input size="large" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[defaultRule]}
          >
            <Input.TextArea size="large" />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[defaultRule]}>
            <Select size="large" options={selectOptions} />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[defaultRule]}>
            <Input size="large" type="number" />
          </Form.Item>
          <Form.Item name="imageSrc" label="Image">
            <Input size="large" placeholder="eg: https://i.pinimg.com..." />
          </Form.Item>
        </Form>
      )}
    </Drawer>
  );
}
