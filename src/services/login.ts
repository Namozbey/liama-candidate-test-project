import { request } from "../utils/request";

export const postLogin = (data: Params) => {
  let body = "";
  Object.keys(data).forEach((key, i) => {
    if (i === 0) {
      body += `${key}=${data[key]}`;
    } else {
      body += `&${key}=${data[key]}`;
    }
  });

  return request(
    "/security/auth_check",
    "post",
    undefined,
    body,
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    false
  );
};
