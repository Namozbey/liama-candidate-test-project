export const request = (
  path: string,
  method: string,
  params?: Params,
  data?: any
) => {
  const stringParams = makeParamsToString(params);
  const url = process.env.BASE_URL + path + stringParams;
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  xhr.send(JSON.stringify(data));

  return new Promise((resolve, reject) => {
    const timeOut = setTimeout(() => {
      reject(new Error("time out"));
    }, 8000);

    xhr.onload = (e) => {
      // console.log("onload===>", e);
      // console.log("onload===>", xhr);
      if (xhr.status >= 400) {
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

const makeParamsToString = (params: Params) => {
  if (!params) return "";
  let _params = "";
  Object.keys(params).forEach((key, i) => {
    if (i === 0) _params += `?${key}=${params[key]}`;
    else _params += `&${key}=${params[key]}`;
  });
  return _params;
};
