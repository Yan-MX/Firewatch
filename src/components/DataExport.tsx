import React, { ReactElement } from "react";
import { CSVLink } from "react-csv";
import { DataObject } from "../App";
import { useAllDataFromFBWithUpdates } from "./firebase/DataService";
interface Props {
  currentDataList: DataObject[];
}

export default function DataExport({ currentDataList }: Props): ReactElement {
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
