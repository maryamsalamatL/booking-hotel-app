import useFetch from "../../hooks/useFetch";
import styles from "./LocationList.module.scss";
import LocationItem from "../LocationItem/LocationItem";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

export default function LocationList() {
  const { data, isLoading } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/hotels`
  );

  return (
    <div className={styles.nearbyLocations}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2>Nearby Locations</h2>
          <div className={styles.locationList}>
            {data.map((item) => (
              <Link
                key={item.id}
                to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
                data-cy="location-item-link"
              >
                <LocationItem styles={styles} {...item} />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
