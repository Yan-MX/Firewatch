import React from "react";
import DataObject from "../App";
//setData type?
function DataManage({ setData }: { setData: any }) {
  return (
    <div>
      <form>
        <label>X</label>
        <input type="number" />
        <label>Y</label>
        <input type="number" />
        <label>Month</label>
        <input type="text" />
        <label>Day</label>
        <input type="text" />
        <br />
        <label>FFMC</label>
        <input type="number" />
        <label>DMC</label>
        <input type="number" />
        <label>DC</label>
        <input type="number" />
        <label>ISI</label>
        <input type="number" />
        <br />
        <label>temp</label>
        <input type="number" />
        <label>RH</label>
        <input type="number" />
        <label>wind</label>
        <input type="number" />
        <label>rain</label>
        <input type="number" />
        <label>area</label>
        <input type="number" />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default DataManage;
