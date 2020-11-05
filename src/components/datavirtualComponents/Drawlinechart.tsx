import React, { useState } from "react";
import { MonthlyData } from "../DataVirtual";
import styled from "@emotion/styled";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
  YAxis,
  XAxis,
} from "recharts";
//styling
let Wrapper = styled.div`
  height: 400px;
  width: 800px;
  border: 1px dotted white;
`;
let Form = styled.form`
  margin: 2vw;
`;
interface Props {
  data: MonthlyData[];
}
//customize factor to draw a line chart
const Drawlinechart: React.FC<Props> = ({ data }) => {
  const [factor, setFactor] = useState<string>("temp");
  const [generate, setGenerate] = useState<boolean>(false);
  // submit form
  const submit = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    setGenerate(true);
  };
  // handle select change
  const handleChange = (e: React.SyntheticEvent<EventTarget>): void => {
    e.preventDefault();
    setGenerate(false);
    const value = (e.target as HTMLInputElement).value;
    setFactor(value);
  };
  return (
    <Wrapper>
      {/* user can choose from factors */}

      <Form onSubmit={submit}>
        <label>Select a factor</label>
        <select
          name="day"
          id="day"
          value={factor}
          onChange={handleChange}
          required
        >
          <option value="temp">Tempature</option>
          <option value="RH">Relative humidity</option>
          <option value="wind">Wind</option>
          <option value="area">Burnt Area</option>
          <option value="rain">Rain</option>
        </select>
        <input type="submit" value="Generate" />
      </Form>

      {/* when generate ===true, chart shows */}

      {generate && (
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={factor} stroke="#6fdfee" />
        </LineChart>
      )}
    </Wrapper>
  );
};

export default Drawlinechart;
