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
      <div class="sm:w-[50%] rounded-md bg-[#523e07] p-4 pt-0 shadow-lg">
        <header class="flex h-24 items-center justify-between font-bold text-white">
          <span className="text-xl">Login</span>
        </header>
        <form class="grid gap-3" onSubmit={handlelogin}>
          <input
            class="h-10 rounded-sm bg-emerald-100/50 px-2 text-emerald-950 placeholder:text-white focus:outline-none focus:ring focus:ring-emerald-400"
            type="text"
            name="user_name"
            placeholder="Enter your username"
            onChange={(e) => handleChange(e)}
          />

          <input
            class="h-10 rounded-sm bg-emerald-100/50 px-2 text-emerald-950 placeholder:text-white focus:outline-none focus:ring focus:ring-emerald-400"
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => handleChange(e)}
          />

          <button
            class="flex h-10 items-center justify-between rounded-sm bg-[#2b2103] px-2 text-emerald-100 transition-colors duration-300 hover:bg-black focus:outline-none focus:ring focus:ring-emerald-400"
            type="submit"
          >
            <span>Sign In</span>
            <span>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </span>
          </button>
        </form>
      </div>

      <br />
    </div>
  );
};

export default Login;
