import React from "react";
import { MonthlyData } from "../DataVirtual";
interface Props {
  data: MonthlyData[];
}
const DataTable: React.FC<Props> = ({ data }) => {
  // a table with monthly average
  return (
    <table>
      <thead>
        <tr>
          <th>Month</th>
          <th>Tempature</th>
          <th>RH</th>
          <th>Wind</th>
          <th>Rain</th>
          <th>Area</th>
        </tr>
      </thead>
      {data.map((x) => (
        <tbody key={x.key}>
          <tr>
            <td>{x === null ? "" : x.month}</td>
            <td>{isNaN(x.temp) ? 0 : x.temp}</td>
            <td>{isNaN(x.RH) ? 0 : x.RH}</td>
            <td>{isNaN(x.wind) ? 0 : x.wind}</td>
            <td>{isNaN(x.rain) ? 0 : x.rain}</td>
            <td>{isNaN(x.area) ? 0 : x.area}</td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};

export default DataTable;
