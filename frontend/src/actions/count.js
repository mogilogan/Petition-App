
import {COUNT} from '../constants/actionTypes';
import * as api from '../api/index'




export const ongoingcount = (formData) => async (dispatch) => {
    console.log(formData);
    try {
      // returns all count for present user
      const { data } = await api.countoPetition(formData);
     console.log(data);
      dispatch({ type: COUNT,payload:data});

    } catch (error) {
      
      // return net error.
      return error.message;
    }
  };