import React, { useEffect, useState } from "react";

import "react-circular-progressbar/dist/styles.css";
import Table from "./Table";

const Search = () => {
  return (
    <div className=" mx-auto w-full flex flex-col min-h-[100vh] bg-[#b4c9f0] items-center justify-center  md:ml-[20%] ">
      <h1 className="text-5xl py-4  font-mono text-white">Search Petitions</h1>

      <div className="flex flex-row gap-5">
        <Table />
      </div>
    </div>
  );
};

export default Search;
