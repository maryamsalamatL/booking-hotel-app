import { useCurrentHotelId } from "../context/HotelsProvider";
import placeholder from "../../../assets/placeholder.png";

export default function LocationItem({
  id,
  smart_location,
  price,
  name,
  thumbnail_url,
  styles,
}) {
  const currentHotelId = useCurrentHotelId();

  return (
    <div
      className={`${styles.locationItem} ${
        id === currentHotelId ? "currentHotel" : ""
      }`}
      data-cy="location-item"
    >
      <div className={styles.imgBox}>
        <img
          onError={(e) => (e.currentTarget.src = placeholder)}
          src={thumbnail_url || placeholder}
          alt={name}
        />
      </div>
      <p className={styles.location}>{smart_location}</p>
      <p className={styles.name}>{name}</p>
      <p className={styles.price}>{price} € night</p>
    </div>
  );
}
