import React, { useState, useEffect } from "react";
import jsonData from "./data/forestfires_small.json";
import Firebasedata from "./components/firebase/Firebasedata";
import "./App.css";
import DataVirtual from "./components/DataVirtual";
import DataManage from "./components/DataManage";
import DataExport from "./components/DataExport";
import {
  addCountFile,
  setCountInCountFile,
  addData,
  getDataCount,
  useAllDataFromFB,
} from "./components/firebase/DataService";
import { AuthContext } from "./components/firebase/AuthContext";
import useFirebaseAuth from "./components/firebase/useFirebaseAuth";

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
  const loadedData = useAllDataFromFB();
  const authContext = useFirebaseAuth();

  // addtoFire();
  // function setDatalist2(a:DataObject[]): void {}
  const [datalist, setDatalist] = useState<DataObject[]>([]);
  const [screen, setScreen] = useState<any>(0);
  const [dataCount, setDataCount] = useState<number>(0);
  /*
  const addInitialDataToFirebase = () => {
    addCountFile();
    loadData.map((x) => {
      addData({ dataCount, setDataCount }, x);
    });
    setCountInCountFile(loadData.length);
    console.log("Data added. Row count: ", loadData.length);
  };

  useEffect(() => {
    getDataCount({ dataCount, setDataCount });
    console.log("currentDataCountInFirebase: ", dataCount);
    if (dataCount === 0) {
      addInitialDataToFirebase();
    } else {
      console.log(
        "Already has data in collection. Current data count: ",
        dataCount
      );
    }
  }, []);*/

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
      <div className="space readable">
        {screen === 1 && <DataVirtual currentDataList={datalist} />}
        {screen === 2 && (
          <DataManage
            loadedData={loadedData}
            datalist={datalist}
            setDatalist={setDatalist}
          />
        )}
        {screen === 3 && <DataExport currentDataList={datalist} />}
      </div>
    </div>
  );
}

export default App;
