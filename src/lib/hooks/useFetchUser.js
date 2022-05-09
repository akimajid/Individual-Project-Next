import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "../api";

const useFetchUser = (routes = "") => {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(async () => {
    if (router.isReady) {
      try {
        const res = await api.get(routes);
        setData(res.data.result);
        console.log(res.data.result);
      } catch (err) {
        console.log(err);
      }
    }
  }, [router.isReady]);

  return [data];
};

export default useFetchUser;
