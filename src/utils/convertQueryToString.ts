export default function convertQueryToString(params: Params) {
  if (typeof params !== "object") return "";
  const keys = Object.keys(params);

  if (!keys.length) return "";
  return keys.reduce((prev, key, i) => {
    if (!params[key]) return prev;
    if (i === 0) return `${key}=${params[key]}`;
    return `${prev}&${key}=${params[key]}`;
  }, "");
}
