import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

export default function TvCard({ myData }) {
  
  return (
    <Link to={`/tvshows/${myData.id}`}>
      <Image src={myData?.image?.original} className="tvcard" />
      <p className="text-black fs-5">{myData.name}</p>
    </Link>
  );
}
