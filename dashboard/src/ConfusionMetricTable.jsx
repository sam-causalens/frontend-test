import React from "react";

const ConfusionMetricTable = ({ data }) => {
  return (
    <div>
      <h2>Confusion Metric Table</h2>
      <table>
        <tbody>
          <tr style={{ backgroundColor: "lightgray" }}>
            <th>False Positive</th>
            <th>True Positive</th>
            <th>False Negative</th>
            <th>True Negative</th>
          </tr>
          <tr>
            <td>{data["falsePositive"]}</td>
            <td>{data["truePositive"]}</td>
            <td>{data["falseNegative"]}</td>
            <td>{data["trueNegative"]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ConfusionMetricTable;
