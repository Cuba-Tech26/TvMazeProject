import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Image, Row, Col } from "react-bootstrap";
import { PiTelevisionBold } from "react-icons/pi";
import { FaBookOpen } from "react-icons/fa";
import Loader from "../utils/Loader";

export default function TvDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([false]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTv = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=cast`
        );
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
  }, [id]);
  console.log("tvid", data);

  useEffect(() => {
    document.title = data?.name;
  }, [data?.name]);

  return (
    <div>
      {error && <p className="mt-5 text-center">{error.message}</p>}
      {loading ? (
        <Loader />
      ) : (
        <Container fluid className="p-0">
          <div className="d-flex align-items-center justify-content-between py-3 px-2 bgColorB">
            <div className="d-flex align-items-center gap-2">
              <PiTelevisionBold size="50px" color="purple" />
              <span className="text-white fs-4">{data.name}</span>
              <span className="text-white-50 fs-5">{data.type}</span>
            </div>
            <span className="text-white border p-1">{`Rating: ${data?.rating?.average}`}</span>
          </div>
          <Image
            src={data?.image?.original}
            style={{ height: "600px", width: "100%" }}
            alt={data.name}
          />

          <Container>
            <div className="d-flex justify-content-between align-items-center p-4">
              <div className="d-flex gap-3 align-items-center">
                <FaBookOpen size="50px" color="purple" />
                <span className=" fs-4 fw-bold textColor">Storyline</span>
              </div>
              <span className="textColor fs-5">{data?.premiered}</span>
            </div>
            <hr className="textColor" />
            <p
              dangerouslySetInnerHTML={{ __html: data.summary }}
              className="textColor p-3"
            />
            <div className="mt-4 d-md-flex justify-content-between align-items-center p-3 bgColorA">
              <div className="d-md-flex justify-content-between align-items-center text-white">
                <span className="fw-bold me-2">Genres:</span>
                {data.genres?.map((item, index) => (
                  <span key={index} className="me-3">
                    {item}
                  </span>
                ))}
              </div>
              <span className="fw-bold text-white">Status: {data.status}</span>
            </div>
            <div className="mt-4 p-4">
              <h1 className="fs-4 textColor mb-4">Seasons</h1>
              <div className="d-flex gap-4 overflow-x-scroll">
                {data._embedded?.seasons?.map((season) => (
                  <div key={season.id}>
                    <Image
                      src={season?.image?.original}
                      style={{ width: "250px", height: "300px" }}
                      alt={data.name}
                    />
                    <p className="textColor">Season {season.number}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 p-4">
              <h1 className="fs-4 textColor mb-4">Cast</h1>
              <div className="d-flex gap-4 overflow-x-scroll">
                {data._embedded?.cast?.map((item, index) => (
                  <div key={index}>
                    <Image
                      src={item.character?.image?.original}
                      alt={item.character?.name}
                      style={{ width: "120px", height: "120px" }}
                      className="rounded-circle"
                    />
                    <p className="textColor fs-6 text-center">
                      {item.character?.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Container>
      )}
    </div>
  );
}
