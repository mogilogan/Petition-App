import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { statuscheck } from "../../../actions/status";
import Table from "../../Status/Table";
import { addreport } from "../../../actions/report";
import { Button } from "@mui/material";

// import Timeline from "@mui/lab/Timeline";
// import TimelineItem from "@mui/lab/TimelineItem";
// import TimelineSeparator from "@mui/lab/TimelineSeparator";
// import TimelineConnector from "@mui/lab/TimelineConnector";
// import TimelineContent from "@mui/lab/TimelineContent";
// import TimelineDot from "@mui/lab/TimelineDot";
// import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

const initialState = {
  petition_id: "",
  evidence: null,
};

const Petition = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // get user
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const [form, setForm] = useState(initialState);
  const { currentId } = useParams();

  const { petition } = useSelector((state) => state.status);

  const created = new Date(petition.time_stamp);
  const depttime = new Date(petition.dept_time);
  const subtime = new Date(petition.sub_time);
  const shotime = new Date(petition.sho_time);

  const formatDate = created.toLocaleDateString("en-US");

  // Format time (e.g., 'HH:mm:ss')
  const formatTime = created.toLocaleTimeString("en-US");

  const currentIds = currentId.slice(1);

  const fetch = async () => {
    dispatch(statuscheck({ petition_id: currentIds }));
    setForm({ ...form, petition_id: currentIds });
  };

  const handleSubmit = async () => {
    console.log("inside submit");
    await dispatch(addreport(form, navigate));
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className=" w-[100%] pt-16  flex flex-col min-h-[100vh] md:ml-[25%]  bg-[#b6a072] ">
      {petition ? (
        <div className="py-[40px]">
          <div className="max-w-[80%] mx-auto bg-white rounded-lg">
            <p
              className="py-5 text-xl md:text-4xl font-libre text-center text-black"
              component="h1"
              variant="h5"
            >
              Petition
            </p>
            <div className="px-8 flex flex-col ">
              <div className="lg:flex lg:flex-row gap-4 py-4">
                <label
                  class="block text-black min-w-[100px] text-sm font-bold mb-2"
                  for="username"
                >
                  Petition Id:
                </label>
                <p
                  className="shadow appearance-none border rounded min-w-[200px] py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  name="title"
                  label="Title"
                  type="text"
                >
                  {petition.petition_id}
                </p>

                <label
                  class="block text-black text-sm min-w-[100px] max-w-[100px] font-bold mb-2"
                  for="username"
                >
                  Petitioner Name :
                </label>
                <p
                  className="shadow appearance-none border rounded min-w-[200px] py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  name="title"
                  label="Title"
                  type="text"
                >
                  {petition.p_name}
                </p>
              </div>
              <div className="lg:flex lg:flex-row gap-4 ">
                <label
                  class="block text-black text-sm min-w-[100px] max-w-[100px] font-bold mb-2"
                  for="username"
                >
                  Mobile Number:
                </label>
                <p
                  className="shadow appearance-none border rounded min-w-[200px] py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  name="title"
                  label="Title"
                  type="text"
                >
                  {petition.mobile_num}
                </p>

                <label
                  class="block text-black text-sm min-w-[100px] max-w-[100px] font-bold mb-2"
                  for="username"
                >
                  Address
                </label>
                <p
                  className="shadow appearance-none border rounded min-w-[200px] py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  name="title"
                  label="Title"
                  type="text"
                >
                  {petition.address}
                </p>
              </div>
              <label
                class="block text-black text-sm font-bold mb-2"
                for="username"
              >
                Title:
              </label>
              <p
                className="shadow appearance-none border rounded min-w-[200px] py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                name="title"
                label="Title"
                type="text"
              >
                {petition.title}
              </p>
              <label
                class="block text-black text-sm font-bold mb-2 pt-4"
                for="username"
              >
                Description:
              </label>
              <p
                className="shadow h-[400px]  appearance-none border rounded min-w-[200px] py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                name="description"
                label="Description"
                type="text"
              >
                {petition.description}
              </p>
              <div className="lg:flex lg:flex-row gap-4 py-4">
                <label
                  class="block text-black text-sm min-w-[100px] max-w-[100px] font-bold mb-2"
                  for="username"
                >
                  Time Created:
                </label>
                <p
                  className="shadow appearance-none border rounded min-w-[200px] py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  name="title"
                  label="Title"
                  type="text"
                >
                  Date: {formatDate} - Time: {formatTime}
                </p>
                <label
                  class="block text-black min-w-[100px] max-w-[100px] text-sm font-bold mb-2"
                  for="username"
                >
                  Department Assigned:
                </label>
                <p
                  className="shadow appearance-none border rounded min-w-[200px] py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  name="title"
                  label="Title"
                  type="text"
                >
                  {petition.dept} - Assign On:{" "}
                  {depttime.toLocaleDateString("en-US")}
                </p>
              </div>
              <div className="lg:flex lg:flex-row gap-4 py-4">
                <label
                  class="block text-black min-w-[100px] max-w-[100px] text-sm font-bold mb-2"
                  for="username"
                >
                  Sub Department:
                </label>
                <p
                  className="shadow appearance-none border rounded min-w-[200px] py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  name="title"
                  label="Title"
                  type="text"
                >
                  {petition.sub_dept === null
                    ? "Not Assigned"
                    : petition.sub_dept}{" "}
                  Assign On:
                  {subtime.toLocaleDateString("en-US")}
                </p>
                <label
                  class="block text-black text-sm min-w-[100px] max-w-[100px] font-bold mb-2"
                  for="username"
                >
                  Circle Department:
                </label>
                <p
                  className="shadow appearance-none border rounded min-w-[200px] py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  name="title"
                  label="Title"
                  type="text"
                >
                  {petition.circle_insp === null
                    ? "Not Assigned"
                    : petition.circle_insp}
                  Assign On:
                  {shotime.toLocaleDateString("en-US")}
                </p>
              </div>
              <label
                class="block text-black text-sm font-bold mb-2"
                for="username"
              >
                SHO:
              </label>
              <p
                className="shadow appearance-none border rounded min-w-[200px] py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                name="title"
                label="Title"
                type="text"
              >
                {petition.user_name === null
                  ? "Not Assigned"
                  : petition.user_name}
                Assign On:
                {shotime.toLocaleDateString("en-US")}
              </p>
              <div>
                <p className="py-10px">Document:</p>
                <img src={petition.image} />
              </div>

              <br />
            </div>

            {user?.userData?.rank === "5" && (
              <div>
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="file"
                >
                  Upload File (PDF, max 1MB):
                </label>
                <input
                  type="file"
                  name="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && file.size <= 1000000) {
                      // 1MB limit
                      if (file) {
                        const reader = new FileReader();

                        reader.onload = (event) => {
                          setForm({ ...form, evidence: event.target.result });
                        };

                        reader.readAsDataURL(file);
                      }
                    } else {
                      window.alert(
                        "Please upload a valid PDF file that is 1MB or less in size."
                      );
                      e.target.value = null; // Clear the input field
                    }
                  }}
                />
                <div class="flex items-center justify-between">
                  <Button
                    onClick={handleSubmit}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    submit
                  </Button>
                </div>
              </div>
            )}

            {/* <Timeline>
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

              {petition.dept_time != null ? (
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

              {petition.sub_time != null ? (
                <TimelineItem>
                  <TimelineOppositeContent color="text.secondary">
                    {petition.sub_time}
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
              {petition.sho_time != null ? (
                <TimelineItem>
                  <TimelineOppositeContent color="text.secondary">
                    {petition.sho_time}
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
            </Timeline> */}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Petition;
