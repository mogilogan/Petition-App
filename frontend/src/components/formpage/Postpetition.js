import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-date-picker";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import { jsPDF } from "jspdf";

import { TextField } from "@mui/material";

import { addpetition } from "../../actions/petition";
import Search from "./Search";

import { type, category } from "../../assests/Typep";
import { duplicatecheck } from "../../actions/report";
import { Await, Link, useNavigate } from "react-router-dom";
import { CLEAR } from "../../constants/actionTypes";

import pypol from "../../assests/pypol-embl.jpg";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockqoute"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
  ],
};

const Postpetition = () => {
  // get user

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const { Ids } = useSelector((state) => state.duplicate);

  const [showModal, setShowModal] = React.useState(false);
  const [mess, setMess] = useState(false);

  const initialState = {
    type: "",
    description: "",
    end_date: "",
    p_name: "",
    mobile_num: "",
    address: "",
    code: user?.userData?.code,
    submitted_by: user?.userData?.user_name,
    forwarded: "",
    category: "",
    image: null,
    mail: "",
  };

  const [form, setForm] = useState(initialState);

  // main submit add function
  const handleaddPetition = async (e) => {
    e.preventDefault();
    let newDate = new Date();
    let date = newDate;
    console.log(user);
    setForm({
      ...form,
      
      submitted_by: user?.userData?.user_name,
      code: user?.userData?.code,
    });
    const message = await dispatch(addpetition(form));

    console.log(message?.complain_details)

    var printWindow = window.open("", "Print Window", "height=800,width=800");
    printWindow.document.write(
      `<html><head><title>${message?.complain_details?.akn_num}</title></head><body>
      <div style="display: flex; flex-direction: column; align-items: center;">
      <div style="border: 2px solid #000; width:85%; display: flex;">
       
          <img src="${pypol}" alt="Your Image" style=" width: 200px;">
    
        <div style="flex-grow: 3;">
          <h2 style="text-align:center;">Government of Puducherry</h2>
          <h4 style="text-align:center;">Petition Monitoring System(PMS)</h4>
          <h5 style="text-decoration: underline;text-align:center;">ACKNOWLEDGEMENT</h5>
        </div>
      </div>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center;">
      <div style="border: 2px solid #000; width: 85%;   margin-bottom: 1rem;">
        <h2 style="font-size: 2rem; font-weight: bold; margin-bottom: 1rem; text-align:center;">Submitted Data</h2>
        <div style="background-color: #ffaaaa; padding: 10px;">
      <table style="width: 100%;">
        <tr>
          <td style="font-weight: bold;">Acknowledgement Date:</td>
          <td> ${date}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Acknowledgement Number:</td>
          <td>${message?.complain_details?.akn_num}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Person name:</td>
          <td> ${form?.p_name}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Mobile Number:</td>
          <td> ${form?.mobile_num}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Mail Id:</td>
          <td>${form?.mail}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Address:</td>
          <td> ${form?.address}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Type of Petition:</td>
          <td>${form.type}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Nature of Petition:</td>
          <td>${form.category}</td>
        </tr>
        
      </table>
    </div>
    </div>
      </div>
    </div>
    </body></html>`
    );
    printWindow.print();
    closedocs(printWindow);
    setShowModal(false);
    navigate("/");
  };

  const closedocs = (printWindow) => {
    printWindow.close();
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

  const handleduplicate = () => {
    setShowModal(true);
    setForm({
      ...form,
      address:form.address.replace(/'/g, "''"),
      description:form.description.replace(/'/g, "''"),
   
    });
    const dupdata = {
      mobile_num: form?.mobile_num,
      type: form?.type,
      category: form?.category,
    };

    dispatch(duplicatecheck(dupdata));
  };
  //forwared

  const forwarded = (data) => {
    setForm({ ...form, forwarded: data });
  };

  return (
    <div className=" w-[100%] pt-16 mx-auto md:ml-[20%]   bg-[#b4c9f0] ">
      <p
        className="py-5 text-xl md:text-4xl font-graduate text-center text-black"
        component="h1"
        variant="h5"
      >
        Add Petition
      </p>

      {/* form for petition addition */}
      <form
        id="add-pet"
        className="bg-white w-[85%] mx-auto rounded-3xl px-8 pt-6 pb-8 mb-4"
        onSubmit={handleaddPetition}
      >
        <div className="bounce">
          <p>
            Please Fill in the Details below Correctly! Once Submitted, It
            cannot be Edited.
          </p>
        </div>
        <div class="grid grid-cols-2 gap-4 py-4 max-w-xl m-auto">
          <div class="col-span-2 lg:col-span-1">
            <label
              className="requireds block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Full Name:
            </label>
            <TextField
              className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="p_name"
              label="Name"
              type="text"
              required={true}
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
              required={false}
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
              class="requireds block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Address:
            </label>
            <TextField
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="address"
              label="Address"
              type="text"
              required={true}
              value={form.address}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div class="col-span-2 lg:col-span-1">
            <label
              class=" requireds block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Type of Petiton:
            </label>
            <select
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="select">Select</option>
              {type.map((type) => (
                <option value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div class="col-span-2 lg:col-span-1">
            <label
              class=" requireds block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Nature of Petition:
            </label>
            <select
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="select">Select</option>
              {category.map((type) => (
                <option value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div class="col-span-2">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 pt-4"
              for="username"
            >
              Description:
            </label>

            <ReactQuill
              theme="snow"
              value={form.description}
              onChange={(value) => setForm({ ...form, description: value })}
              className="editor-input"
              modules={modules}
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
              Upload File (Pdf - max 1MB):
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
                      setForm({ ...form, image: event.target.result });
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
              <p
                variant="contained"
                onClick={handleduplicate}
                class={`${
                  form.title === "" ||
                  form.description === "" ||
                  form.end_date === ""
                    ? "bg-gray-700"
                    : "bg-blue-500"
                }   text-white font-bold py-2 px-4 border border-blue-700 rounded`}
              >
                submit
              </p>
            </span>
          </div>
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        Suspected Duplicates
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      Kindly Open a New Tab and verify
                      {Ids.map((item, key) => (
                        <Link
                          to={`/petition/:${item.petition_id}`}
                          target="_blank"
                        >
                          <p
                            key={key}
                            className="my-4 text-blueGray-500 text-lg leading-relaxed"
                          >
                            {item.petition_id}
                          </p>
                        </Link>
                      ))}
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        ADD Petition
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
      </form>
      <br />
    </div>
  );
};

export default Postpetition;
