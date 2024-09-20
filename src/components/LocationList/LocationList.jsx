import useFetch from "../../hooks/useFetch";
import styles from "./LocationList.module.scss";
import LocationItem from "../LocationItem/LocationItem";
import Loader from "../Loader/Loader";

export default function LocationList() {
  const { data, isLoading } = useFetch(`${process.env.REACT_APP_BASE_URL}/hotels`);

  return (
    <div className={styles.nearbyLocations}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2>Nearby Locations</h2>
          <div className={styles.locationList}>
            {data.map((item) => (
              <LocationItem key={item.id} styles={styles} {...item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
