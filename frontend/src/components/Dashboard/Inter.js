import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const Inter = ({ petitions, setShow }) => {
  console.log(petitions);
  const options = {
    animationEnabled: true,
    animationDuration: 2000,

    backgroundColor: "#b4c9f0",
    subtitles: [
      {
        text: `${
          petitions[0]?.length + petitions[1]?.length + petitions[2]?.length
        } Total`,
        verticalAlign: "center",
        fontSize: 24,
        dockInsidePlotArea: true,
      },
    ],

    data: [
      {
        indexLabelFontFamily: "serif",
        indexLabelFontSize: 18,
        startAngle: 240,
        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y}",

        dataPoints: [
          {
            name: "New",
            y: petitions[0]?.length,
            click: () => setShow(0),
          },
          {
            name: "Ongoing",
            y: petitions[1]?.length,
            click: () => setShow(1),
          },
          {
            name: "Closed",
            y: petitions[2]?.length,
            click: () => setShow(2),
          },
        ],
      },
    ],
  };
  return (
    <section className="items-center flex justify-center py-2">
      <CanvasJSChart
        options={options}
        containerProps={{ width: "80%", height: "300px" }}
      />
    </section>
  );
};

export default Inter;
