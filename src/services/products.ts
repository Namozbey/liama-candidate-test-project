import { request } from "../utils/request";

interface GetPropsType {
  id?: number | string;
  params?: Params;
}

interface PostPropsType extends GetPropsType {
  data: ProductType;
}

export const getProducts = ({ params }: GetPropsType) =>
  request<ProductType[]>("/products", "get", params);

export const getOneProduct = ({ params, id }: GetPropsType) =>
  request<ProductType>(`/products/${id}`, "get", params);

export const postProduct = ({ params, data }: PostPropsType) =>
  request<ProductType>("/products", "post", params, data);

export const putProduct = ({ params, data, id }: PostPropsType) =>
  request<ProductType>(`/products/${id}`, "put", params, data);

export const patchProduct = ({ params, data, id }: PostPropsType) =>
  request<ProductType>(`/products/${id}`, "patch", params, data);

export const deleteProduct = ({ params, id }: GetPropsType) =>
  request<any>(`/products/${id}`, "delete", params);
