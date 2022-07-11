import "./style.scss";
import React, { useEffect, useMemo, useState } from "react";
import useParseQuery from "../../hooks/use-parse-query";
import { getVariations } from "../../services";
import { SearchOutlined } from "@ant-design/icons";
import { initialColumns } from "./columns";
import convertQueryToString from "../../utils/convertQueryToString";
import { useHistory, useLocation } from "react-router-dom";
import { Card, Input, Table, message } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/lib/table";

type responce = {
  items: Variation[];
  page: number;
  total_count: number;
};

export default function Dashboard(): JSX.Element {
  const history = useHistory();
  const location = useLocation();
  const parsedQuery = useParseQuery(location.search);
  const { size = 10, page = 1, search = "" } = parsedQuery;

  const [data, setData] = useState<responce>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [searchText, setSearchText] = useState(search);

  const fetchItems = (size: number, page: number) => {
    setIsFetching(true);
    getVariations({ size, page })
      .then((res: responce) => setData(res))
      .catch((err) => {
        console.error(err);
        message.error("Fetching error or time out");
      })
      .finally(() => setIsFetching(false));
  };

  useEffect(() => {
    fetchItems(search ? 200 : size, 1);
  }, [size, page, Boolean(search)]);

  const items = useMemo(() => {
    if (!data) return [];
    if (!search) return data.items;
    return data.items.filter(
      (elm) =>
        elm.name &&
        elm.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }, [search, data]);

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

  const extra = (
    <Input
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      placeholder="Search... (press Enter to search)"
      prefix={<SearchOutlined onClick={handleSearch} />}
      onPressEnter={handleSearch}
      className="search-input"
    />
  );

  const pagination: TablePaginationConfig = {
    pageSize: +size,
    current: +page,
    total: data?.total_count,
  };

  const columns: ColumnsType<Variation> = useMemo(() => {
    const findOrderNumber = (index: number) => {
      if (search) return index + 1;
      return (page - 1) * size + index + 1;
    };
    return [
      {
        title: "No",
        key: "order_number",
        render: (text, recored, index) => findOrderNumber(index),
      },
      ...initialColumns,
    ];
  }, [page, size, Boolean(search)]);

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    if (search) return;
    history.push({
      search: convertQueryToString({
        ...parsedQuery,
        size: newPagination.pageSize,
        page: newPagination.current,
      }),
    });
  };

  return (
    <div className="dashboard">
      <Card title="Items" extra={extra}>
        <Table
          rowKey={(record) => record.id}
          loading={isFetching}
          columns={columns}
          dataSource={items}
          pagination={search ? false : pagination}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
}
