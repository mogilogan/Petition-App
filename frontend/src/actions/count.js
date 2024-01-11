import { COUNT, FETCHALL, CLEAR } from "../constants/actionTypes";
import * as api from "../api/index";

export const dashboard = (formData, setError) => async (dispatch) => {
  try {
    // returns all count for present user
    const { data } = await api.Dashboard(formData);

    dispatch({ type: FETCHALL, payload: data });
  } catch (error) {
    // clear state if requested data is not fetched
    dispatch({ type: CLEAR });
    if (error?.response?.data) {
      setError(error.response.data);
    } else {
      setError(error.message);
    }
  }
};
