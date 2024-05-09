import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index";

// sign in action
export const signin = (formData, router) => async (dispatch) => {
  try {
    //return token and user details
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    router("/add");
    return "logged in successfully";
  } catch (error) {
    // returns error based on username and password check
    console.log(error.response.data);
    return error.response.data;
  }
};
