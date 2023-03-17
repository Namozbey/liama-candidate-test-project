import React, { useState } from "react";
import ProductForm from "./forms";
import { message } from "antd";
import ProductsList from "./list";
import { getProducts } from "../../services";

import "./style.scss";

export default function Products(): JSX.Element {
  const [data, setData] = useState<ProductType[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchItems = (search?: string, category?: string) => {
    setIsFetching(true);
    getProducts({ params: { q: search, category } })
      .then((res) => setData(res))
      .catch((err) => {
        console.error(err);
        message.error("Fetching error or time out");
      })
      .finally(() => setIsFetching(false));
  };

  return (
    <div className="products">
      <ProductsList
        isFetching={isFetching}
        data={data}
        fetchItems={fetchItems}
      />
      <ProductForm fetchItems={fetchItems} />
    </div>
  );
}
