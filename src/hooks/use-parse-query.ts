import { useMemo } from "react";
import parseQuery from "../utils/parseQuery";
import { useLocation } from "react-router-dom";

export default function useParseQuery(query?: string) {
  const location = useLocation();
  return useMemo(() => parseQuery(query), [query ?? location.search]);
}
