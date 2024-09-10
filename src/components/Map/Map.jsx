import { useHotels } from "../context/HotelsProvider";

export default function Map() {
  const { hotels } = useHotels();

  return <div>map</div>;
}
