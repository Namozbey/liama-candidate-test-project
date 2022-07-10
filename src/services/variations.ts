import { request } from "../utils/request";

export const getVariations = (params?: Params) =>
  request("/variations", "get", params);
