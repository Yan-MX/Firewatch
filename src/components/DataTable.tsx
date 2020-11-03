import React from "react";
import { MonthlyData } from "./DataVirtual";
interface Props {
  data: MonthlyData[];
}
const DataTable: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <tr>
        <th>Month</th>
        <th>Tempature</th>
        <th>RH</th>
        <th>Wind</th>
        <th>Rain</th>
        <th>Area</th>
      </tr>
      {data.map((x) => (
        <tr>
          <td>{x.month}</td>
          <td>{x.temp}</td>
          <td>{x.RH}</td>
          <td>{x.wind}</td>
          <td>{x.rain}</td>
          <td>{x.area}</td>
        </tr>
      ))}
    </div>
  );
};

export default DataTable;
