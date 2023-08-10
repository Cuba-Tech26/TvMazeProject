import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Loader from "../utils/Loader";
import TvCard from "../components/TvCard";

export default function Tvshows() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([false]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTv = async () => {
      setLoading(true);
      try {
        const res = await axios.get(" https://api.tvmaze.com/shows");
        console.log(res);
        setData(res.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTv();
  }, []);
  if (error) return <p className="mt-5 py-5">{error.message}</p>;
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container className="mt-5  py-3">
          <Row>
            {data.slice(0, 30).map((show) => (
              <Col key={show.id} xs={6} md={4} lg={3}>
                <TvCard myData={show} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}
