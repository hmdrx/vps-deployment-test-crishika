import React from "react";
import {Chart, ArcElement} from 'chart.js'
import { Pie } from "react-chartjs-2";
Chart.register(ArcElement);

function PieChart({ chartData }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            }
          },
          tooltip: {
            // Tooltip will only receive click events
            events: ['click']
          }
        }}
      />
    </div>
  );
}
export default PieChart;