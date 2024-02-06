import React, { useEffect, useState } from "react";

import Natemb from "../assests/National-Emblem.png";
import pypolemb from "../assests/pypol-embl.jpg";
import pypoltext from "../assests/pypol-name.png";

import Getcomplain from "./Status/Getcomplain";

import "react-circular-progressbar/dist/styles.css";

const Home = () => {
  return (
    <div className=" mx-auto w-full flex flex-col min-h-[100vh] bg-[#b4c9f0] items-center justify-center  md:ml-[20%] ">
      <img
        class="  rounded-2xl rounded-bl-2xl w-[80%]"
        src={pypoltext}
        alt="image"
      />

      <h1 className="text-5xl py-4 text-center font-mono text-white">
        Petition Monitoring System
      </h1>

      <div className="flex flex-row gap-5"></div>
    </div>
  );
};

export default Home;
