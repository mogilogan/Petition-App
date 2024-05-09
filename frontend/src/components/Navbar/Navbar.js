import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import * as actionType from "../../constants/actionTypes";

import {
  AiOutlineHome,
  AiFillFileAdd,
  AiFillDashboard,
  AiOutlineSearch,
} from "react-icons/ai";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { BsFillCaretDownSquareFill } from "react-icons/bs";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import pyemb from "../../assests/pypol-embl.jpg";

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
    dispatch({ type: actionType.CLEAR });
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
      <header className=" shadow-gray-400 md:block hidden bg-[#0e0c50]  m-0 p-0 w-[20%] fixed h-[100%] overflow-auto text-[#ffebeb] ">
        <div className="container mx-auto  p-5  items-center ">
          <p className="flex title-font md:mr-0 mr-2 font-medium items-center ">
            <Link to="/">
              <img
                className="cursor-pointer"
                width={100}
                height={200}
                src={pyemb}
              />
            </Link>
            {/* message based on user login */}
            {user != null && (
              <span className=" mx-auto sm:text-md xl:text-xl">
                Welcome: {user?.userData?.user_name}
              </span>
            )}
            {user === null && (
              <span className=" mx-auto sm:text-md xl:text-xl">
                Login to continue
              </span>
            )}
          </p>

          <div className="pt-5 pb-3">
            <hr className="text-gray-500 " />
          </div>

          <nav className=" text-left sm:text-md xl:text-xl  grid grid-flow-row gap-5 w-[100%]  ">
            <Link to="/">
              {" "}
              <button className=" w-[100%] flex flex-row  hover:bg-[#8d6532] hover:text-white  py-2 hover:rounded-lg    gap-6">
                <AiOutlineHome size={30} />
                Home
              </button>
            </Link>

            {user != null && (
              <>
                <Link to="/search">
                  {" "}
                  <button className=" w-[100%] flex flex-row  hover:bg-[#8d6532] hover:text-white  py-2 hover:rounded-lg    gap-6">
                    <AiOutlineSearch size={30} />
                    Search
                  </button>
                </Link>
                <Link to="/add">
                  <button className=" w-[100%] flex flex-row gap-6  hover:rounded-lg py-2 hover:text-white   hover:bg-[#8d6532]     ">
                    <AiFillFileAdd size={30} />
                    Add Petition
                  </button>
                </Link>
                <Link to="/dashboard">
                  <button className=" w-[100%] flex flex-row gap-6  hover:rounded-lg py-2   hover:text-white hover:bg-[#8d6532]     ">
                    <AiFillDashboard size={30} />
                    Dashboard
                  </button>
                </Link>
                <div className="dropdownnav">
                  <button className=" w-[100%] flex flex-row gap-6  hover:rounded-lg hover:text-white  hover:bg-[#8d6532] py-2      ">
                    <HiOutlineDocumentDuplicate size={30} /> Petitions
                  </button>

                  <div className="dropdown-content">
                    <Link to="/newpetitions">
                      <button className=" w-[100%] flex flex-row gap-6  hover:rounded-lg hover:text-white hover:bg-[#8d6532] py-2      ">
                        <HiOutlineDocumentDuplicate size={30} />
                        New Petitions
                      </button>
                    </Link>
                    <Link to="/ongoingpetitions">
                      <button className=" w-[100%] flex flex-row gap-6  hover:rounded-lg hover:text-white  hover:bg-[#8d6532] py-2      ">
                        <HiOutlineDocumentDuplicate size={30} />
                        Ongoing Petitions
                      </button>
                    </Link>
                    <Link to="/closedpetitions">
                      <button className=" w-[100%] flex flex-row gap-6  hover:rounded-lg hover:text-white  hover:bg-[#8d6532] py-2      ">
                        <HiOutlineDocumentDuplicate size={30} />
                        Closed Petitions
                      </button>
                    </Link>
                  </div>
                </div>

                <Link to="/pending">
                  <button className=" w-[100%] flex flex-row gap-6  hover:rounded-lg hover:text-white  hover:bg-[#8d6532] py-2      ">
                    <HiOutlineDocumentDuplicate size={30} /> Reports
                  </button>
                </Link>
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
                  className=" w-[100%] flex flex-row gap-6  hover:rounded-lg hover:text-white  hover:bg-[#8d6532] py-2      "
                >
                  <BiLogOut
                    size={30}
                    style={{ color: "#FBEAEB", fill: "#ffebeb" }}
                  />{" "}
                  Logout
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className=" w-[100%] flex flex-row gap-6  hover:rounded-lg hover:text-white  hover:bg-[#8d6532] py-2     ">
                  <BiLogIn
                    size={30}
                    style={{ color: "#FBEAEB", fill: "#ffebeb " }}
                  />
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden block relative z-[50]">
        <nav className="fixed top-0 w-[100%] bg-[#0e0c50] items-center flex p-4 text-[#ffebeb]">
          <div className="flex justify-between items-center w-full flex-wrap md:flex-nowrap">
            <h1 className="text-xl  font-bold cursor-pointer">
              <Link to="/">
                <img className="cursor-pointer" width={40} src={pyemb} />
              </Link>
            </h1>
            {/* message based on user login */}

            <span className=" text-xl sm:text-3xl ">Puducherry E-Petition</span>

            <button
              className="flex justify-end md:hidden ring-1 ring-black rounded"
              onClick={showNav}
            >
              <BsFillCaretDownSquareFill size={32} style={{ color: "white" }} />
            </button>
            <ul
              onClick={showNav}
              className={`sm:text-md xl:text-xl ${
                toggle ? " flex" : " hidden"
              } flex-col   w-full first:mt-2  `}
            >
              <li className="border-t font-medium w-full  p-2.5 mt-3 md:border-none md:p-0 md:mt-0 md:w-auto">
                <Link to="/">
                  {" "}
                  <button className=" w-[100%] flex flex-row hover:text-white  hover:bg-[#8d6532]  pt-2 hover:rounded-lg    gap-6">
                    <AiOutlineHome size={30} />
                    Home
                  </button>
                </Link>{" "}
              </li>

              {user != null && (
                <>
                  <li className="border-t font-medium w-full  p-2.5 mt-3 md:border-none md:p-0 md:mt-0 md:w-auto">
                    <Link to="/search">
                      {" "}
                      <button className=" w-[100%] flex flex-row hover:text-white  hover:bg-[#8d6532]  pt-2 hover:rounded-lg    gap-6">
                        <AiOutlineSearch size={30} />
                        Search
                      </button>
                    </Link>{" "}
                  </li>
                  <li className="border-t font-medium w-full  p-2.5 mt-3 md:border-none md:p-0 md:mt-0 md:w-auto">
                    <Link to="/dashboard">
                      <button className=" w-[100%] flex flex-row gap-6 hover:text-white  hover:rounded-lg pt-2   hover:bg-[#8d6532]     ">
                        <AiFillDashboard size={30} />
                        Dashboard
                      </button>
                    </Link>{" "}
                  </li>
                  <li className="border-t font-medium w-full  p-2.5 mt-3 md:border-none md:p-0 md:mt-0 md:w-auto">
                    <Link to="/add">
                      <button className=" w-[100%] flex flex-row gap-6 hover:text-white  hover:rounded-lg pt-2   hover:bg-[#8d6532]     ">
                        <AiFillFileAdd size={30} />
                        Add Petition
                      </button>
                    </Link>{" "}
                  </li>

                  <div className="dropdownnav">
                    <li className="border-t font-medium w-full  p-2.5 mt-3 md:border-none md:p-0 md:mt-0 md:w-auto">
                      <button className=" w-[100%] flex flex-row gap-6  hover:rounded-lg hover:text-white  hover:bg-[#8d6532] pt-2      ">
                        <HiOutlineDocumentDuplicate size={30} /> Petitions
                      </button>
                    </li>

                    <div className="dropdown-content">
                      <li className="border-t font-medium w-full  p-2.5 mt-3 md:border-none md:p-0 md:mt-0 md:w-auto">
                        <Link to="/newpetitions">
                          <button className=" w-[100%] flex flex-row gap-6  hover:rounded-lg hover:text-white  hover:bg-[#8d6532] pt-2      ">
                            <HiOutlineDocumentDuplicate size={30} />
                            New Petitions
                          </button>
                        </Link>
                      </li>
                      <li className="border-t font-medium w-full  p-2.5 mt-3 md:border-none md:p-0 md:mt-0 md:w-auto">
                        <Link to="/ongoingpetitions">
                          <button className=" w-[100%] flex flex-row gap-6  hover:rounded-lg hover:text-white  hover:bg-[#8d6532] pt-2      ">
                            <HiOutlineDocumentDuplicate size={30} />
                            Ongoing Petitions
                          </button>
                        </Link>
                      </li>
                      <li className="border-t font-medium w-full  p-2.5 mt-3 md:border-none md:p-0 md:mt-0 md:w-auto">
                        <Link to="/closedpetitions">
                          <button className=" w-[100%] flex flex-row gap-6  hover:rounded-lg hover:text-white  hover:bg-[#8d6532] pt-2      ">
                            <HiOutlineDocumentDuplicate size={30} />
                            Closed Petitions
                          </button>
                        </Link>
                      </li>
                    </div>
                  </div>
                  <li className="border-t font-medium w-full  p-2.5 mt-3 md:border-none md:p-0 md:mt-0 md:w-auto">
                    <Link to="/pending">
                      <button className=" w-[100%] flex flex-row gap-6  hover:rounded-lg hover:text-white hover:bg-[#8d6532] pt-2      ">
                        <HiOutlineDocumentDuplicate size={30} /> Reports
                      </button>
                    </Link>
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
                      className=" w-[100%] flex flex-row gap-6 hover:rounded-lg hover:text-white hover:bg-[#8d6532] pt-2  "
                    >
                      <BiLogOut
                        size={30}
                        style={{ color: "#FBEAEB", fill: "#ffebeb" }}
                      />{" "}
                      Logout
                    </button>{" "}
                  </Link>{" "}
                </li>
              ) : (
                <li className="border-t font-medium w-full  p-2.5 mt-3 md:border-none md:p-0 md:mt-0 md:w-auto">
                  {" "}
                  <Link to="/login">
                    <button className=" w-[100%] flex flex-row gap-6  hover:rounded-lg hover:text-white  hover:bg-[#8d6532] pt-2     ">
                      <BiLogIn
                        size={30}
                        style={{ color: "#FBEAEB", fill: "#ffebeb" }}
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
