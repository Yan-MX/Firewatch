import React, { useState } from "react";
import "./App.css";
import DataVirtual from "./components/DataVirtual";
import DataManage from "./components/DataManage";
import DataExport from "./components/DataExport";
//import { addData, useAllDataFromFB } from "./components/firebase/DataService";
//import jsonData from "./data/forestfires.json";

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
  const [screen, setScreen] = useState<any>(0);

  //this method is only used once when first import data to database
  // const initial = () => {
  //   const loadData: DataObject[] = [...jsonData];
  //   loadData.map((x) => {
  //     addData(x);
  //     console.log("attention initial");
  //   });
  // };

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
  const clickhandler3 = (event: any) => {
    setScreen(3);
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
          Export Data
        </button>
      </div>

      {/* conditional rendering */}
      <div className="space">
        {screen === 0 && (
          <div>
            {/* this button should only be clicked once when we first import data from Json file to Firebase */}
            {/* <button onClick={initial}>Add initial</button> */}
            <h2 className="greeting"> Hi, Welcome to FireWatch.</h2>
          </div>
        )}
      </div>

      <div className="space readable">
        {screen === 1 && <DataVirtual />}
        {screen === 2 && <DataManage />}
        {screen === 3 && <DataExport />}
      </div>
    </div>
  );
}

export default App;
