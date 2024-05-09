import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signin } from "../../actions/auth";

const initialState = { user_name: "", password: "" };

const Login = () => {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle login actions::
  const handlelogin = async (e) => {
    e.preventDefault();
    const mess = await dispatch(signin(form, navigate));

    window.alert(mess);
  };

  //handle change actions:
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className=" w-[100%]  flex flex-col min-h-[100vh] items-center  justify-center md:ml-[20%]    bg-[#b4c9f0]">
      <div class="sm:w-[50%] rounded-md bg-[#b4c9f0] shadow-inner-blue-neumorphism-xl p-4 pt-0 ">
        <header class="flex h-24 items-center justify-between font-bold  text-black">
          <span className="text-xl md:text-3xl">Officier Login</span>
        </header>
        <form class="grid gap-3" onSubmit={handlelogin}>
          <input
            class="h-10 rounded-sm bg-emerald-100/50 px-2 text-emerald-950 placeholder:text-black focus:outline-none focus:ring focus:ring-[#363636]"
            type="text"
            name="user_name"
            placeholder="Enter your username"
            onChange={(e) => handleChange(e)}
          />

          <input
            class="h-10 rounded-sm bg-emerald-100/50 px-2 text-emerald-950 placeholder:text-black focus:outline-none focus:ring focus:ring-[#363636]"
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => handleChange(e)}
          />

          <button class=" butt  " type="submit">
            <span>Sign In</span>
          </button>
        </form>
      </div>

      <br />
    </div>
  );
};

export default Login;
