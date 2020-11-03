import React, { useState } from "react";
import jsonData from "./data/forestfires.json";
import "./App.css";
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

  const [datalist, setDatalist] = useState<DataObject[]>(loadData);
  const [screen, setScreen] = useState<any>(0);
  const clickhandler = (event: any) => {
    setScreen(1);
  };
  const clickhandler0 = (event: any) => {
    setScreen(0);
  };
  const clickhandler2 = (event: any) => {
    setScreen(2);
  };
  return (
    <div>
      <div className="header space">
        <h1 onClick={clickhandler0}>FireWatch</h1>
        <a onClick={clickhandler}>Data Virtualization</a>

        <a onClick={clickhandler2}>Data Management</a>
      </div>
      <div className="space readable">
        {screen === 1 && <DataVirtual />}
        {screen === 2 && <DataManage setDatalist={setDatalist} />}
      </div>
    </div>
  );
}

export default App;
