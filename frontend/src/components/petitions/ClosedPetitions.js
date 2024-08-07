import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchall } from "../../actions/petition";

import { useNavigate } from "react-router-dom";

const ClosedPetitions = () => {
  //fetched user
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [data, setData] = useState(user?.userData);
  // fetch petitons from redux state
  const { petitions, isLoading } = useSelector((state) => state.petition);

  // ssp data state

  // error display
  const [error, setError] = useState("");

  //usereffect to make default select values
  useEffect(() => {
    data.whatclosed = "byme";
    console.log(data);
    dispatch(fetchall(user.userData, "closed", setError));
  }, []);

  // plugins declarations
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle Filter change
  const handleChange = async (e) => {
    data.whatclosed = e.target.value;
    setError("");
    console.log(data);
    dispatch(fetchall(data, "closed", setError));
  };

  // handle full page view
  const handleview = (petition_id) => {
    navigate(`/petition/:${petition_id}`);
  };

  const createBlobFromContent = (content) => {
    return new Blob([content], { type: "text/plain" });
  };

  return (
    <div className=" w-[100%] pt-16 flex flex-col min-h-[100vh]  md:ml-[20%]   bg-[#b4c9f0] ">
      <div className="flex flex-row justify-center">
      {user?.userData?.rank !== "5" && <>
        <div class=" px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
          
          <p className="flex-none text-lg">Filter By:</p>
          <select
            onChange={(e) => handleChange(e)}
            class=" focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
          >
            <option value="byme">Closed by me</option>
            <option value="byothers">Closed by Others</option>
          </select>
          
        </div>
        </>
          }
      </div>

      <section class="container mx-auto p-6 font-mono">
        <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div class="w-full overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead>
                <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
              <th class="px-4 py-3">Petition Id</th>
                  <th class="px-4 py-3">Title</th>
                  <th class="px-4 py-3">Category</th>
                  <th class="px-4 py-3">Submitted_by</th>
                  <th class="px-4 py-3">Active Place</th>
                  <th class="px-4 py-3">Date of Petition</th>

                  <th class="px-4 py-3" align="right">
                    View Petition
                  </th>
                </tr>
              </thead>

              <tbody class="bg-white">
                {petitions.map((petition) => (
                  <tr class="text-gray-700" key={petition.petition_id}>
                    <td class="px-4 py-3 border" align="center">
                      {petition.petition_id}
                    </td>
                    <td class="px-4 py-3 border" align="right">
                      {petition.type}
                    </td>
                    <td class="px-4 py-3 border" align="right">
                      {petition.category}
                    </td>
                    <td class="px-4 py-3 border" align="right">
                      {petition.submitted_by}
                    </td>
                    <td class="px-4 py-3 border" align="right">
                      {petition.active_place}
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
    </div>
  );
};

export default ClosedPetitions;
