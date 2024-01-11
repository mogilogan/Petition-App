import React, { useEffect, useState } from "react";

import { dashboard } from "../../actions/count";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { petitions, isLoading } = useSelector((state) => state.petition);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

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

  useEffect(() => {
    SubmitFilter();
  }, []);

  const handleview = (petition_id) => {
    navigate(`/petition/:${petition_id}`);
  };

  return (
    <div className=" mx-auto w-full flex flex-col min-h-[100vh] items-center py-[10vh]  md:ml-[25%] ">
      <div class=" px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200  cursor-pointer rounded">
        <p className="flex-none text-lg">Filter By:</p>
      </div>
      {/* mobile filter */}

      {petitions && (
        <div>
          <h1 className="text-center">
            Total:{" "}
            {petitions[0]?.length + petitions[1]?.length + petitions[2]?.length}
          </h1>
          <div className="flex gap-4">
            <div className="hover:cursor-pointer" onClick={() => setNumber(0)}>
              <p className="text-center">New</p>
              <p style={{ width: 100, height: 100 }}>
                <CircularProgressbar
                  value={petitions[0]?.length}
                  maxValue={
                    petitions[0]?.length +
                    petitions[1]?.length +
                    petitions[2]?.length
                  }
                  text={`${petitions[0]?.length}`}
                />
              </p>
            </div>
            <div className="hover:cursor-pointer" onClick={() => setNumber(1)}>
              <p className="text-center">Ongoing</p>
              <p style={{ width: 100, height: 100 }}>
                <CircularProgressbar
                  value={petitions[1]?.length}
                  maxValue={
                    petitions[0]?.length +
                    petitions[1]?.length +
                    petitions[2]?.length
                  }
                  text={`${petitions[1]?.length}`}
                />
              </p>
            </div>
            <div className="hover:cursor-pointer" onClick={() => setNumber(2)}>
              <p className="text-center">closed</p>
              <p style={{ width: 100, height: 100 }}>
                <CircularProgressbar
                  value={petitions[2]?.length}
                  maxValue={
                    petitions[0]?.length +
                    petitions[1]?.length +
                    petitions[2]?.length
                  }
                  text={`${petitions[2]?.length}`}
                />
              </p>
            </div>
          </div>
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
                      {petition.type}
                    </td>
                    <td class="px-4 py-3 border" align="right">
                      {petition.time_stamp.slice(0, 10)}
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
