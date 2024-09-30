import styles from "./SingleHotel.module.scss";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
import { useSetCurrentHotelId } from "../context/HotelsProvider";
import { useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import toast from "react-hot-toast";

export default function SingleHotel() {
  const { id } = useParams();
  const { isLoading, data } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/hotels/${id}`
  );
  const {
    name,
    smart_location,
    xl_picture_url,
    number_of_reviews,
    description,
    room_type,
    accommodates,
    bathrooms,
    bedrooms,
    beds,
    bed_type,
    house_rules,
    interaction,
    street,
    minimum_nights,
    maximum_nights,
  } = data;

  const setCurrentHotelId = useSetCurrentHotelId();

  useEffect(() => {
    setCurrentHotelId(id);
  }, [id]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.name}>{name}</div>
          <span>
            {number_of_reviews} &bull; {smart_location}
          </span>
          <img src={xl_picture_url} alt={name} />
          <ul>
            <p className={styles.details}>Details</p>
            <li>
              <span>Room type :</span> {room_type}
            </li>
            <li>
              <span>Accommodates : </span>
              {accommodates}
            </li>
            <li>
              <span>Bathrooms :</span> {bathrooms}
            </li>
            <li>
              <span>Bedrooms : </span>
              {bedrooms}
            </li>
            <li>
              <span>Beds : </span>
              {beds}
            </li>
            <li>
              <span>Bed type :</span> {bed_type}
            </li>
            <li>
              <span>Minimum nights :</span> {minimum_nights}
            </li>
            <li>
              <span>Maximum nights :</span> {maximum_nights}
            </li>
            <li>
              <span>House rules :</span> {house_rules || "-"}
            </li>
          </ul>
          <p className={styles.description}>
            {description} ...
            <br />
            <br />
            {interaction}
          </p>
          <p className={styles.address}>
            <MdLocationOn />
            <span>{street}</span>
          </p>
          <button
            className={`secondaryBtn ${styles.bookBtn}`}
            onClick={() =>
              toast(
                "come on buddy! what are you booking? this is just a practice project😁"
              )
            }
          >
            Book Now
          </button>
        </>
      )}
    </div>
  );
}
