import { useEffect, useState } from "react";
import axios from "axios";
import { Image, Row, Col, Carousel, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../utils/Loader";
import TvCard from "../components/TvCard";

export default function Home() {
  //three stages to manage account for when fetching a data from api in react
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([false]);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);

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

  const filterRating = data.filter((show) => show.rating.average >= 8.9);

  if (error) return <p className="mt-5 py-5">{error.message}</p>;
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="d-lg-flex first-Con">
          <Container className="container pt-4 first-Con">
            <h1 className="text-white text-uppercase fw-bold mt-3">
              Top Trending movies
            </h1>
            {
              <Carousel
                controls={false}
                indicators={false}
                activeIndex={current}
                onSelect={(index) => setCurrent(index)}
              >
                {filterRating.slice(0, 3).map((show, index) => (
                  <Carousel.Item
                    key={show.id}
                    className={
                      index === current ? "text-white p-1" : "text-white"
                    }
                  >
                    <h3 className="text-capitalize mt-5">{show.name}</h3>
                  </Carousel.Item>
                ))}
              </Carousel>
            }
          </Container>

          <Container className=" container bgColorB py-4 text-white">
            <Carousel controls={false} indicators={false}>
              {filterRating.slice(0, 3).map((show, index) => (
                <Carousel.Item key={show.id}>
                  {index === current && (
                    <>
                      <div>
                        <h1 className="text-warning">{show.name}</h1>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: show.summary.slice(0, 200) + `...`,
                          }}
                        ></p>
                      </div>
                    </>
                  )}
                  <Link to={`/tvshows/${show.id}`}>See more</Link>
                </Carousel.Item>
              ))}
            </Carousel>
          </Container>

          <Container className="container">
            <Carousel controls={false} indicators={false}>
              {filterRating.slice(0, 3).map((show, index) => (
                <Carousel.Item
                  key={show.id}
                  className={index === current ? " text-white " : "textColor"}
                >
                  <Image src={show.image.original} className=" w-100 h-100" />
                </Carousel.Item>
              ))}
            </Carousel>
          </Container>
        </section>
      )}

      <div className="py-3 mt-3 ">
        <Row activeIndex={current}>
          {data.slice(0, 30).map((show) => (
            <Col key={show.id} xs={6} md={4} lg={3}>
              <TvCard myData={show} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
