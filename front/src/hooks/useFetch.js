import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        headers: {
          apisecret: process.env.REACT_APP_APISECRET,
        },
      };
      try {
        const res = await axios(url, options);
        setData(res.data);
      } catch (error) {
        if (!error.response.data.success) {
          toast.error(error.response.data.message);
          setError(error);
          return;
        }
        toast.error("Something went wrong!");
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isloading, error };
};

export default useFetch;
