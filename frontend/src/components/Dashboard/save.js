import React, { useState } from "react";

import { dashboard } from "../../actions/count";
import { useDispatch, useSelector } from "react-redux";

import { sspData } from "../../assests/ssp";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const [selectedValue, setSelectedValue] = useState("");
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

  const { petitions, isLoading } = useSelector((state) => state.petition);

  const SubmitFilter = async (e) => {
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

    await dispatch(dashboard(formData, setError));
  };
  const handleview = (petition_id) => {
    navigate(`/petition/:${petition_id}`);
  };

  return (
    <div className=" mx-auto w-full flex flex-col min-h-[100vh] items-center py-[10vh]  md:ml-[25%] ">
      <div class=" px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200  cursor-pointer rounded">
        <p className="flex-none text-lg">Filter By:</p>

        {user?.userData?.rank === "1" && (
          <select
            value={ssp}
            onChange={(e) => {
              console.log(e.target.value);
              setSsp(e.target.value);

              setSp(null);
            }}
            class=" focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
          >
            <option value={null}>Select SSP</option>
            <option value="SSP_L&O">SSP_L&O</option>
            <option value="SSP_CRI">SSP_CRI</option>
            <option value="SSP_HQ">SSP_HQ</option>
            <option value="SSP_TRAFFIC">SSP_TRAFFIC</option>
          </select>
        )}
        {["2", "1"].includes(user?.userData?.rank) && (
          <select
            value={sp === null ? "Select SP" : sp}
            onChange={(e) => {
              setSp(e.target.value);
              if (e.target.value === "Select") {
                setSp(null);
              }
            }}
            class=" focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
          >
            {sspData[user?.userData?.user_name] !== (null || undefined) ? (
              <>
                <option value="Select">Select SP</option>
                {Object.keys(sspData[user?.userData?.user_name]).map(
                  (sp, index) => (
                    <option key={index} value={sp}>
                      {sp}
                    </option>
                  )
                )}
              </>
            ) : (
              <option disabled value={null}>
                No SSP Selected
              </option>
            )}
          </select>
        )}

        {["3", "2", "1"].includes(user?.userData?.rank) && (
          <select
            value={sp === null ? "Select SP" : sp}
            onChange={(e) => {
              setSp(e.target.value);
              if (e.target.value === "Select") {
                setSp(null);
              }
            }}
            class=" focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
          >
            {sspData[user?.userData?.user_name] !== (null || undefined) ? (
              <>
                <option value="Select">Select SP</option>
                {Object.keys(sspData[user?.userData?.user_name]).map(
                  (sp, index) => (
                    <option key={index} value={sp}>
                      {sp}
                    </option>
                  )
                )}
              </>
            ) : (
              <option disabled value={null}>
                No SSP Selected
              </option>
            )}
          </select>
        )}

        {["4", "3", "2", "1"].includes(user?.userData?.rank) && (
          <select
            value={sp === null ? "Select SP" : sp}
            onChange={(e) => {
              setSp(e.target.value);
              if (e.target.value === "Select") {
                setSp(null);
              }
            }}
            class=" focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
          >
            {sspData[user?.userData?.user_name] !== (null || undefined) ? (
              <>
                <option value="Select">Select SP</option>
                {Object.keys(sspData[user?.userData?.user_name]).map(
                  (sp, index) => (
                    <option key={index} value={sp}>
                      {sp}
                    </option>
                  )
                )}
              </>
            ) : (
              <option disabled value={null}>
                No SSP Selected
              </option>
            )}
          </select>
        )}

        <select
          onChange={(e) => {
            setMonth(e.target.value);
            console.log(e.target.value);
            if (e.target.value === "0") {
              console.log(month);
              setMonth(null);
            }
          }}
          class=" focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
        >
          <option value="0">Select month</option>
          <option value="1">Jan</option>
          <option value="2">FEB</option>
          <option value="3">MAR</option>
          <option value="4">APRIL</option>
          <option value="5">MAY</option>
          <option value="6">JUN</option>
          <option value="7">JUL</option>
          <option value="8">AUG</option>
          <option value="9">SEP</option>
          <option value="10">OCT</option>
          <option value="11">NOV</option>
          <option value="12">DEC</option>
        </select>

        <select
          onChange={(e) => {
            setYear(e.target.value);
          }}
          class=" focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
        >
          <option value={null}>Select Year</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>

        <button
          onClick={SubmitFilter}
          className="dropbtn bg-red-500 px-4 py-4 rounded-lg"
        >
          Fetch
        </button>
      </div>
      {/* mobile filter */}
      <div className="relative z-10 block md:hidden  text-white">
        <div className="dropdown">
          <button
            onClick={() => setShow(!show)}
            className="dropbtn bg-red-500 px-4 py-4 rounded-lg"
          >
            Filters
          </button>
          {show && (
            <div className="bg-[#642a00ee] px-4 py-4">
              <p href="#">ok</p>
              <p href="#">ok</p>
              <p href="#">ok</p>
              <p href="#">ok</p>
            </div>
          )}
        </div>
      </div>
      {/* feeed petitiotns */}

      {petitions && (
        <div>
          <h1 className="text-center">Counts</h1>
          <p onClick={() => setNumber(0)}>New count: {petitions[0]?.length}</p>
          <p onClick={() => setNumber(1)}>
            Ongoing count: {petitions[1]?.length}
          </p>
          <p onClick={() => setNumber(2)}>
            Closed count: {petitions[2]?.length}
          </p>
        </div>
      )}
      <section class="container mx-auto p-6 font-mono">
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
                  <tr class="text-gray-700" key={petition.petition_id}>
                    <td class="px-4 py-3 border" align="center">
                      {petition.petition_id}
                    </td>
                    <td class="px-4 py-3 border" align="right">
                      {petition.title}
                    </td>
                    <td class="px-4 py-3 border" align="right">
                      {petition.time_stamp.slice(0, 10)}
                    </td>

                    <td align="right" class="px-4 py-3 border">
                      <button
                        onClick={handleview}
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
              <p className="md:text-2xl text-lg text-center  py-4">{error}</p>
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>
      {error !== null && <p>{error}</p>}
    </div>
  );
};

export default Dashboard;
