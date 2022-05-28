import { useState, useEffect } from "react";

const cache = {};

function useFetch(url) {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setStatus("fetching");
      if (cache[url]) {
        const data = cache[url];
        setData(data);
        setStatus("fetched");
      } else {
        const response = await fetch(url);
        const data = await response.json();
        cache[url] = data; // set response in cache;
        setData(data);
        setStatus("fetched");
      }
    };

    fetchData();
  }, [url]);

  return { status, data };
}

export default useFetch;
