import React, { useEffect, useState } from "react";
import DropdownMenu from "./DropdownMenu";
import LineGraph from "./LineGraph";
import axios from "axios";
import ConfusionMetricTable from "./ConfusionMetricTable";
import ModelDetails from "./ModelDetails";

const App = () => {
  const [desiredSeries, setDesiredSeries] = useState(null);
  const [apiResults, setApiResults] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [lineGraphData, setLineGraphData] = useState([]);
  const [confusionMetricData, setConfusionMetricData] = useState({})
  const [modelData, setModelData] = useState({})
  const [featureImportanceData, setFeatureImportanceData] = useState({})

  const updatedDesiredSeries = (series) => {
    setDesiredSeries(series);
  };

  //CALL RESULTS & DATA ENDPOINT AND SAVE TO STATE WHEN VIEW DATA SERIES BUTTON IS CLICKED
  useEffect(() => {
    setConfusionMetricData({})
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
        setConfusionMetricData(response.data.confusionMetric)
        setModelData(response.data.modelSummary)

        const featureImportanceData = []
        const arrayOfFeatureNames = Object.keys(response.data.featureImportance)
        arrayOfFeatureNames.forEach((featureName) => {
          featureImportanceData.push({
            "Feature": featureName,
            "Importance": response.data.featureImportance.featureName
          })
        })
        setFeatureImportanceData(featureImportanceData)
      } catch (err) {
        console.error(err);
      }
    };

    fetchApiData();
    fetchApiResults();
  }, [desiredSeries]);

  // console.log(featureImportanceData)

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

  console.log(desiredSeries, confusionMetricData)

  return (
    <div>
      <h1>CausaLens Data Dashboard</h1>
      <DropdownMenu updatedDesiredSeries={updatedDesiredSeries} />
      <LineGraph data={lineGraphData} />
      <ConfusionMetricTable data={confusionMetricData} />
      <ModelDetails data={modelData} />
    </div>
  );
};

export default App;
