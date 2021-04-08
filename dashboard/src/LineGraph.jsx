import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { configChart } from "./configChart";

const LineGraph = ({ data }) => {
  let chart = am4core.create("chartdiv", am4charts.XYChart);

  configChart(data, chart);
  return (
    <div
      id="chartdiv"
      style={{ height: "50vh", fontSize: "15px", width: "75vw" }}
    ></div>
  );
};

export default LineGraph;
