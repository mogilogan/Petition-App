import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { statuscheck } from "../../actions/status";
import Table from "./Table";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

// initial state for petition id
const initialState = { search_by: "id", search_item: "" };

const Tables = () => {
  useEffect(() => {
    setErrmsg("");
  }, []);

  //redux tool
  const dispatch = useDispatch();

  //err msg
  const [errmsg, setErrmsg] = useState("");

  // fetch petition from redux store.
  const { petition } = useSelector((state) => state.status);

  // local state
  const [data, setData] = useState(initialState);

  // handble select
  const handleChange = async (e) => {
    setData({ ...data, search_item: "" });
    setData({ ...data, search_by: e.target.value });
  };

  // fetch petition by id
  const fetchPetition = async () => {
    setErrmsg("");
    console.log(data);
    const errmsgs = await dispatch(statuscheck(data));

    setErrmsg(errmsgs);
  };

  return (
    <div className=" flex flex-col items-center justify-center  ">
      <h1 className="text-3xl text-[#0d193a] py-2 text-center font-libre">
        Check Complain Details and Status
      </h1>

      <div class=" px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-100 hover:bg-gray-300 cursor-pointer rounded">
        <p className="flex-none text-lg">Search By:</p>
        <select
          onChange={(e) => handleChange(e)}
          class=" focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
        >
          <option value="id">Petition_id</option>
          <option value="mail">Mail ID</option>
          <option value="mobile">Mobile Number</option>
          <option value="date">Date (YYYY/MM/DD)</option>
        </select>
      </div>

      <Box className="text-center py-2">
        <input
          className="formtext"
          placeholder={`${data.search_by}`}
          type="text"
          name="search_item"
          id="outlined-basic"
          label="Enter Complain Id"
          variant="outlined"
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
        />
        <br />
        <div className="py-4">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            variant="contained"
            style={{ zIndex: 0 }}
            onClick={fetchPetition}
          >
            Get complain
          </button>
        </div>
      </Box>

      {errmsg === undefined ? (
        <>
          {petition?.length > 1 ? (
            <div>
              <div class="py-4 ">
                <table class="w-full overflow-scroll shadow rounded">
                  <thead>
                    <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                      <th class="px-4 py-3">Petition Number</th>
                      <th class="px-4 py-3">Petition Time</th>
                      <th class="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white">
                    {petition.map((item, index) => (
                      <tr key={index} class="text-gray-700 font-mono">
                        <td class="px-4 py-3 border">
                          <div class="flex items-center text-sm">
                            <div>
                              <p class="font-semibold text-black">
                                {item.petition_id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-3 text-ms font-semibold border">
                          {item.time_stamp}
                        </td>
                        <td class="px-4 py-3 text-xs border">
                          {(() => {
                            switch (true) {
                              case item?.dept === null:
                                return <>Pending</>;

                              case item.dept != null && item.sub_dept === null:
                                return <>Viewed by SSP</>;

                              case item.sub_dept != null &&
                                item.user_name === null:
                                return <>Viewed by SP</>;

                              case item?.user_name != null && item.closed === 0:
                                return <>Ongoing</>;

                              case item?.sub_dept != null && item.closed === 1:
                                return <>Closed</>;

                              default:
                                return null;
                            }
                          })()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>No petitions for the Value!</div>
          )}
        </>
      ) : (
        <>
          <p className="text-xl font-serif ">{errmsg}</p>
        </>
      )}
    </div>
  );
};

export default Tables;
