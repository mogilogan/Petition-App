import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-date-picker";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import { TextField } from "@mui/material";

import { addpetition } from "../../actions/petition";
import Search from "./Search";

const initialState = {
  title: "",
  description: "",
  end_date: "",
  p_name: "",
  mobile_num: "",
  address: "",
  submitted_by: "",
  forwarded: "",
  image: null,
  mail: "",
};

const Postpetition = () => {
  // get user
  const user = localStorage.getItem("profile");

  const [mess, setMess] = useState(false);
  const [form, setForm] = useState(initialState);

  const dispatch = useDispatch();

  // main submit add function
  const handleaddPetition = async (e) => {
    e.preventDefault();
    setForm({ ...form, submitted_by: user?.userData?.user_name });
    const message = await dispatch(addpetition(form));
    setForm(initialState);
    setMess(true);
    window.alert(message);
  };

  // date select separate function for updating state
  const dateselect = (e) => {
    setForm({ ...form, end_date: e });
  };

  // simple handle change for all form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMess(false);
  };

  //forwared

  const forwarded = (data) => {
    setForm({ ...form, forwarded: data });
  };

  return (
    <div className=" w-[100%] pt-16 mx-auto md:ml-[25%]   bg-[#b6a072] ">
      <p
        className="py-5 text-xl md:text-4xl font-libre text-center text-white"
        component="h1"
        variant="h5"
      >
        Add Petition
      </p>

      {/* form for petition addition */}
      <form
        className="bg-white w-[85%] mx-auto rounded-3xl px-8 pt-6 pb-8 mb-4"
        onSubmit={handleaddPetition}
      >
        <div class="grid grid-cols-2 gap-4 max-w-xl m-auto">
          <div class="col-span-2 lg:col-span-1">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Person name:
            </label>
            <TextField
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="p_name"
              label="Name"
              type="text"
              value={form.p_name}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div class="col-span-2 lg:col-span-1">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Mobile Number:
            </label>
            <TextField
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="mobile_num"
              label="Mobile Number"
              type="tel"
              pattern="[0-9]{10}"
              value={form.mobile_num}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div class="col-span-2 lg:col-span-1">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Mail Id:
            </label>
            <TextField
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="mail"
              label="Mail Id"
              type="email"
              pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
              value={form.mail}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div class="col-span-2 lg:col-span-1">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Address:
            </label>
            <TextField
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="address"
              label="Address"
              type="text"
              value={form.address}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div class="col-span-2 lg:col-span-1">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Title:
            </label>
            <TextField
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="title"
              label="Title"
              type="text"
              value={form.title}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div class="col-span-2">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 pt-4"
              for="username"
            >
              Description:
            </label>
            <textarea
              className="shadow h-[400px]  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="description"
              label="Description"
              value={form.description}
              type="text"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div class="col-span-2">
            <label
              class="block  text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Dead Line:
            </label>
            <DatePicker
              className="max-w-[35px]"
              value={form.end_date}
              dateFormat="dd/mm/yyyy"
              onChange={(e) => dateselect(e)}
            />
          </div>
          <br />
          <div class="col-span-2">
            {/* Input field for file upload with accept attribute and size validation */}
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="file"
            >
              Upload File (JPG or JPEG, max 1MB):
            </label>
            <input
              type="file"
              name="file"
              accept=".jpg, .jpeg"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && file.size <= 1000000) {
                  // 1MB limit
                  if (file) {
                    const reader = new FileReader();

                    reader.onload = (event) => {
                      setForm({ ...form, image: event.target.result });
                      console.log(event.target.result);
                    };

                    reader.readAsDataURL(file);
                  }
                } else {
                  window.alert(
                    "Please upload a valid JPG or JPEG file that is 1MB or less in size."
                  );
                  e.target.value = null; // Clear the input field
                }
              }}
            />
          </div>

          <div class="col-span-2">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 "
              for="username"
            >
              Copy to:
            </label>
            <Search func={forwarded} />
          </div>
          <div class="col-span-2 text-right">
            <span className="flex justify-center items-center ">
              <button
                variant="contained"
                type="submit"
                disabled={
                  form.title === "" ||
                  form.description === "" ||
                  (form.end_date === "" && form.end_date === null)
                }
                class={`${
                  form.title === "" ||
                  form.description === "" ||
                  form.end_date === ""
                    ? "bg-gray-700"
                    : "bg-blue-500"
                }   text-white font-bold py-2 px-4 border border-blue-700 rounded`}
              >
                submit
              </button>
            </span>
          </div>
        </div>
      </form>
      <br />
    </div>
  );
};

export default Postpetition;
