import styles from "./SingleHotel.module.scss";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
import { useSetCurrentHotelId } from "../context/HotelsProvider";
import { useEffect } from "react";

export default function SingleHotel() {
  const { id } = useParams();
  const { isLoading, data } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/hotels/${id}`
  );
  const { name, smart_location, xl_picture_url, number_of_reviews } = data;

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
        </>
      )}
    </div>
  );
}
