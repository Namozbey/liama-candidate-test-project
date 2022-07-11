import { request } from "../utils/request";
import convertQueryToString from "../utils/convertQueryToString";

export const postLogin = (data: Params) => {
  const body = convertQueryToString(data);

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
