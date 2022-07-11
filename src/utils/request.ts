import { message } from "antd";
import { parseCookies } from "nookies";
import convertQueryToString from "./convertQueryToString";

type headers = {
  [key: string]: string;
};

export const request = (
  path: string,
  method: string,
  params?: Params,
  data?: any,
  headers?: headers,
  isJson = true
) => {
  const { token } = parseCookies();
  const stringParams = "?" + convertQueryToString(params);
  const url = process.env.BASE_URL + path + stringParams;
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);

  if (token) xhr.setRequestHeader("Authorization", `Bearer ${token}`);
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

    xhr.onload = (e) => {
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
};
