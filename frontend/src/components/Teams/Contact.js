import React, { useEffect, useState } from "react";
import { FaFax } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";

const Contact = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Simulate setting the pre-filled content after component mount
    setMessage(
      "Office of the Director research," +
        "\n" +
        "Puducherry technological university," +
        "\n" +
        "East coast Road, Pillaichavady, Puducherry, 605 014."
    );
  }, []);
  return (
    <div className=" mx-auto w-full flex flex-col min-h-[100vh] items-center bg-[#b4c9f0] justify-center  md:ml-[20%] ">
      {" "}
      <div>
        <section className="text-gray-700 body-font relative">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Contact Us
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Petition Monitoring System
              </p>
            </div>
            <div className=" md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div class="flex items-center mt-4 text-gray-600 dark:text-gray-400">
                  For Website Queries:
                  <BsTelephone size={30} />
                  <div class="ml-4 text-md tracking-wide font-semibold w-40">
                    +918778434982
                  </div>
                </div>

                <div class="flex items-center mt-4 text-gray-600 dark:text-gray-400">
                  For Website Queries:
                  <IoMdMail size={30} />
                  <div class="ml-4 text-md tracking-wide font-semibold w-40">
                    mogiegan@gmail.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
