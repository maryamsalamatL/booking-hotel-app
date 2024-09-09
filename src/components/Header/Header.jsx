import { format } from "date-fns";
import { useRef, useState } from "react";
import "react-date-range/dist/styles.css";
import styles from "./Header.module.scss";
import { DateRange } from "react-date-range";
import { MdLocationOn } from "react-icons/md";
import "react-date-range/dist/theme/default.css";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";

export default function Header() {
  const [searchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });

  const [openDateRange, setOpenDateRange] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const navigate = useNavigate();

  const handleOptions = (name, operation) => {
    setOptions((prevState) => ({
      ...prevState,
      [name]: operation === "inc" ? prevState[name] + 1 : prevState[name] - 1,
    }));
  };

  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      options: JSON.stringify(options),
      destination,
    });

    navigate({ pathname: "/hotels", search: encodedParams.toString() });
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerSearch}>
        <MdLocationOn />
        <input
          type="text"
          placeholder="Where to go?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <div className={styles.headerFilters}>
        <div className={styles.dateRange}>
          <HiCalendar />
          <div
            id="dateDropDown"
            onClick={() => setOpenDateRange(!openDateRange)}
          >
            {format(date[0].startDate, "MM/dd/yyyy")} <span>to</span>
            {format(date[0].endDate, "MM/dd/yyyy")}
          </div>
          {openDateRange && (
            <DateDropDown setOpenDateRange={setOpenDateRange}>
              <DateRange
                ranges={date}
                onChange={(state) => setDate([state.selection])}
                moveRangeOnFirstSelection={true}
                minDate={new Date()}
              />
            </DateDropDown>
          )}
        </div>

        <div className={styles.guestOptions}>
          <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
            {options.adult} Adult &bull; {options.children} Children &bull;
            {options.room} Room &bull;
          </div>
          {openOptions && (
            <GuestOptionList
              setOpenOptions={setOpenOptions}
              options={options}
              handleOptions={handleOptions}
            />
          )}
        </div>
      </div>
      <button onClick={handleSearch} className={styles.searchButton}>
        {/* <HiSearch className={styles.searchIcon} /> */}
        Search
      </button>
    </div>
  );
}

function GuestOptionList({ options, handleOptions, setOpenOptions }) {
  const optionsRef = useRef();

  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));

  return (
    <div className={`${styles.optionList} ${styles.dropDown}`} ref={optionsRef}>
      <GuestOptionItem
        type="adult"
        options={options}
        minLimit={1}
        handleOptions={handleOptions}
      />
      <div className="horizontalSeparator" />
      <GuestOptionItem
        type="children"
        options={options}
        minLimit={0}
        handleOptions={handleOptions}
      />
      <div className="horizontalSeparator" />
      <GuestOptionItem
        type="room"
        options={options}
        minLimit={1}
        handleOptions={handleOptions}
      />
    </div>
  );
}

function GuestOptionItem({ options, type, minLimit, handleOptions }) {
  return (
    <div className={styles.optionItem}>
      <span>{type}</span>
      <div className={styles.optionCounter}>
        <button
          disabled={options[type] <= minLimit}
          onClick={() => handleOptions(type, "dec")}
        >
          <HiMinus />
        </button>
        <span>{options[type]}</span>
        <button onClick={() => handleOptions(type, "inc")}>
          <HiPlus />
        </button>
      </div>
    </div>
  );
}

function DateDropDown({ setOpenDateRange, children }) {
  const dateRef = useRef();

  useOutsideClick(dateRef, "dateDropDown", () => setOpenDateRange(false));

  return (
    <div ref={dateRef} className={`${styles.datePicker} ${styles.dropDown}`}>
      {children}
    </div>
  );
}
