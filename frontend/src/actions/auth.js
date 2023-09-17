import {AUTH} from '../constants/actionTypes';
import * as api from '../api/index'



export const signin = (formData, router) => async (dispatch) => {
    try {
      const { data } = await api.signIn(formData);
  
      dispatch({ type: AUTH, data });
  
      router('/add');
    } catch (error) {
      console.log(error);
    }
  };

  