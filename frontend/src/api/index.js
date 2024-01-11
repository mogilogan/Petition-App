import axios from "axios";

//re routed APi Gateway end point for aws : https://wh4wikk843.execute-api.ap-south-1.amazonaws.com/

const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

// login api
export const signIn = (formData) => API.post("/login", formData);
export const statusCheck = (petition_id) =>
  API.post("/getpetition", petition_id);

//count
export const Dashboard = (formData) => API.post("/count", formData);

// add petiton api
export const addPetition = (formData) => API.post("/petition/add", formData);

// petition apis:
export const fetchNew = (formData) =>
  API.post("/petition/fetchallnew", formData);
export const fetchOngoing = (formData) =>
  API.post("/petition/fetchallongoing", formData);
export const fetchClosed = (formData) =>
  API.post("/petition/fetchallclosed", formData);
// export const fetchForwarded= (formData) => API.get('/petition/forwarded',formData);

// assign apis
export const assignSsp = (formData) =>
  API.post("/petition/assignssp", formData);
export const assignSp = (formData) => API.post("/petition/assignsp", formData);
export const assignIns = (formData) =>
  API.post("/petition/assignins", formData);
export const assignSho = (formData) =>
  API.post("/petition/assignsho", formData);

// submit Report
export const addReport = (formData) => API.post("/report/add", formData);
export const fetchReport = (formData) => API.post("/report/fetch", formData);
export const getReport = (formData) => API.post("/report/get", formData);
export const closeReport = (formData) => API.post("/report/close", formData);
export const acceptReport = (formData) => API.post("/report/accept", formData);
export const returnReport = (formData) => API.post("/report/return", formData);

//duplciate

export const duplicateCheck = (formData) =>
  API.post("/report/duplicate", formData);
