import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import * as actionType from "../../constants/actionTypes";

import { AiOutlineHome, AiFillFileAdd, AiFillDashboard } from "react-icons/ai";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { BsFillCaretDownSquareFill } from "react-icons/bs";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import emblem from "../../assests/emblem.png";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  // toggle nav for mob view
  const showNav = () => {
    setToggle(!toggle);
  };

  // user State declaration:
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  // location tracker and setter(route)
  const dispatch = useDispatch();
  let location = useLocation();
  const navigate = useNavigate();

  // logout function
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    setUser(null);
  };

  // use effect to constantly monitor the token and call logout function if expired.
  useEffect(() => {
    const token = user?.result;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
        navigate("/");
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div>
      <header className=" shadow-gray-400 md:block hidden bg-[#090a21] m-0 p-0 w-[25%] fixed h-[100%] overflow-auto text-gray-600 ">
        <div className="container mx-auto  p-5  items-center ">
          <p className="flex title-font md:mr-0 mr-2 font-medium items-center text-white ">
            <Link to="/">
              <img
                className="cursor-pointer"
                width={100}
                height={200}
                src={emblem}
              />
            </Link>
            {/* message based on user login */}
            {user != null && (
              <span className=" mx-auto text-xl">
                Welcome: {user?.userData?.user_name}
              </span>
            )}
            {user === null && (
              <span className=" mx-auto text-xl">Login to continue</span>
            )}
          </p>

          <div className="pt-5 pb-3">
            <hr className="text-gray-500 " />
          </div>

          <nav className=" text-left  grid grid-flow-row gap-5 w-[100%]  ">
            <Link to="/">
              {" "}
              <button className=" w-[100%] flex flex-row  hover:bg-[#694d27]  py-2 hover:rounded-lg text-white  text-2xl gap-6">
                <AiOutlineHome size={30} />
                Home
              </button>
            </Link>
            {user != null && (
              <>
                <Link to="/add">
                  <button className=" w-[100%] flex flex-row gap-6  hover:rounded-lg py-2   hover:bg-[#694d27]  text-2xl  text-white ">
                    <AiFillFileAdd size={30} />
                    Add Petition
                  </button>
                </Link>
                <Link to="/dashboard">
                  <button className=" w-[100%] flex flex-row gap-6  hover:rounded-lg py-2   hover:bg-[#694d27]  text-2xl  text-white ">
                    <AiFillDashboard size={30} />
                    Dashboard
                  </button>
                </Link>
                <Link to="/petitions">
                  <button className=" w-[100%] flex flex-row gap-6  hover:rounded-lg  hover:bg-[#694d27] py-2  text-white  text-2xl  ">
                    <HiOutlineDocumentDuplicate size={30} /> Petitions
                  </button>
                </Link>
                {(user?.userData?.rank === "1" ||
                  user?.userData?.rank === "2") && (
                  <Link to="/pending">
                    <button className=" w-[100%] flex flex-row gap-6  hover:rounded-lg  hover:bg-[#694d27] py-2  text-white  text-2xl  ">
                      <HiOutlineDocumentDuplicate size={30} /> Pending Petitions
                    </button>
                  </Link>
                )}
              </>
            )}
          </nav>

          <div className="pb-3 pt-5">
            <hr className="text-gray-500 " />
          </div>

          {/* Login / Logut button */}
          <div className="py-5">
            {user?.result ? (
              <Link to="/">
                <button
                  onClick={logout}
                  className=" w-[100%] flex flex-row gap-6  hover:rounded-lg  hover:bg-[#694d27] py-2  text-white  text-2xl  "
                >
                  <BiLogOut size={30} style={{ color: "white" }} /> Logout
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className=" w-[100%] flex flex-row gap-6  hover:rounded-lg  hover:bg-[#694d27] py-2  text-white  text-2xl ">
                  <BiLogIn size={30} style={{ color: "white" }} />
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Navigateion */}
      <div className="md:hidden block relative ">
        <nav className="fixed top-0 w-[100%] bg-[#0d193a] items-center flex p-4">
          <div className="flex justify-between items-center w-full flex-wrap md:flex-nowrap">
            <h1 className="text-xl text-white font-bold cursor-pointer">
              <Link to="/">
                <img className="cursor-pointer" width={40} src={emblem} />
              </Link>
            </h1>
            <button
              className="flex justify-end md:hidden ring-1 ring-black rounded"
              onClick={showNav}
            >
              <BsFillCaretDownSquareFill size={32} style={{ color: "white" }} />
            </button>
            <ul
              onClick={showNav}
              className={`${
                toggle ? " flex" : " hidden"
              } flex-col   w-full first:mt-2  `}
            >
              <li className="border-t font-medium w-full  p-2.5 mt-3 md:border-none md:p-0 md:mt-0 md:w-auto">
                <Link to="/">
                  {" "}
                  <button className=" w-[100%] flex flex-row  hover:bg-[#694d27]  py-2 hover:rounded-lg text-white  text-2xl gap-6">
                    <AiOutlineHome size={30} />
                    Home
                  </button>
                </Link>{" "}
              </li>
              {user != null && (
                <>
                  <li className="border-t font-medium w-full  p-2.5 mt-3 md:border-none md:p-0 md:mt-0 md:w-auto">
                    <Link to="/dashboard">
                      <button className=" w-[100%] flex flex-row gap-6  hover:rounded-lg py-2   hover:bg-[#694d27]  text-2xl  text-white ">
                        <AiFillDashboard size={30} />
                        Dashboard
                      </button>
                    </Link>{" "}
                  </li>
                  <li className="border-t font-medium w-full  p-2.5 mt-3 md:border-none md:p-0 md:mt-0 md:w-auto">
                    <Link to="/add">
                      <button className=" w-[100%] flex flex-row gap-6  hover:rounded-lg py-2   hover:bg-[#694d27]  text-2xl  text-white ">
                        <AiFillFileAdd size={30} />
                        Add Petition
                      </button>
                    </Link>{" "}
                  </li>
                  <li className="border-t font-medium w-full  p-2.5 mt-3 md:border-none md:p-0 md:mt-0 md:w-auto">
                    {" "}
                    <Link to="/petitions">
                      <button className=" w-[100%] flex flex-row gap-6 hover:rounded-lg hover:bg-[#694d27] py-2 text-white text-2xl">
                        <HiOutlineDocumentDuplicate size={30} /> Petitions
                      </button>
                    </Link>{" "}
                  </li>
                </>
              )}

              {/* Login Logut diplay */}
              {user?.result ? (
                <li className="border-t font-medium w-full  p-2.5 mt-3 md:border-none md:p-0 md:mt-0 md:w-auto">
                  {" "}
                  <Link to="/">
                    <button
                      onClick={logout}
                      className=" w-[100%] flex flex-row gap-6 hover:rounded-lg hover:bg-[#694d27] py-2 text-white text-2xl"
                    >
                      <BiLogOut
                        size={30}
                        style={{ color: "white", fill: "white" }}
                      />{" "}
                      Logout
                    </button>{" "}
                  </Link>{" "}
                </li>
              ) : (
                <li className="border-t font-medium w-full  p-2.5 mt-3 md:border-none md:p-0 md:mt-0 md:w-auto">
                  {" "}
                  <Link to="/login">
                    <button className=" w-[100%] flex flex-row gap-6  hover:rounded-lg  hover:bg-[#694d27] py-2  text-white  text-2xl ">
                      <BiLogIn
                        size={30}
                        style={{ color: "white", fill: "white" }}
                      />
                      Login
                    </button>
                  </Link>{" "}
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
