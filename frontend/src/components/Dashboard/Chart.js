import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const Chart = ({ transformedData }) => {
  const options = {
    theme: "dark2", // "light1", "dark1", "dark2"
    animationEnabled: true, //Change to false
    animationDuration: 2000,
    backgroundColor: "#b4c9f0", //Change it to 2000

    axisY: {
      title: "Number of Petitions",
      gridColor: "black",
      gridThickness: 0.3,
      titleFontColor: "black",
      labelFontColor: "black",
    },
    axisX: {
      gridColor: "black",
      titleFontColor: "black",
      labelFontColor: "black",
      lineColor: "black",
    },
    toolTip: {
      shared: true,
    },

    data: [
      {
        lineColor: "red",
        type: "line",
        name: `${transformedData[0].labels}`,
        showInLegend: true,
        dataPoints: transformedData[0].data,
      },
    ],
  };

  return (
    <section className="items-center flex justify-center py-2">
      <CanvasJSChart
        options={options}
        containerProps={{ width: "80%", height: "300px" }}
        /* onRef = {ref => this.chart = ref} */
      />
    </section>
  );
};

export default Chart;
