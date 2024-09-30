import { useState } from "react";
import toast from "react-hot-toast";

export default function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(null);

  const getPosition = () => {
    if (!navigator.geolocation)
      toast.error("Your browser does not support geolocation.");

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLoading(false);
      },
      (error) => {
        toast.error(error.message);
        setIsLoading(false);
      }
    );
  };

  return { isLoading, position, getPosition };
}
