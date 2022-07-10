import { request } from "../utils/request";

export const getOneMovie = (id: number) => request(`/movies/${id}`, "get");

export const getMovies = (params?: Params) => request("/movies", "get", params);

export const postMovie = (data: object) =>
  request("/movies", "post", undefined, data);

export const putMovie = (data: object) =>
  request("/movies", "put", undefined, data);

export const deleteMovie = (id: number) => request(`/movies/${id}`, "delete");
