import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  async function getData() {
    setLoading(true);
    const res = await fetch(url);
    const fdata = await res.json();
    setData(fdata);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [url]);

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     const res = await fetch(url);
  //     const fdata = await res.json();
  //     setData(fdata);
  //   }, 10 * 1000);

  //   return () => {
  //     clearInterval(interval);
  //   }
  // }, []);


  return { data, loading };
}

export default useFetch;