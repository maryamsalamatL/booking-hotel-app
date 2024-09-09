import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useFetch(url, query = "") {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${url}?${query}`)
      .then(({ data }) => setData(data))
      .catch((err) => {
        setData([]);
        toast.error(err.response?.data.error || err.message);
      })
      .finally(() => setIsLoading(false));
  }, [url, query]);

  return { data, isLoading };
}
