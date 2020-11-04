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

  // function setDatalist2(a:DataObject[]): void {}
  const [datalist, setDatalist] = useState<DataObject[]>(loadData);
  const [screen, setScreen] = useState<any>(0);
  //change pages
  const clickhandler = (event: any) => {
    setScreen(1);
  };
  const clickhandler0 = (event: any) => {
    setScreen(0);
  };
  const clickhandler2 = (event: any) => {
    setScreen(2);
  };
  //try to export a json file
  const clickhandler3 = (event: any) => {
    let file = JSON.stringify(datalist, null, 2);
    console.log("attention here");
    console.log(file);
    const fs: any = require("fs");
    fs.writeFile("forestfires.json", file, function (err: any) {
      if (err) throw err;
      console.log("complete");
    });
  };
  return (
    <div>
      <div className="header space">
        <h1 onClick={clickhandler0}>FireWatch</h1>
        <button className="link-button" onClick={clickhandler}>
          Data Virtualization
        </button>
        <button className="link-button" onClick={clickhandler2}>
          Data Management
        </button>
        <button className="link-button" onClick={clickhandler3}>
          Export JSON
        </button>
      </div>
      {/* conditional rendering */}
      <div className="space readable">
        {screen === 1 && <DataVirtual />}
        {screen === 2 && (
          <DataManage datalist={datalist} setDatalist={setDatalist} />
        )}
      </div>
    </div>
  );
}

export default App;
