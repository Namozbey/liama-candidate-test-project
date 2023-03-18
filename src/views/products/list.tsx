import "./style.scss";
import React, { useEffect, useMemo, useState } from "react";
import useParseQuery from "../../hooks/use-parse-query";
import { useHistory } from "react-router-dom";
import convertQueryToString from "../../utils/convertQueryToString";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Card,
  Input,
  Button,
  Row,
  Col,
  Image,
  Typography,
  Pagination,
  Tabs,
  Popconfirm,
  message,
} from "antd";

import noImage from "../../assets/images/no_image.jpeg";
import marker from "../../utils/marker";
import { tabOptions } from "../../constants/categories";
import { deleteProduct } from "../../services";

const { Paragraph, Title, Text } = Typography;

let debounce = setTimeout(() => null, 0);

interface Props {
  isFetching?: boolean;
  data: ProductType[];
  fetchItems: (search?: string, category?: string) => void;
}

export default function ProductsList({
  isFetching,
  data,
  fetchItems,
}: Props): JSX.Element {
  const history = useHistory();
  const parsedQuery = useParseQuery();
  const { limit = 12, page = 1, search = "", category } = parsedQuery;
  const [searchText, setSearchText] = useState(search);
  const [deleteLoading, setDeleteLoading] = useState<number>();

  useEffect(() => {
    fetchItems(search, category);
  }, [search, category]);

  useEffect(() => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      handleSearch();
    }, 500);
  }, [searchText]);

  const items = useMemo(() => {
    if (!data) return [];
    if (search) return data;
    return data.slice((page - 1) * limit, page * limit);
  }, [limit, page, data]);

  const handleSearch = () => {
    if (!searchText) {
      const query = { ...parsedQuery };
      delete query.search;

      return history.push({
        search: convertQueryToString(query),
      });
    }

    history.push({
      search: convertQueryToString({
        ...parsedQuery,
        search: searchText,
      }),
    });
  };

  const openDrawer = (id?: number) => {
    history.push({
      search: `?product_id=${id ?? "create"}`,
    });
  };

  const onPaginationChange = (page: number, pageSize: number) => {
    if (search) return;
    history.push({
      search: convertQueryToString({
        ...parsedQuery,
        limit: pageSize,
        page,
      }),
    });
  };

  const onTabChange = (value: string | number) => {
    if (value === "all") {
      const query = { ...parsedQuery };
      delete query.category;

      return history.push({
        search: convertQueryToString(query),
      });
    }

    history.push({
      search: convertQueryToString({
        ...parsedQuery,
        category: value,
      }),
    });
  };

  const onDelete = (id: number) => {
    setDeleteLoading(id);
    deleteProduct({ id })
      .then(() => {
        message.success("Success");
        fetchItems();
      })
      .catch((err) => {
        message.error(err);
      })
      .finally(() => {
        setDeleteLoading(undefined);
      });
  };

  const extra = (
    <div className="products-extra-wrapper">
      <Input
        value={searchText}
        className="search-input"
        placeholder="Search..."
        prefix={<SearchOutlined />}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => openDrawer()}
      >
        Create
      </Button>
    </div>
  );

  return (
    <Card title="Products" extra={extra}>
      <Tabs
        activeKey={category ?? "all"}
        items={tabOptions}
        onChange={onTabChange}
      />
      <Row gutter={24}>
        {isFetching ? (
          <div style={{ margin: "2rem auto" }}>
            <LoadingOutlined style={{ fontSize: 42 }} />
          </div>
        ) : items.length ? (
          items.map(({ id, name, description, price, imageSrc }) => (
            <Col span={24} md={12} lg={6} xxl={4} key={id}>
              <Card style={{ marginBottom: 24 }}>
                <Image
                  height={250}
                  width="100%"
                  alt="product-image"
                  src={imageSrc}
                  fallback={noImage}
                  preview={false}
                  style={{ objectFit: "contain" }}
                />
                <Title level={5} style={{ marginTop: 16 }}>
                  {marker(name, search)}
                </Title>
                <Paragraph ellipsis={{ tooltip: description }}>
                  {marker(description, search)}
                </Paragraph>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text strong>${marker(price.toString(), search)}</Text>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Button
                      type="link"
                      size="small"
                      icon={<EditOutlined />}
                      onClick={() => openDrawer(id)}
                    />
                    <Popconfirm
                      title="Are you sure to delete?"
                      onConfirm={() => onDelete(Number(id))}
                    >
                      <Button
                        danger
                        type="link"
                        size="small"
                        loading={deleteLoading === id}
                        icon={<DeleteOutlined />}
                      />
                    </Popconfirm>
                  </div>
                </div>
              </Card>
            </Col>
          ))
        ) : (
          <h1 style={{ margin: "2rem auto" }}>No Data</h1>
        )}
      </Row>
      {!search && items?.length ? (
        <Row justify="end">
          <Pagination
            pageSize={limit}
            current={+page}
            total={data?.length}
            onChange={onPaginationChange}
          />
        </Row>
      ) : (
        <></>
      )}
    </Card>
  );
}
