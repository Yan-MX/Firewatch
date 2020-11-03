import React from "react";
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
  key: number;
  month: string;
  day: string;
  temp: number;
  RH: number;
  wind: number;
  rain: number;
  area: number;
};
let dataforChart: MonthlyData[];
const dataEdit = () => {
  console.log("data edit is called");
  console.log("sum length" + loadDatawithKey.length);
  let dataholder: DataObjectwithKey[] = loadDatawithKey.filter(
    (x) => x.month === "mar"
  );
  console.log("attention num of Jan:" + dataholder.length);
  let datapoint: MonthlyData;
  let accumulator = 0;
  let tempAverage: any =
    dataholder.reduce(function (accumulator, current) {
      return accumulator + current.temp;
    }, 0) / dataholder.length;
  console.log(tempAverage);
};
dataEdit();

function DataVirtual() {
  return (
    <div>
      <p>{loadData.slice(0, 10).map((a) => a.X)}</p>
    </div>
  );
}

export default DataVirtual;
