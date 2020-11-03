import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
  YAxis,
  XAxis,
  Area,
  AreaChart,
  ComposedChart,
  Bar,
} from "recharts";
import { DataObject } from "../App";
import jsonData from "../data/forestfires.json";
const loadData: DataObject[] = [...jsonData];
export type DataObjectwithKey = DataObject & { key: number };
let loadDatawithKey: DataObjectwithKey[];
// add a key to each data
const dataHandler = () => {
  let num: number = 0;
  loadDatawithKey = loadData.map((data) => {
    return { ...data, key: num++ };
  });
};
dataHandler();
//make data ready for virtualization
type MonthlyData = {
  key: string;
  month: string;
  temp: number;
  RH: number;
  wind: number;
  rain: number;
  area: number;
};
let dataforChart: MonthlyData[] = [];
const dataEdit = (month: string) => {
  let dataholder: DataObjectwithKey[] = loadDatawithKey.filter(
    (x) => x.month === month
  );

  let tempAverage: number = parseFloat(
    (
      dataholder.reduce(function (accumulator, current) {
        return accumulator + current.temp;
      }, 0) / dataholder.length
    ).toFixed(2)
  );
  let RHAverage: number = parseFloat(
    (
      dataholder.reduce(function (accumulator, current) {
        return accumulator + current.RH;
      }, 0) / dataholder.length
    ).toFixed(2)
  );
  let windAverage: number = parseFloat(
    (
      dataholder.reduce(function (accumulator, current) {
        return accumulator + current.wind;
      }, 0) / dataholder.length
    ).toFixed(2)
  );
  let rainAverage: number = parseFloat(
    (
      dataholder.reduce(function (accumulator, current) {
        return accumulator + current.rain;
      }, 0) / dataholder.length
    ).toFixed(2)
  );
  let areaAverage: number = parseFloat(
    (
      dataholder.reduce(function (accumulator, current) {
        return accumulator + current.area;
      }, 0) / dataholder.length
    ).toFixed(2)
  );
  dataforChart.push({
    key: month,
    month: month,
    temp: tempAverage,
    RH: RHAverage,
    wind: windAverage,
    rain: rainAverage,
    area: areaAverage,
  });
  console.log(dataforChart.length);
  console.log(dataforChart[dataforChart.length - 1]);
};
const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
for (let m of months) {
  dataEdit(m);
}

function DataVirtual() {
  return (
    <div>
      <p>
        Monthly trends for temperaturen (Celsius degrees) and the burned area of
        the forest(in ha)
      </p>
      <LineChart
        width={500}
        height={300}
        data={dataforChart}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="temp"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="area" stroke="#82ca9d" />
      </LineChart>
      <p> Monthly rain average (outside rain in mm/m2) </p>
      <AreaChart
        width={730}
        height={250}
        data={dataforChart}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorrain" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="month" />
        <YAxis />
        <CartesianGrid />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="rain"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorrain)"
        />
      </AreaChart>
      <p>Monthly relative humidity in %</p>
      <AreaChart
        width={730}
        height={250}
        data={dataforChart}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorRH" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="month" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="RH"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorRH)"
        />
      </AreaChart>
      <p>Monthly wind average (wind speed in km/h)</p>
      <LineChart
        width={730}
        height={250}
        data={dataforChart}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="wind" stroke="#6fdfee" />
      </LineChart>
      <p>Monthly average of wind, fire area and tempetura</p>
      <ComposedChart width={730} height={250} data={dataforChart}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area type="monotone" dataKey="wind" fill="#6fdfee" stroke="#8884d8" />
        <Bar dataKey="area" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="temp" stroke="#ff7300" />
      </ComposedChart>
    </div>
  );
}

export default DataVirtual;
