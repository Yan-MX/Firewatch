import React, { useEffect, useState } from "react";
import { DataObject } from "../App";
import styled from "@emotion/styled";
import {
  addCountFile,
  setCountInCountFile,
  addData,
  getDataCount,
} from "./firebase/DataService";
const JsonTable = require("ts-react-json-table");

//styling
let Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
let Label = styled.label`
  margin: 1vw 1vw;
`;
let P = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: 1.8vw;
`;
let Input = styled.input`
  margin: 1vw 0;
  border-radius: 5px;
`;
let Input2 = styled.input`
  margin: 1vw 3vw;
  border-radius: 5px;
  width: 5vw;
  cursor: pointer;
`;
let Form = styled.form`
  margin: 3vw 0;
  background-color: white;
  box-shadow: 0 4px 8px 0 #c6eff0;
  padding-top: 3vw;
  width: 80%;
`;
interface Props {
  loadedData: DataObject[];
  datalist: DataObject[];
  setDatalist: (dl: DataObject[]) => void;
}
const DataManage = ({ loadedData, datalist, setDatalist }: Props) => {
  //set initial value to the minimum value of factors
  let empty: DataObject = {
    X: 1,
    Y: 1,
    month: "jan",
    day: "mon",
    FFMC: 18.7,
    DMC: 1.1,
    DC: 7.9,
    ISI: 0.0,
    temp: 2.2,
    RH: 15.0,
    wind: 0.4,
    rain: 0.0,
    area: 0.0,
  };
  const [form, setForm] = useState<DataObject>(empty);
  useEffect(() => {
    setDatalist(loadedData);
  }, []);
  const submit = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    addData(form);
    setDatalist([...datalist, form]);
    setForm(empty);
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
    <Wrapper>
      <Form onSubmit={submit}>
        <P> Add new data</P>
        <Label>X</Label>
        <Input
          type="number"
          name="X"
          value={form.X}
          onChange={handleChange}
          required
        />
        <Label>Y</Label>
        <Input
          type="number"
          name="Y"
          value={form.Y}
          onChange={handleChange}
          required
        />
        <Label>Month</Label>
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
        <Label>Day</Label>
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
        <Label>FFMC</Label>
        <Input
          type="number"
          name="FFMC"
          value={form.FFMC}
          onChange={handleChange}
          required
        />
        <Label>DMC</Label>
        <Input
          type="number"
          name="DMC"
          value={form.DMC}
          onChange={handleChange}
          required
        />
        <Label>DC</Label>
        <Input
          type="number"
          name="DC"
          value={form.DC}
          onChange={handleChange}
          required
        />
        <br />
        <Label>ISI</Label>
        <Input
          type="number"
          name="ISI"
          value={form.ISI}
          onChange={handleChange}
          required
        />
        <Label>temp</Label>
        <Input
          type="number"
          name="temp"
          value={form.temp}
          onChange={handleChange}
          required
        />
        <Label>RH</Label>
        <Input
          type="number"
          name="RH"
          value={form.RH}
          onChange={handleChange}
          required
        />
        <br />
        <Label>wind</Label>
        <Input
          type="number"
          name="wind"
          value={form.wind}
          onChange={handleChange}
          required
        />
        <Label>rain</Label>
        <Input
          type="number"
          name="rain"
          value={form.rain}
          onChange={handleChange}
          required
        />
        <Label>area</Label>
        <Input
          type="number"
          name="area"
          value={form.area}
          onChange={handleChange}
          required
        />
        <br />
        <Input2 type="submit" value="Submit" />
      </Form>
      <p> ------------------------------ </p>
      <P>Show the last 20 rows of data: </P>
      <Form>
        <JsonTable
          rows={datalist}
          columns={[
            "month",
            "day",
            "temp",
            "FFMC",
            "DMC",
            "DC",
            "ISI",
            "RH",
            "wind",
            "rain",
            "area",
          ]}
        />
      </Form>
    </Wrapper>
  );
};

export default DataManage;
