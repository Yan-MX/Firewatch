import React, { useState } from "react";
import jsonData from "./data/forestfires.json";

import DataVirtual from "./components/DataVirtual";
import DataManage from "./components/DataManage";
export type DataObject = {
  X: number;
  Y: number;
  month: string;
  day: string;
  FFMC: number;
  DMC: number;
  DC: number;
  ISI: number;
  temp: number;
  RH: number;
  wind: number;
  rain: number;
  area: number;
};

function App() {
  const loadData = [...jsonData];
  console.log(loadData[0]);

  const [datalist, setDatalist] = useState<DataObject[]>(loadData);
  const [data, setData] = useState<DataObject>();
  return (
    <div className="App">
      <h1>FireWatch</h1>
      <h2>Data Virtualization</h2>
      <DataVirtual />
      <h2>Data Management</h2>
      <DataManage setData={setData} />
    </div>
  );
}

export default App;
