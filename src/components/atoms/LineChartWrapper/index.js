import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const colors = [
  "#313869",
  "#bdceff",
  "#BBD19C",
  "#C9CDD9",
  "#AEB7CE",
  "#523735",
];

class LineChartWrapper extends Component {
  render() {
    return (
      <LineChart
        width={300}
        height={300}
        data={this.props.value}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      >
        <XAxis dataKey="name" />
        <YAxis padding={{ top: 0, right: 0, bottom: 0, left: 0 }} />
        <CartesianGrid strokeDasharray="4 8" />
        <Tooltip />

        {this.props.lines.map((dataSet, index) => {
          return (
            <Line
              type="monotone"
              dataKey={dataSet}
              stroke={colors[index]}
              activeDot={{ r: 8 }}
            />
          );
        })}
      </LineChart>
    );
  }
}

export default LineChartWrapper;
