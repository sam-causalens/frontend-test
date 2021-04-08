import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";

export const configChart = (data, chart) => {
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "index";
  categoryAxis.fontSize = 10;
  categoryAxis.renderer.labels.template.rotation = 20;
  categoryAxis.title.text = "Date"

  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.title.text = "Value";

  let seriesActual = chart.series.push(new am4charts.LineSeries());
  seriesActual.name = "Selected Series";
  seriesActual.tooltipText =
    "({categoryX}) Selected Series: {valueY}";
  seriesActual.strokeWidth = 0;
  seriesActual.dataFields.valueY = "Selected Series";
  seriesActual.dataFields.categoryX = "index";
  seriesActual.strokeWidth = 3;

  let seriesPredicted = chart.series.push(new am4charts.LineSeries());
  seriesPredicted.name = "prediction";
  seriesPredicted.tooltipText = "({categoryX}) prediction: {valueY}";
  seriesPredicted.strokeWidth = 0;
  seriesPredicted.dataFields.valueY = "prediction";
  seriesPredicted.dataFields.categoryX = "index";
  seriesPredicted.strokeWidth = 3;
  
  chart.cursor = new am4charts.XYCursor();

  chart.data = data;

  chart.legend = new am4charts.Legend();
}