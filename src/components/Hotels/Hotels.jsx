import { Loader } from "../Loader/Loader";
import styles from "./Hotels.module.scss";
import useFetch from "../../hooks/useFetch";
import LocationItem from "../LocationItem/LocationItem";
import { Link, useSearchParams } from "react-router-dom";

export default function Hotels() {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const options = JSON.parse(searchParams.get("options"));
  const room = options.room;
  const requiredBeds = options.adult + options.children;

  const { isLoading, data } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${room}&beds_gte=${requiredBeds}`
  );

  if (isLoading) return <Loader />;

  return (
    <div className={styles.hotelsList}>
      {data.map((item) => (
        <Link key={item.id} to={item.id}>
          <LocationItem styles={styles} {...item} />
        </Link>
      ))}
    </div>
  );
}
