import { CLEAR, STATUS } from "../constants/actionTypes";
import * as api from "../api/index";

// status check actions
export const statuscheck = (datas) => async (dispatch) => {
  try {
    const { data } = await api.statusCheck(datas);
    dispatch({ type: STATUS, payload: { petitions: data } });
  } catch (error) {
    return () => {
      dispatch({ type: CLEAR });
      if (error?.response?.data) {
        error = error.response.data;
      } else {
        error = error.message;
      }
    };
  }
};
