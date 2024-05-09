import { REPORT, FETCHALL, STATUS, DUPLICATE } from "../constants/actionTypes";
import * as api from "../api/index";

export const addreport = (formData, router) => async (dispatch) => {
  try {
    // returns all count for present user
    const { data } = await api.addReport(formData);
    dispatch({ type: REPORT, payload: data.petition_id });
    router("/");
  } catch (error) {
    // return net error.
    return error?.response?.data ? error.response.data : error.message;
  }
};

export const fetchreport = (formData) => async (dispatch) => {
  try {
    // returns all count for present user
    const { data } = await api.fetchReport(formData);
    dispatch({ type: FETCHALL, payload: data });
    return "successfully Fetched!";
  } catch (error) {
    // return net error.
    return error?.response?.data ? error.response.data : error.message;
  }
};

export const getreport = (petition_id) => async (dispatch) => {
  try {
    const { data } = await api.getReport(petition_id);
    dispatch({ type: STATUS, payload: { petitions: data } });
  } catch (error) {
    console.log(error);
    return () => {
      if (error?.response?.data) {
        error = error.response.data;
      } else {
        error = error.message;
      }
    };
  }
};

export const closereport = (formData, router) => async (dispatch) => {
  try {
    // returns all count for present user
    const { data } = await api.closeReport(formData);

    router("/pending", { replace: true });
  } catch (error) {
    // return net error.
    return error?.response?.data ? error.response.data : error.message;
  }
};

export const acceptreport = (formData, router, setErr) => async (dispatch) => {
  try {
    // returns all count for present user
    const { data } = await api.acceptReport(formData);

    return "Successfull SENT!";
  } catch (error) {
    // return net error.
    console.error(error.response.data.message);
    return error?.response?.data?.message
      ? `${error.response.data.message}`
      : "ERROR";
  }
};

export const returnreport = (formData, router) => async (dispatch) => {
  try {
    // returns all count for present user
    const { data } = await api.returnReport(formData);

    router("/pending", { replace: true });
  } catch (error) {
    // return net error.
    return error?.response?.data ? error.response.data : error.message;
  }
};

export const duplicatecheck = (formData) => async (dispatch) => {
  try {
    // returns all count for present user
    const { data } = await api.duplicateCheck(formData);
    dispatch({ type: DUPLICATE, payload: data.petitions });
  } catch (error) {
    // return net error.
    return error?.response?.data ? error.response.data : error.message;
  }
};
