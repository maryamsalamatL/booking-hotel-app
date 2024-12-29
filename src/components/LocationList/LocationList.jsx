import useFetch from "../../hooks/useFetch";
import styles from "./LocationList.module.scss";
import LocationItem from "../LocationItem/LocationItem";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

export default function LocationList() {
  const { data, isLoading } = useFetch(
    `${import.meta.env.VITE_BASE_URL}/hotels`
  );

  return (
    <div className={styles.nearbyLocations} data-cy="nearby-locations">
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
