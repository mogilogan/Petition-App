import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index";

// sign in action
export const signin = (formData, router) => async (dispatch) => {
  try {
    //return token and user details
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    router("/add");
  } catch (error) {
    // returns error based on username and password check
    return error.response.data;
  }
};
