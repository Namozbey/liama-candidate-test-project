type RestQuery = {
  [key: string]: string | number;
};

export default function convertQueryToString(rest: RestQuery, initial = "&") {
  const keys = Object.keys(rest);
  console.log(keys);

  if (!keys.length) return "";
  return keys.reduce(
    (prev, key, i) =>
      i === 0 ? `${prev}${key}=${rest[key]}` : `${prev}&${key}=${rest[key]}`,
    initial
  );
}
