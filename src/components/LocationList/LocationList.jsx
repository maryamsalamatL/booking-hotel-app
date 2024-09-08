import useFetch from "../../hooks/useFetch";
import styles from "./LocationList.module.scss";

export default function LocationList() {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels");

  return (
    <div className={styles.nearbyLocations}>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <>
          <h2>Nearby Locations</h2>
          <div className={styles.locationList}>
            {data.map((item) => (
              <LocationItem key={item.id} {...item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function LocationItem({ id, smart_location, price, name, picture_url }) {
  return (
    <div className={styles.locationItem}>
      <img onError={e=>e.currentTarget.src="../../assets/placeholder.png"}src={picture_url.url} alt={name} />
      <p className={styles.location}>{smart_location}</p>
      <p className={styles.name}>{name}</p>
      <p className={styles.price}>{price} € night</p>
    </div>
  );
}
