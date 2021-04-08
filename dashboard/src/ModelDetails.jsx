import React from 'react';

const ModelDetails = ({data}) => {
    return (
        <div>
        <h2>Model Data Table</h2>
        <table>
          <tr style={{backgroundColor: "lightgray"}}>
            <th>Algo Type</th>
            <th>Scaling Mode</th>
            <th>Training Mode</th>
          </tr>
          <tr>
              <td>{data["algo_type"]}</td>
              <td>{data["scaling"]}</td>
              <td>{data["training_mode"]}</td>
          </tr>
        </table>
      </div>
    );
};

export default ModelDetails;