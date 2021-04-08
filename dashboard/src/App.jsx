import React, { useEffect, useState } from "react";
import DropdownMenu from "./DropdownMenu";
import LineGraph from "./LineGraph";
import axios from "axios";

const App = () => {
  const [desiredSeries, setDesiredSeries] = useState(null);
  const [apiResults, setApiResults] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [lineGraphData, setLineGraphData] = useState([]);

  const updatedDesiredSeries = (series) => {
    console.log(series)
    setDesiredSeries(series);
  };

  //CALL RESULTS & DATA ENDPOINT AND SAVE TO STATE WHEN VIEW DATA SERIES BUTTON IS CLICKED
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/data/${desiredSeries}`
        );
        setApiData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchApiResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/results/${desiredSeries}`
        );
        setApiResults(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchApiData();
    fetchApiResults();
  }, [desiredSeries]);

  //PASSES ApiData & Api Results Predictions vs Actual DATA SERIES INTO THE LINE GRAPH COMPONENT
  useEffect(() => {
    if (apiResults.predictions) {
      const results = [...apiResults["predictions"]];
      const data = [...apiData];
      data.forEach((datapoint) => {
        results.forEach((result) => {
          if (datapoint["index"] === result["index"]) {
            result["Selected Series"] = datapoint[desiredSeries];
          }
        });
      });
      setLineGraphData(results);
    }
  }, [apiResults, apiData, desiredSeries]);

  console.log(desiredSeries)

  console.log(lineGraphData);

  return (
    <div>
      <DropdownMenu updatedDesiredSeries={updatedDesiredSeries} />
      <LineGraph data={lineGraphData} />
    </div>
  );
};

export default App;
