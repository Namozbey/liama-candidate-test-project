/* eslint-disable quotes */
export default function parseQuery(_query?: string) {
  const query = _query || window.location.search;
  if (!query) return {};
  const search = query.substring(1);
  return JSON.parse(
    '{"' +
      decodeURI(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}
