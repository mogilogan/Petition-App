import {STATUS} from '../constants/actionTypes';
import * as api from '../api/index'

// status check actions
export const statuscheck = (petition_id) => async (dispatch) => {
    try {
console.log(petition_id);
      const { data } = await api.statusCheck(petition_id);
      dispatch({ type: STATUS,payload:{petitions: data} });

    } catch (error) {

      console.log(error);
      return () => {error =  error.response.data};
    }
  };