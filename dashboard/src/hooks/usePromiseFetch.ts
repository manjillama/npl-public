import { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import axios from "../api";
/**
 * @param  {string} url
 * @param  {any} params
 * @returns {Array} [error, fetching, response]
 */
export function usePromiseFetch(
  url: string,
  params?: { [key: string]: any }
): [boolean, any, Error | null] {
  const [fetching, setFetching] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setFetching(true);
    axios
      .get(url, params)
      .then((response: AxiosResponse) => {
        setData(response.data.data);
        setFetching(false);
      })
      .catch((err: Error) => {
        setError(err);
        setFetching(false);
      });
  }, [url, params]);

  return [fetching, data, error];
}
