import React from "react";

import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

import madesh from "../../assests/madesh.jpeg";
import mogi from "../../assests/mogi.jpeg";
import kamal from "../../assests/kamal.jpg";

const Teams = () => {
  return (
    <div className=" mx-auto w-full flex flex-col min-h-[100vh] items-center bg-[#b4c9f0] justify-center  md:ml-[20%] ">
      <div class="flex items-center justify-center  py-48">
        <div class="flex flex-col mt-8">
          <div class="container max-w-7xl px-4">
            <div class="flex flex-wrap justify-center text-center mb-24">
              <div class="w-full lg:w-6/12 px-4">
                <h1 class="text-gray-900 text-4xl font-bold mb-8">
                  Meet the Team
                </h1>

                <p class="text-gray-700 pb-10 text-lg font-light">
                  Students of ECE Department from Puducherry technological
                  University developed this project
                </p>
              </div>

              <div class="flex flex-wrap justify-center items-center">
                <div class="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                  <div class="flex flex-col">
                    <a href="#" class="mx-auto">
                      <img
                        class="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                        src={madesh}
                      />
                    </a>

                    <div class="text-center mt-6">
                      <h1 class="text-gray-900 text-xl font-bold mb-1">
                        Madesh varadhan
                      </h1>

                      <div class="text-gray-700 font-light mb-2">
                        Database and Query manager
                      </div>

                      <div
                        class="flex items-center justify-center opacity-50 hover:opacity-100
                                transition-opacity duration-300"
                      >
                        <a
                          href="https://github.com/madmaddy2003"
                          target="_blank"
                          class="flex rounded-full hover:bg-indigo-50 h-10 w-10"
                        >
                          <FaGithub />
                        </a>

                        <a
                          href="https://www.linkedin.com/in/madesh-varadhan-v-0b6968277/"
                          target="_blanl"
                          class="flex rounded-full hover:bg-blue-50 h-10 w-10"
                        >
                          <FaLinkedin />
                        </a>

                        <a
                          href="https://www.instagram.com/maddy_maddy_03/"
                          target="_blank"
                          class="flex rounded-full hover:bg-orange-50 h-10 w-10"
                        >
                          <FaInstagram />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                  <div class="flex flex-col">
                    <a href="#" class="mx-auto">
                      <img
                        class="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                        src={mogi}
                      />
                    </a>

                    <div class="text-center mt-6">
                      <h1 class="text-gray-900 text-xl font-bold mb-1">
                        Moginder
                      </h1>

                      <div class="text-gray-700 font-light mb-2">
                        Full Stack Developer
                      </div>

                      <div
                        class="flex items-center justify-center opacity-50 hover:opacity-100
                                transition-opacity duration-300"
                      >
                        <a
                          href="https://github.com/mogilogan"
                          target="_blank"
                          class="flex rounded-full hover:bg-indigo-50 h-10 w-10"
                        >
                          <FaGithub />
                        </a>

                        <a
                          href="https://www.linkedin.com/in/mogiegan/"
                          target="_blanl"
                          class="flex rounded-full hover:bg-blue-50 h-10 w-10"
                        >
                          <FaLinkedin />
                        </a>

                        <a
                          href="https://www.instagram.com/m.o.g.i_n.d.e.r/"
                          target="_blank"
                          class="flex rounded-full hover:bg-orange-50 h-10 w-10"
                        >
                          <FaInstagram />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                  <div class="flex flex-col">
                    <a href="#" class="mx-auto">
                      <img
                        width={220}
                        class="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                        src={kamal}
                      />
                    </a>

                    <div class="text-center mt-6">
                      <h1 class="text-gray-900 text-xl font-bold mb-1">
                        kamalesh Kumar
                      </h1>

                      <div class="text-gray-700 font-light mb-2">
                        Ui-ux and Design
                      </div>

                      <div
                        class="flex items-center justify-center opacity-50 hover:opacity-100
                                transition-opacity duration-300"
                      >
                        <a
                          href="https://github.com/kambooosss"
                          target="_blank"
                          class="flex rounded-full hover:bg-indigo-50 h-10 w-10"
                        >
                          <FaGithub />
                        </a>

                        <a
                          href="https://www.linkedin.com/in/kamlesh-kumar-b428251b5/"
                          target="_blanl"
                          class="flex rounded-full hover:bg-blue-50 h-10 w-10"
                        >
                          <FaLinkedin />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
