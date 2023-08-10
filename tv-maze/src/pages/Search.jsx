import { useState, useEffect } from "react";
import axios from "axios";

export default function Search() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([false]);
  const [error, setError] = useState(null);
  const query = new URLSearchParams(location.search);
  const queryParams = query.get("q");
  console.log("qparams", queryParams);

  useEffect(() => {
    const getSearch = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.tvmaze.com/search/shows?q=${queryParams}`
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }, 600);
    return () => clearTimeout(getSearch);
  }, [queryParams]);
  console.log("searchresult", data);
  return <div>Search</div>;
}
