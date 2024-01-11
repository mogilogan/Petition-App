import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { statuscheck } from "../../../actions/status";
import { addreport } from "../../../actions/report";
import { Button } from "@mui/material";

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

  const currentIds = currentId.slice(1);

  const fetch = async () => {
    dispatch(statuscheck({ search_by: "id", search_item: currentIds }));
    setForm({ ...form, petition_id: currentIds });
  };

  const handleSubmit = async () => {
    await dispatch(addreport(form, navigate));
  };

  useEffect(() => {
    fetch();
  }, []);

  const created = new Date(petition[0]?.time_stamp);
  const depttime = new Date(petition[0]?.dept_time);
  const subtime = new Date(petition[0]?.sub_time);
  const circletime = new Date(petition[0]?.circle_time);
  const shotime = new Date(petition[0]?.sho_time);

  const times = [
    {
      date:
        depttime.toLocaleDateString("en-US") === "1/1/1970"
          ? null
          : depttime.toLocaleDateString("en-US"),
      action: "SSP",
      data: petition[0]?.deptremarks,
    },
    {
      date:
        subtime.toLocaleDateString("en-US") === "1/1/1970"
          ? null
          : subtime.toLocaleDateString("en-US"),
      action: "SP",
      data: petition[0]?.subremarks,
    },
    {
      date:
        circletime.toLocaleDateString("en-US") === "1/1/1970"
          ? null
          : circletime.toLocaleDateString("en-US"),
      action: "Circle Inspector",
      data: petition[0]?.circleremarks,
    },
    {
      date:
        shotime.toLocaleDateString("en-US") === "1/1/1970"
          ? null
          : shotime.toLocaleDateString("en-US"),
      action: "SHO",
      data: petition[0]?.shoremarks,
    },
  ];

  const filteredData = times.filter(
    (item) => item.date !== null && item.data !== null
  );
  filteredData.sort((a, b) => a.date - b.date);

  return (
    <div className=" w-[100%] pt-16  flex flex-col min-h-[100vh] md:ml-[25%]  bg-[#b6a072] ">
      {petition[0] ? (
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
                  {petition[0].petition_id}
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
                  {petition[0].p_name}
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
                  {petition[0].mobile_num}
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
                  {petition[0].address}
                </p>
              </div>
              <label
                class="block text-black text-sm font-bold mb-2"
                for="username"
              >
                Type of Petition:
              </label>
              <p
                className="shadow appearance-none border rounded min-w-[200px] py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                name="title"
                label="Title"
                type="text"
              >
                {petition[0].type}
              </p>
              <label
                class="block text-black text-sm font-bold mb-2"
                for="username"
              >
                nature of Petition:
              </label>
              <p
                className="shadow appearance-none border rounded min-w-[200px] py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                name="title"
                label="Title"
                type="text"
              >
                {petition[0].category}
              </p>
              <label
                class="block text-black text-sm font-bold mb-2 pt-4"
                for="username"
              >
                Description:
              </label>
              <div
                className="shadow h-[400px]   border rounded min-w-[200px] py-2 px-3 text-black  "
                name="description"
                label="Description"
                type="text"
                dangerouslySetInnerHTML={{ __html: petition[0].description }}
              />
              <div class="py-4 ">
                <table class="w-full overflow-scroll shadow rounded">
                  <thead>
                    <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                      <th class="px-4 py-3">Sl. No. </th>
                      <th class="px-4 py-3">ACTIONS</th>
                      <th class="px-4 py-3">Remarks</th>
                      <th class="px-4 py-3 text-sm">Date (MM/DD/YYYY)</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white">
                    <tr class="text-gray-700 font-mono text-ms">
                      <td class="px-4 py-3 border">
                        <div class="flex items-center text-sm">
                          <div>
                            <p class=" text-black">1</p>
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-3   border">
                        CREATED BY {petition[0]?.submitted_by}
                      </td>
                      <td class="px-4 py-3 border">CREATED TIME</td>
                      <td class="px-4 py-3  border">
                        {created.toLocaleDateString("en-US")}
                      </td>
                    </tr>
                    {filteredData.map((item, index) => (
                      <tr key={index} class="text-gray-700 font-mono">
                        <td class="px-4 py-3 border">
                          <div class="flex items-center text-ms">
                            <div>
                              <p class=" text-black">{index + 2}</p>
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-3  border">{item.action}</td>
                        <td class="px-4 py-3  border">{item.data}</td>
                        <td class="px-4 py-3 border">{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <p className="py-10px">Document:</p>
                <img src={petition[0].image} />
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
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Petition;
