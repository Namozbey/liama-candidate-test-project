export default function convertQueryToString(params: Params) {
  if (typeof params !== "object") return "";
  const keys = Object.keys(params);

  if (!keys.length) return "";
  return keys.reduce(
    (prev, key, i) =>
      i === 0 ? `${key}=${params[key]}` : `${prev}&${key}=${params[key]}`,
    ""
  );
}
