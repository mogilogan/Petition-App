import { REPORT, FETCHALL, STATUS } from "../constants/actionTypes";
import * as api from "../api/index";

export const addreport = (formData, router) => async (dispatch) => {
  console.log(formData);
  try {
    // returns all count for present user
    const { data } = await api.addReport(formData);
    dispatch({ type: REPORT, payload: data.petition_id });
    router("/");
  } catch (error) {
    // return net error.
    return error.message;
  }
};

export const fetchreport = (formData) => async (dispatch) => {
  console.log(formData);
  try {
    // returns all count for present user
    const { data } = await api.fetchReport(formData);
    dispatch({ type: FETCHALL, payload: data });
    return "successfully Fetched!";
  } catch (error) {
    // return net error.
    return error.message;
  }
};

export const getreport = (petition_id) => async (dispatch) => {
  try {
    console.log(petition_id);
    const { data } = await api.getReport(petition_id);
    dispatch({ type: STATUS, payload: { petitions: data } });
  } catch (error) {
    console.log(error);
    return () => {
      error = error.response.data;
    };
  }
};

export const closereport = (formData, router) => async (dispatch) => {
  console.log(formData);
  try {
    // returns all count for present user
    const { data } = await api.closeReport(formData);
    console.log("closed petition: " + data);
    router("/", { replace: true });
  } catch (error) {
    // return net error.
    return error.message;
  }
};
