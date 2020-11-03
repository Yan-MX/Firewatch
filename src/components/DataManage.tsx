import React, { useState } from "react";
import { DataObject } from "../App";

interface Props {
  setDatalist: any;
}
const DataManage: React.FC<Props> = ({ setDatalist }) => {
  let empty: DataObject = {
    X: NaN,
    Y: NaN,
    month: "jan",
    day: "mon",
    FFMC: NaN,
    DMC: NaN,
    DC: NaN,
    ISI: NaN,
    temp: NaN,
    RH: NaN,
    wind: NaN,
    rain: NaN,
    area: NaN,
  };
  const [form, setForm] = useState<DataObject>(empty);
  const submit = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    console.log("submit form, please check");
    console.log(form);
  };
  const handleChange = (e: React.SyntheticEvent<EventTarget>): void => {
    e.preventDefault();
    const value = (e.target as HTMLInputElement).value;
    console.log("attention " + value);
    setForm({
      ...form,
      [(e.target as HTMLInputElement).name]: value, // only keep two decimal!
    });
  };
  return (
    <div className="component">
      <form onSubmit={submit}>
        <label>X</label>
        <input
          type="number"
          name="X"
          value={form.X}
          onChange={handleChange}
          required
        />
        <label>Y</label>
        <input
          type="number"
          name="Y"
          value={form.Y}
          onChange={handleChange}
          required
        />
        <label>Month</label>
        <select
          name="month"
          id="day"
          value={form.month}
          onChange={handleChange}
          required
        >
          <option value="jan">January</option>
          <option value="feb">February</option>
          <option value="mar">March</option>
          <option value="apr">April</option>
          <option value="may">May</option>
          <option value="jun">June</option>
          <option value="jul">July</option>
          <option value="aug">August</option>
          <option value="sep">September</option>
          <option value="oct">October</option>
          <option value="nov">November</option>
          <option value="dec">December</option>
        </select>
        <label>Day</label>
        <select
          name="day"
          id="day"
          value={form.day}
          onChange={handleChange}
          required
        >
          <option value="mon">Monday</option>
          <option value="tue">Tueday</option>
          <option value="wed">Wednesday</option>
          <option value="thu">Thurday</option>
          <option value="fri">Friday</option>
          <option value="sat">Saturday</option>
          <option value="sun">Sunday</option>
        </select>
        <br />
        <label>FFMC</label>
        <input
          type="number"
          name="FFMC"
          value={form.FFMC}
          onChange={handleChange}
          required
        />
        <label>DMC</label>
        <input
          type="number"
          name="DMC"
          value={form.DMC}
          onChange={handleChange}
          required
        />
        <label>DC</label>
        <input
          type="number"
          name="DC"
          value={form.DC}
          onChange={handleChange}
          required
        />
        <label>ISI</label>
        <input
          type="number"
          name="ISI"
          value={form.ISI}
          onChange={handleChange}
          required
        />
        <br />
        <label>temp</label>
        <input
          type="number"
          name="temp"
          value={form.temp}
          onChange={handleChange}
          required
        />
        <label>RH</label>
        <input
          type="number"
          name="RH"
          value={form.RH}
          onChange={handleChange}
          required
        />
        <label>wind</label>
        <input
          type="number"
          name="wind"
          value={form.wind}
          onChange={handleChange}
          required
        />
        <label>rain</label>
        <input
          type="number"
          name="rain"
          value={form.rain}
          onChange={handleChange}
          required
        />
        <label>area</label>
        <input
          type="number"
          name="area"
          value={form.area}
          onChange={handleChange}
          required
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default DataManage;
