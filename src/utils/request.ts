import { message } from "antd";
import convertQueryToString from "./convertQueryToString";

type headers = {
  [key: string]: string;
};

export function request<Res = any>(
  path: string,
  method: "get" | "put" | "post" | "patch" | "delete",
  params?: Params,
  data?: any,
  headers?: headers,
  isJson = true
): Promise<Res> {
  const stringParams = params ? `?${convertQueryToString(params)}` : "";

  const url = process.env.BASE_URL + path + stringParams;
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);

  if (headers) {
    for (const key in headers) {
      xhr.setRequestHeader(key, headers[key]);
    }
  } else {
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
  }

  xhr.send(isJson ? JSON.stringify(data) : data);

  return new Promise((resolve, reject) => {
    const timeOut = setTimeout(() => {
      reject(new Error("time out"));
    }, 15000);

    xhr.onload = () => {
      if (xhr.status === 401) {
        reject(xhr.response ? JSON.parse(xhr.response) : null);
        message.error("Unauthored");
      } else if (xhr.status >= 400) {
        reject(xhr.response ? JSON.parse(xhr.response) : null);
      }
      clearTimeout(timeOut);
      resolve(xhr.response ? JSON.parse(xhr.response) : null);
    };

    xhr.onerror = (err) => {
      clearTimeout(timeOut);
      reject(err);
    };
  });
}
