import { useMemo } from "react";
import parseQuery from "../utils/parseQuery";

export default function useParseQuery(query: string) {
  return useMemo(() => parseQuery(query), [query]);
}
