import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { circle } from "../../assests/circle";
import { useNavigate } from "react-router-dom";
import { fetchreport } from "../../actions/report";
import { CLEAR } from "../../constants/actionTypes";

const Pending = () => {
  // plugins declarations
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //fetched user
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  // fetch petitons from redux state
  const { petitions, isLoading } = useSelector((state) => state.petition);

  // error display
  const [error, setError] = useState("");

  const handlefetch = async () => {
    const form = {
      user_name: user.userData.user_name,
      rank: user.userData.rank,
    };
    dispatch({ type: CLEAR });
    const message = await dispatch(fetchreport(form));
    window.alert(message);
  };

  //usereffect to make default select values
  useEffect(() => {
    handlefetch();
  }, []);

  // handle full page view
  const handleview = (petition_id) => {
    navigate(`/report/:${petition_id}`);
  };

  const createBlobFromContent = (content) => {
    return new Blob([content], { type: "text/plain" });
  };

  return (
    <div className=" w-[100%] pt-16 flex flex-col min-h-[100vh]  md:ml-[20%]   bg-[#b4c9f0] ">
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
                {petitions.map((petition) => (
                  <tr class="text-gray-700" key={petition.petition_id}>
                    <td class="px-4 py-3 border" align="center">
                      {petition.petition_id}
                    </td>
                    <td class="px-4 py-3 border" align="right">
                      {petition.title}
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

export default Pending;
