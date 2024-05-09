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

const Getcomplain = () => {
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
          <option value="date">Date</option>
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
          {petition ? (
            <div>
              <div className="w-full text-center text-5xl py-4 font-serif flex  flex-row items-center justify-center  text-[#0d193a]">
                {/* Condition for Pending */}
                {petition?.dept === null && (
                  <div>
                    <Table
                      petition_id={petition.petition_id}
                      date={petition.time_stamp.slice(0, 10)}
                      status="Pending"
                    />
                  </div>
                )}
                {/* Condition for Viwed by SSP */}
                {petition.dept != null && petition.sub_dept === null && (
                  <div>
                    <Table
                      petition_id={petition.petition_id}
                      date={petition.time_stamp.slice(0, 10)}
                      status="Viewed by SSP"
                    />
                  </div>
                )}

                {/* Condition for Viewed by SP */}
                {petition.sub_dept != null && petition.user_name === null && (
                  <div>
                    <Table
                      petition_id={petition.petition_id}
                      date={petition.time_stamp.slice(0, 10)}
                      status="Viewed by SP"
                    />
                  </div>
                )}

                {/* Condition for Ongoing */}
                {petition?.user_name != null && petition.closed === 0 && (
                  <div>
                    <Table
                      petition_id={petition.petition_id}
                      date={petition.time_stamp.slice(0, 10)}
                      status="Ongoing"
                    />
                  </div>
                )}

                {/* Condition for Closed */}
                {petition?.sub_dept != null && petition.closed === 1 && (
                  <div>
                    <Table
                      petition_id={petition.petition_id}
                      date={petition.time_stamp.slice(0, 10)}
                      status="Closed"
                    />
                  </div>
                )}
              </div>
              <Timeline>
                <TimelineItem>
                  <TimelineOppositeContent color="text.secondary">
                    {petition.time_stamp}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>Time Created</TimelineContent>
                </TimelineItem>

                {petition?.dept_time != null ? (
                  <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                      {petition.dept_time}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Department Assigned</TimelineContent>
                  </TimelineItem>
                ) : (
                  <></>
                )}

                {petition?.sub_time != null ? (
                  <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                      {petition.sub_time}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Sub Department Assigned</TimelineContent>
                  </TimelineItem>
                ) : (
                  <></>
                )}
                {petition?.sho_time != null ? (
                  <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                      {petition.sho_time}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>SHO Assigned</TimelineContent>
                  </TimelineItem>
                ) : (
                  <></>
                )}
              </Timeline>
            </div>
          ) : (
            <div>ENTER A VALID PETITION ID</div>
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

export default Getcomplain;
