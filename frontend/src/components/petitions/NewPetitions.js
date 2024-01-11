import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  assignins,
  assignsp,
  assignssp,
  assignsho,
  fetchall,
} from "../../actions/petition";

import { sspData } from "../../assests/ssp";

import { circle } from "../../assests/circle";
import { useNavigate } from "react-router-dom";

const NewPetitions = () => {
  //fetched user
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [data, setData] = useState(user?.userData);

  // fetch petitons from redux state
  const { petitions, isLoading } = useSelector((state) => state.petition);

  const [selectedValue, setSelectedValue] = useState("");
  // ssp data state
  const [selectedssp, setSelectedssp] = useState({});
  const [sspremarks, setSspremarks] = useState("");
  //sp data state
  const [selectedsp, setSelectedsp] = useState({});
  const [spremarks, setSpremarks] = useState("");
  //ins data state
  const [selectedins, setSelectedins] = useState({});
  const [insremarks, setInsremarks] = useState("");

  //sho data state
  const [selectedsho, setSelectedsho] = useState({});
  const [shoremarks, setShoremarks] = useState("");

  //last dropdowned selection
  const [selectedpetition, setSelectedpetition] = useState("");

  // error display
  const [error, setError] = useState("");

  //usereffect to make default select values
  useEffect(() => {
    setSelectedValue("new");
    data.whatnew = "newlyassigned";
    console.log(data);
    dispatch(fetchall(user.userData, "new", setError));
  }, []);

  // plugins declarations
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle Filter change
  const handleChange = async (e) => {
    data.whatnew = e.target.value;
    setError("");
    console.log(data);
    dispatch(fetchall(data, "new", setError));
  };

  // handle ssp select
  const handlessp = (petition_id) => {
    dispatch(
      assignssp({
        petition_id: petition_id,
        dept_name: selectedssp[petition_id],
        remarks: sspremarks,
        assigned_by: user?.userData.user_name,
      })
    );
  };

  // handle ssp change
  const handlesspchange = (e, petition_id) => {
    setSelectedpetition(petition_id);
    setSelectedssp((prevSelectedssp) => ({
      ...prevSelectedssp,
      [petition_id]: e.target.value,
    }));
  };

  //handle sp select
  const handlesp = (petition_id) => {
    dispatch(
      assignsp({
        petition_id: petition_id,
        sub_dept: selectedsp[petition_id],
        remarks: spremarks,
        assigned_by: user?.userData.user_name,
      })
    );
  };

  // handle sp change
  const handlespchange = (e, petition_id) => {
    setSelectedpetition(petition_id);
    setSelectedsp((prevSelectedsp) => ({
      ...prevSelectedsp,
      [petition_id]: e.target.value,
    }));
  };

  //handle inspector selct
  const handleins = (petition_id) => {
    if (selectedins[petition_id].slice(0, 3) === "SHO") {
      dispatch(
        assignsho({
          petition_id: petition_id,
          user_name: selectedins[petition_id],
          remarks: insremarks,
          assigned_by: user?.userData.user_name,
        })
      );
    } else {
      dispatch(
        assignins({
          petition_id: petition_id,
          circle_insp: selectedins[petition_id],
          remarks: insremarks,
          assigned_by: user?.userData.user_name,
        })
      );
    }
  };
  // handle ins change
  const handleinschange = (e, petition_id) => {
    setSelectedpetition(petition_id);
    setSelectedins((prevSelectedsp) => ({
      ...prevSelectedsp,
      [petition_id]: e.target.value,
    }));
  };

  //handle sho selct
  const handlesho = (petition_id) => {
    dispatch(
      assignsho({
        petition_id: petition_id,
        user_name: selectedsho[petition_id],
        remarks: shoremarks,
        assigned_by: user?.userData.user_name,
      })
    );
  };
  // handle sho change
  const handleshochange = (e, petition_id) => {
    setSelectedpetition(petition_id);
    setSelectedsho((prevSelectedsp) => ({
      ...prevSelectedsp,
      [petition_id]: e.target.value,
    }));
  };

  // all remarks field
  const handlesspremarks = (e) => {
    setSspremarks(e.target.value);
  };

  const handlespremarks = (e) => {
    setSpremarks(e.target.value);
  };

  const handleinsremarks = (e) => {
    setInsremarks(e.target.value);
  };
  const handleshoremarks = (e) => {
    setShoremarks(e.target.value);
  };

  // handle full page view
  const handleview = (petition_id) => {
    navigate(`/petition/:${petition_id}`);
  };

  const createBlobFromContent = (content) => {
    return new Blob([content], { type: "text/plain" });
  };

  return (
    <div className=" w-[100%] pt-16 flex flex-col min-h-[100vh]  md:ml-[25%]   bg-[#b6a072] ">
      <div className="flex flex-row justify-center">
        {(user?.userData?.rank === "2" ||
          user?.userData?.rank === "3" ||
          user?.userData?.rank === "4" ||
          user?.userData?.rank === "5") && (
          <div class=" px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
            <p className="flex-none text-lg">Filter By:</p>

            <select
              onChange={(e) => handleChange(e)}
              class=" focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
            >
              <option value="newlyassigned">Newly Assigned</option>
              <option value="forwarded">Forwarded</option>
            </select>
          </div>
        )}
      </div>

      {selectedValue !== "select" ? (
        <section class="container mx-auto p-6 font-mono">
          <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
            <div class="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th class="px-4 py-3">Petition Id</th>
                    <th class="px-4 py-3">type</th>
                    <th class="px-4 py-3">Date of Petition</th>

                    {selectedValue === "new" && (
                      <>
                        {
                          {
                            1: (
                              <>
                                <th class="px-4 py-3" align="right">
                                  Select SSp
                                </th>
                                <th class="px-4 py-3" align="right">
                                  Remarks
                                </th>
                                <th class="px-4 py-3" align="right">
                                  Assign Ssp
                                </th>
                              </>
                            ),
                            2: (
                              <>
                                {" "}
                                <th class="px-4 py-3" align="right">
                                  Select Sp{" "}
                                </th>
                                <th class="px-4 py-3" align="right">
                                  Remarks
                                </th>
                                <th cclass="px-4 py-3" align="right">
                                  Assign SP
                                </th>
                              </>
                            ),
                            3: (
                              <>
                                <th class="px-4 py-3" align="right">
                                  Select Circle Inspector{" "}
                                </th>
                                <th class="px-4 py-3" align="right">
                                  Remarks
                                </th>
                                <th class="px-4 py-3" align="right">
                                  Assign Circle Inspector
                                </th>
                              </>
                            ),
                            4: (
                              <>
                                <th class="px-4 py-3" align="right">
                                  Select Sho{" "}
                                </th>
                                <th class="px-4 py-3" align="right">
                                  Remarks
                                </th>
                                <th class="px-4 py-3" align="right">
                                  Assign Sho
                                </th>
                              </>
                            ),
                          }[user.userData.rank]
                        }
                      </>
                    )}

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
                        {petition?.time_stamp?.slice(0, 10)}
                      </td>

                      {selectedValue === "new" && (
                        <>
                          {
                            {
                              1: (
                                <>
                                  <td class=" text-left text-xs py-3 border">
                                    <select
                                      value={
                                        selectedssp[petition.petition_id] || ""
                                      }
                                      onChange={(e) =>
                                        handlesspchange(e, petition.petition_id)
                                      }
                                    >
                                      <option value="select">Select</option>
                                      {Object.keys(sspData).map((ssp) => (
                                        <option value={ssp}>{ssp}</option>
                                      ))}
                                    </select>
                                  </td>
                                </>
                              ),
                              2: (
                                <>
                                  <td align="right" class="px-4 py-3 border">
                                    <select
                                      value={
                                        selectedsp[petition.petition_id] || ""
                                      }
                                      onChange={(e) =>
                                        handlespchange(e, petition.petition_id)
                                      }
                                    >
                                      {sspData[user.userData.dept_name] !==
                                      (null || undefined) ? (
                                        <>
                                          <option value="select">Select</option>
                                          {Object.keys(
                                            sspData[user.userData.dept_name]
                                          ).map((sp, index) => (
                                            <option key={index} value={sp}>
                                              {sp}
                                            </option>
                                          ))}
                                        </>
                                      ) : (
                                        <>bad req</>
                                      )}
                                    </select>
                                  </td>
                                </>
                              ),
                              3: (
                                <>
                                  <td align="right" class="px-4 py-3 border">
                                    <select
                                      value={
                                        selectedins[petition.petition_id] || ""
                                      }
                                      onChange={(e) =>
                                        handleinschange(e, petition.petition_id)
                                      }
                                    >
                                      {sspData?.[user.userData.dept_name]?.[
                                        user.userData.sub_dept
                                      ]?.["CI"] === (null || undefined) ? (
                                        <>bad req</>
                                      ) : (
                                        <>
                                          <option value="select">Select</option>
                                          {Object.values(
                                            sspData?.[
                                              user.userData.dept_name
                                            ]?.[user.userData.sub_dept]?.["CI"]
                                          ).map((sp, index) => (
                                            <option key={index} value={sp}>
                                              {sp}
                                            </option>
                                          ))}
                                        </>
                                      )}
                                    </select>
                                  </td>
                                </>
                              ),
                              4: (
                                <>
                                  <td align="right" class="px-4 py-3 border">
                                    <select
                                      value={
                                        selectedsho[petition.petition_id] || ""
                                      }
                                      onChange={(e) =>
                                        handleshochange(e, petition.petition_id)
                                      }
                                    >
                                      {circle?.[user.userData.user_name] ===
                                      (null || undefined) ? (
                                        <>bad req</>
                                      ) : (
                                        <>
                                          <option value="select">Select</option>
                                          {Object.values(
                                            circle?.[user.userData.user_name]
                                          ).map((sho, index) => (
                                            <option key={index} value={sho}>
                                              {sho}
                                            </option>
                                          ))}
                                        </>
                                      )}
                                    </select>
                                  </td>
                                </>
                              ),
                            }[user.userData.rank]
                          }
                        </>
                      )}

                      {selectedValue === "new" && (
                        <>
                          {
                            {
                              1: (
                                <>
                                  <td>
                                    <textarea
                                      class="px-4 py-3 border"
                                      onChange={(e) => handlesspremarks(e)}
                                    ></textarea>
                                  </td>
                                  <td class="px-4 py-3 border">
                                    <button
                                      onClick={() =>
                                        handlessp(petition.petition_id)
                                      }
                                      disabled={
                                        selectedpetition !==
                                        petition.petition_id
                                      }
                                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                                    >
                                      Assign SSP
                                    </button>
                                  </td>
                                </>
                              ),
                              2: (
                                <>
                                  <td>
                                    <textarea
                                      class="px-4 py-3 border"
                                      onChange={(e) => handlespremarks(e)}
                                    ></textarea>
                                  </td>
                                  <td align="right" class="px-4 py-3 border">
                                    <button
                                      onClick={() =>
                                        handlesp(petition.petition_id)
                                      }
                                      disabled={
                                        selectedpetition !==
                                        petition.petition_id
                                      }
                                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                                    >
                                      Assign SP
                                    </button>
                                  </td>
                                </>
                              ),
                              3: (
                                <>
                                  <td>
                                    <textarea
                                      class="px-4 py-3 border"
                                      onChange={(e) => handleinsremarks(e)}
                                    ></textarea>
                                  </td>
                                  <td align="right" class="px-4 py-3 border">
                                    <button
                                      onClick={() =>
                                        handleins(petition.petition_id)
                                      }
                                      disabled={
                                        selectedpetition !==
                                        petition.petition_id
                                      }
                                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                                    >
                                      Assign Inspec
                                    </button>
                                  </td>
                                </>
                              ),
                              4: (
                                <>
                                  <td>
                                    <textarea
                                      class="px-4 py-3 border"
                                      onChange={(e) => handleshoremarks(e)}
                                    ></textarea>
                                  </td>
                                  <td align="right" class="px-4 py-3 border">
                                    <button
                                      onClick={() =>
                                        handlesho(petition.petition_id)
                                      }
                                      disabled={
                                        selectedpetition !==
                                        petition.petition_id
                                      }
                                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                                    >
                                      Assign SHO
                                    </button>
                                  </td>
                                </>
                              ),
                            }[user.userData.rank]
                          }
                        </>
                      )}

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
      ) : (
        <>
          <p>Select a Filter!</p>
        </>
      )}
    </div>
  );
};

export default NewPetitions;
