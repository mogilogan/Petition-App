import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Button } from "@mui/material";
import {
  acceptreport,
  closereport,
  getreport,
  returnreport,
} from "../../actions/report";
// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const Report = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // get user
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const initialState = {
    petition_id: "",
    close_report: "",
    rank: "",
    active_place: "",
    rank: user?.userData?.rank,
    active_place: petition.active_place,
    user_name: user?.userData?.user_name,
  };

  const [form, setForm] = useState(initialState);
  const { currentId } = useParams();

  const { petition } = useSelector((state) => state.status);

  const docs = [{ uri: petition.evidence }];

  const created = new Date(petition.time_stamp);
  const depttime = new Date(petition.dept_time);
  const subtime = new Date(petition.sub_time);
  const shotime = new Date(petition.sho_time);

  const formatDate = created.toLocaleDateString("en-US");

  // Format time (e.g., 'HH:mm:ss')
  const formatTime = created.toLocaleTimeString("en-US");

  const currentIds = currentId.slice(1);

  const fetch = async () => {
    dispatch(getreport({ petition_id: currentIds }));
    setForm({
      ...form,
      petition_id: currentIds,
      rank: user?.userData?.rank,
      active_place: petition.active_place,
    });
  };

  const handleAccept = async () => {
    setForm({
      ...form,
      petition_id: currentIds,
      rank: user?.userData?.rank,
      active_place: petition.active_place,
    });
    let message = dispatch(acceptreport(form, navigate));
    window.alert(message);
    navigate("/pending", { replace: true });
  };

  const handleReturn = async () => {
    setForm({
      ...form,
      petition_id: currentIds,
      rank: user?.userData?.rank,
      active_place: petition.active_place,
    });
    dispatch(returnreport(form, navigate));
    navigate("/pending", { replace: true });
  };

  const handleClose = async () => {
    setForm({
      ...form,
      petition_id: currentIds,
      rank: user?.userData?.rank,
      active_place: petition.active_place,
      user_name: user?.userData?.user_name,
    });
    dispatch(closereport(form, navigate));
    navigate("/pending", { replace: true });
  };

  const handleChange = (e) => {
    setForm({ ...form, close_report: e.target.value });
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className=" w-[100%] pt-16  flex flex-col min-h-[100vh] md:ml-[20%]  bg-[#b4c9f0] ">
      {petition ? (
        <div className="py-[40px]">
          <div className="max-w-[80%] mx-auto bg-white rounded-lg">
            <div className="px-8">
              <p
                className="py-5 text-xl md:text-4xl font-libre text-center text-black"
                component="h1"
                variant="h5"
              >
                Petition
              </p>
              <label
                class="block text-black text-sm font-bold mb-2"
                for="username"
              >
                Petition Id:
              </label>
              <p
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                name="title"
                label="Title"
                type="text"
              >
                {petition.petition_id}
              </p>

              <label
                class="block text-black text-sm font-bold mb-2"
                for="username"
              >
                Petitioner Name :
              </label>
              <p
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                name="title"
                label="Title"
                type="text"
              >
                {petition.p_name}
              </p>

              <label
                class="block text-black text-sm font-bold mb-2"
                for="username"
              >
                Mobile Number
              </label>
              <p
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                name="title"
                label="Title"
                type="text"
              >
                {petition.mobile_num}
              </p>

              <label
                class="block text-black text-sm font-bold mb-2"
                for="username"
              >
                Address
              </label>
              <p
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                name="title"
                label="Title"
                type="text"
              >
                {petition.address}
              </p>
              <label
                class="block text-black text-sm font-bold mb-2"
                for="username"
              >
                Type:
              </label>
              <p
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                name="title"
                label="Title"
                type="text"
              >
                {petition.type}
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
                dangerouslySetInnerHTML={{ __html: petition.description }}
              />
              <label
                class="block text-black text-sm font-bold mb-2"
                for="username"
              >
                Time Created:
              </label>
              <p
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                name="title"
                label="Title"
                type="text"
              >
                Date: {formatDate} - Time: {formatTime}
              </p>
              <label
                class="block text-black text-sm font-bold mb-2"
                for="username"
              >
                Department Assigned:
              </label>
              <p
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                name="title"
                label="Title"
                type="text"
              >
                {petition.dept} - Assign On:{" "}
                {depttime.toLocaleDateString("en-US")}
              </p>
              <label
                class="block text-black text-sm font-bold mb-2"
                for="username"
              >
                Sub Department:
              </label>
              <p
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
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
                class="block text-black text-sm font-bold mb-2"
                for="username"
              >
                Circle Department:
              </label>
              <p
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
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
              <label
                class="block text-black text-sm font-bold mb-2"
                for="username"
              >
                User name:
              </label>
              <p
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
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
            <div className="py-4">
              {/* <DocViewer
                pluginRenderers={DocViewerRenderers}
                documents={docs}
                config={{
                  header: {
                    disableHeader: true,
                    disableFileName: false,
                    retainURLParams: false,
                  },
                }}
                style={{ height: 600 }}
              /> */}
            </div>

            {/* <a
              href={petition.evidence}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open First PDF
            </a> */}

            <form class=" max-w-lg mx-auto  rounded px-16 pt-6 pb-8 mb-4">
              <textarea
                className="shadow h-[200px]  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="description"
                label="Description"
                value={form.description}
                type="text"
                onChange={(e) => handleChange(e)}
              />
              <div class="flex items-center justify-between mx-auto">
                <Button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  variant="contained"
                  color="primary"
                  onClick={handleAccept}
                >
                  Accept and Forward
                </Button>
                <Button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  variant="contained"
                  color="secondary"
                  onClick={handleReturn}
                >
                  return
                </Button>
                {(user?.userData?.rank === "3" ||
                  user?.userData?.rank === "2" ||
                  user?.userData?.rank === "1") && (
                  <Button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    variant="contained"
                    color="primary"
                    onClick={handleClose}
                  >
                    close
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Report;
