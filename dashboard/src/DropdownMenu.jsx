import React, { useEffect, useState } from "react";
import axios from "axios";

const DropdownMenu = ({ updatedDesiredSeries }) => {
  const [arrayOfSeries, setArrayOfSeries] = useState([]);
  const [currentSelectedSeries, setCurrentSelectedSeries] = useState("");

  //CALL SERIES ENDPOINT AND SAVE TO STATE ON PAGE LOAD
  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get("http://localhost:3001/series");
        setArrayOfSeries(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSeries();
  }, []);

  return (
    <form>
      <select onChange={(event) => setCurrentSelectedSeries(event.target.value)}>
        <option
          defaultValue="Select Data Series"
          key="Select Data Series"
          disabled
          selected
          hidden
        >
          Select Data Series
        </option>
        {arrayOfSeries &&
          arrayOfSeries.map((series) => {
            return <option key={series}> {series} </option>;
          })}
      </select>
      <button
        onClick={(event) => {
          event.preventDefault();
          updatedDesiredSeries(currentSelectedSeries)
        }}
      >
        {" "}
        View Data Series
      </button>
    </form>
  );
};

export default DropdownMenu;
