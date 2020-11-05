//this component is responsible for export data in a CSV format
import React, { ReactElement } from "react";
import { CSVLink } from "react-csv";
import { DataObject } from "../App";
import { useAllDataFromFB } from "./firebase/DataService";

export default function DataExport(): ReactElement {
  const currentDataList: DataObject[] = useAllDataFromFB();
  //try to export a json file
  const headers = [
    { label: "X", key: "X" },
    { label: "Y", key: "Y" },
    { label: "month", key: "month" },
    { label: "day", key: "day" },
    { label: "FFMC", key: "FFMC" },
    { label: "DMC", key: "DMC" },
    { label: "DC", key: "DC" },
    { label: "ISI", key: "ISI" },
    { label: "temp", key: "temp" },
    { label: "RH", key: "RH" },
    { label: "wind", key: "wind" },
    { label: "rain", key: "rain" },
    { label: "area", key: "area" },
  ];
  const csvReport = {
    data: currentDataList,
    headers: headers,
    filename: "Fire_Report.csv",
  };
  return (
    <div>
      <p> Current datalist count: {currentDataList.length}</p>
      <CSVLink {...csvReport}>Export to CSV</CSVLink>
    </div>
  );
}
