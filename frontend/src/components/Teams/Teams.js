import React from "react";

import madesh from "../../assests/madesh.jpeg";
import mogi from "../../assests/mogi.jpeg";
import kamal from "../../assests/kamal.jpg";
import jaymam from "../../assests/jaymam.jpg";
import narsir from "../../assests/narsir.jpg";
import vamsir from "../../assests/vamsir.jpg";

const Teams = () => {
  return (
    <div className=" mx-auto w-full flex flex-col min-h-[100vh] items-center bg-[#b4c9f0] justify-center  md:ml-[20%] ">
      <section class="py-6 dark:bg-gray-800 dark:text-gray-100">
        <div class="container flex flex-col items-center justify-center p-4 mx-auto space-y-8 sm:p-10">
          <h1 class="text-4xl font-bold leadi text-center sm:text-4xl">TEAM</h1>

          <div class="flex flex-row flex-wrap justify-center">
            <div class="flex flex-col justify-center m-8 text-center">
              <img
                alt=""
                class="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
                src={narsir}
              />
              <p class="text-xl font-semibold leadi">Mr. Narra Chaitanya IPS</p>
              <p class="dark:text-gray-400">SSP - L&O - Puducherry</p>
            </div>
            <div class="flex flex-col justify-center m-8 text-center">
              <img
                alt=""
                class="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
                src={vamsir}
              />
              <p class="text-xl font-semibold leadi">
                Mr. A/c Vamseedhara Reddy Datla PPS
              </p>
              <p class="dark:text-gray-400">SP (West)</p>
            </div>
          </div>
          <div class="flex flex-col justify-center m-8 text-center">
            <img
              alt=""
              class="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
              src={jaymam}
            />
            <p class="text-xl font-semibold leadi">Dr. K. Jayanthi</p>
            <p class="dark:text-gray-400">
              B.Tech., M.Tech., Ph.D., MISTE <br />
              PROFESSOR
            </p>
          </div>
          <p class="max-w-2xl text-center dark:text-gray-400">
            Students of ECE Department from Puducherry technological University
            developed this project
          </p>
          <div class="flex flex-row flex-wrap justify-center">
            <div class="flex flex-col justify-center m-8 text-center">
              <img
                alt=""
                class="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
                src={madesh}
              />
              <p class="text-xl font-semibold leadi">Madesh Varadhan</p>
              <p class="dark:text-gray-400">Database Manager</p>
            </div>
            <div class="flex flex-col justify-center m-8 text-center">
              <img
                alt=""
                class="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
                src={mogi}
              />
              <p class="text-xl font-semibold leadi">Moginder</p>
              <p class="dark:text-gray-400">Full Stack Developer</p>
            </div>
            <div class="flex flex-col justify-center m-8 text-center">
              <img
                alt=""
                class="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
                src={kamal}
              />
              <p class="text-xl font-semibold leadi">Kamalesh Kumar</p>
              <p class="dark:text-gray-400">Ui/Ux</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Teams;
