import React from "react";
import { MonthlyData } from "./DataVirtual";
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
            <td>{x.month}</td>
            <td>{x.temp}</td>
            <td>{x.RH}</td>
            <td>{x.wind}</td>
            <td>{x.rain}</td>
            <td>{x.area}</td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};

export default DataTable;
