import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const hotelsContext = createContext();
const currentHotelIdContext = createContext();
const currentHotelIdSetterContext = createContext();

export default function HotelsProvider({ children }) {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const options = JSON.parse(searchParams.get("options"));
  const room = options?.room;
  const requiredBeds = options?.adult + options?.children;
  const [currentHotelId, setCurrentHotelId] = useState(null);

  const { isLoading, data: hotels } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/hotels`,
    `q=${destination || ""}&accommodates_gte=${room}&beds_gte=${requiredBeds}`
  );

  return (
    <hotelsContext.Provider value={{ hotels, isLoading }}>
      <currentHotelIdContext.Provider value={currentHotelId}>
        <currentHotelIdSetterContext.Provider value={setCurrentHotelId}>
          {children}
        </currentHotelIdSetterContext.Provider>
      </currentHotelIdContext.Provider>
    </hotelsContext.Provider>
  );
}

export const useHotels = () => useContext(hotelsContext);
export const useCurrentHotelId = () => useContext(currentHotelIdContext);
export const useSetCurrentHotelId = () =>
  useContext(currentHotelIdSetterContext);
