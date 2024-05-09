import React, { useEffect, useState } from "react";

import { dashboards } from "../../actions/count";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import MyChart from "./Chart";
import Type from "./Type";
import Inter from "./Inter";
import data from "../../assests/giphy (1).gif";

const Dashboard = () => {
  const navigate = useNavigate();
  const { dashboard, petitions, isLoading } = useSelector(
    (state) => state.petition
  );

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const [count, setCount] = useState([]);
  const [type, setType] = useState([]);
  const [typeData, setTypeData] = useState([]);

  const dispatch = useDispatch();
  const [number, setNumber] = useState(0);
  const [show, setShow] = useState(false);
  const [ssp, setSsp] = useState(null);
  const [sp, setSp] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [closed, setClosed] = useState(null);
  const [pending, setPending] = useState(null);

  const [error, setError] = useState("");

  const SubmitFilter = async () => {
    setError("");
    const formData = {
      user_name: user?.userData.user_name,
      rank: user?.userData.rank,
      ssp: ssp,
      sp: sp,
      month: month,
      year: year,
      closed: closed,
      pending: pending,
    };

    await dispatch(
      dashboards(formData, setError, setCount, setType, setTypeData)
    );
  };

  useEffect(() => {
    SubmitFilter();
  }, []);

  const handleview = (petition_id) => {
    navigate(`/petition/:${petition_id}`);
  };

  const handleshow = (number) => {
    console.log(number);
    setShow(true);
    setNumber(number);
  };

  const handlehide = () => {
    setShow(false);
  };

  const handleSelect = (e) => {
    console.log(e.target.value);

    setNumber(e.target.value);

    setTypeData(type[e.target.value]?.data);
    console.log(type);
  };
  return (
    <div className=" mx-auto w-full flex flex-col min-h-[100vh] items-center py-[10vh] md:py-[5vh] bg-[#b4c9f0] md:ml-[20%] ">
      <div class=" px-4 flex flex-row items-center text-sm font-medium leading-none text-gray-600 bg-[#b4c9f0] shadow-inner-blue-neumorphism-xl rounded-md   ">
        <p className="flex-none text-lg md:text-3xl font-mono font-bold">
          DASHBOARD
        </p>
        <img src={data} width={150} height={50} />
      </div>

      {/* mobile filter */}
      <div className=" w-full flex flex-col md:flex-row gap-2 py-4 px-4">
        {/* 1st graph */}
        <div className="flex  flex-col w-full shadow-blue-neumorphism-xl rounded-[20px] ">
          <div className="flex flex-row items-center justify-center ">
            <p className="my-auto font-bold text-md">Select Year:</p>
            <select className=" max-w-[80px] text-[1em] p-1 text-left max-h-[60px]">
              {count?.map((item, key) => (
                <option value={item.labels}>{item.labels}</option>
              ))}
            </select>
          </div>

          {count.length > 0 && ( // Check if dash has data before rendering MyChart
            <React.Fragment>
              <MyChart transformedData={count} />
            </React.Fragment>
          )}
        </div>

        {/* 2nd  graph */}
        <div className="flex  flex-col w-full shadow-blue-neumorphism-xl rounded-[20px]">
          <div className="flex flex-row items-center justify-center">
            <p className="my-auto font-bold text-md">Select type:</p>
            <select
              onChange={handleSelect}
              className=" max-w-[80px] text-[1em] p-1 text-left max-h-[60px]"
            >
              {type?.map((item, key) => (
                <option value={key}>{item.labels}</option>
              ))}
            </select>
          </div>

          {typeData?.length > 0 && ( // Check if dash has data before rendering MyChart
            <React.Fragment>
              <p className="text-center ">
                Peititon Count from {type[number].labels}
              </p>
              <Type transformedData={typeData} />
            </React.Fragment>
          )}
        </div>
      </div>
      {petitions && (
        <section className=" shadow-inner-blue-neumorphism-xl w-[50%] md:w-[80%] px-4 rounded-[10px] py-2">
          <p className=" text-lg md:text-3xl text-center  font-mono font-semibold  text-[#000000] ">
            Overall Petition Progress
          </p>
          <Inter petitions={petitions} setShow={handleshow} />

          {show && (
            <section class="container mx-auto p-6 font-mono">
              <p
                onClick={handlehide}
                className="bg-[#bbb931] text-white max-w-[100px] rounded-xl  items-center justify-center flex text-center mx-auto"
              >
                Close!
              </p>

              <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                <div class="w-full overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                        <th class="px-4 py-3">Petition Id</th>
                        <th class="px-4 py-3">Title</th>
                        <th class="px-4 py-3">Date of Petition</th>

                        <th class="px-4 py-3" align="right">
                          View Petition
                        </th>
                      </tr>
                    </thead>

                    <tbody class="bg-white">
                      {petitions[number]?.map((petition) => (
                        <tr class="text-gray-700" key={petition?.petition_id}>
                          <td class="px-4 py-3 border" align="center">
                            {petition?.petition_id}
                          </td>
                          <td class="px-4 py-3 border" align="right">
                            {petition?.type}
                          </td>
                          <td class="px-4 py-3 border" align="right">
                            {petition?.time_stamp?.slice(0, 10)}
                          </td>

                          <td align="right" class="px-4 py-3 border">
                            <button
                              onClick={() => handleview(petition.petition_id)}
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {error !== (null || undefined) ? (
                    <p className="md:text-2xl text-lg text-center  py-4">
                      {error}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </section>
          )}
          {error !== null && <p>{error}</p>}
        </section>
      )}
    </div>
  );
};

export default Dashboard;
