import { Loader } from "../Loader/Loader";
import styles from "./Hotels.module.scss";
import LocationItem from "../LocationItem/LocationItem";
import { Link } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider";

export default function Hotels() {
  const { hotels, isLoading } = useHotels();

  if (isLoading) return <Loader />;

  return (
    <div className={styles.hotelsList}>
      {hotels.map((item) => (
        <Link
          key={item.id}
          to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
        >
          <LocationItem styles={styles} {...item} />
        </Link>
      ))}
    </div>
  );
}
