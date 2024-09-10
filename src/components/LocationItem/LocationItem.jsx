export default function LocationItem({
  smart_location,
  price,
  name,
  thumbnail_url,
  styles,
}) {
  return (
    <div className={styles.locationItem}>
      <div className={styles.imgBox}>
        <img
          onError={(e) =>
            (e.currentTarget.src = "../../assets/placeholder.png")
          }
          src={thumbnail_url}
          alt={name}
        />
      </div>
      <p className={styles.location}>{smart_location}</p>
      <p className={styles.name}>{name}</p>
      <p className={styles.price}>{price} € night</p>
    </div>
  );
}
