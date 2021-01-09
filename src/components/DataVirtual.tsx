//this DataVirtual component edit and process data and pass inn data to children component (they are in datavirtualComponents folder) to make charts, this component itself also render some charts as well.
import React from "react";
import styled from "@emotion/styled";
import DataTable from "./datavirtualComponents/DataTable";
import Drawlinechart from "./datavirtualComponents/Drawlinechart";
import Drawbarchart from "./datavirtualComponents/Drawbarchart";
import { useAllDataFromFB } from "../firebase/DataService";
import {
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
import { DataObject } from "../types";

//define some types & interface
export type MonthlyData = {
  key: string;
  month: string;
  temp: number;
  RH: number;
  wind: number;
  rain: number;
  area: number;
};
type DataObjectwithKey = DataObject & { key: number };

//styling
let Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2vw;
`;
let H2 = styled.h2`
  margin-top: 5vw;
`;

function DataVirtual() {
  let loadDatawithKey: DataObjectwithKey[];
  const currentDataList = useAllDataFromFB();
  // add a key to each data
  const dataHandler = () => {
    let num: number = 0;
    loadDatawithKey = currentDataList.map((data) => {
      return { ...data, key: num++ };
    });
  };
  dataHandler();

  //make data ready for virtualization
  let dataforChart: MonthlyData[] = [];
  //this method calculate mean of each factors in each month and add it to an array 'dataforChart'
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
  //for loop each month, calculate data mean
  for (let m of months) {
    dataEdit(m);
  }
  return (
    <Wrapper>
      {/* chart that can be customized */}
      <H2>Monthly Avearge (Linechart)</H2>
      <Drawlinechart data={dataforChart} />
      <H2>Monthly Avearge (Barchart)</H2>
      <Drawbarchart data={dataforChart} />
      {/* some other charts */}
      <H2> Monthly rain average (outside rain in mm/m2) </H2>
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
      <H2>Monthly relative humidity in %</H2>
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

      <H2>Monthly average of wind, fire area and tempetura</H2>
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
      <H2>Monthly Average Data Table</H2>
      <DataTable data={dataforChart} />
    </Wrapper>
  );
}

export default DataVirtual;
