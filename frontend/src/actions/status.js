import {STATUS} from '../constants/actionTypes';
import * as api from '../api/index'


export const statuscheck = (petition_id) => async (dispatch) => {
    try {

      const { data } = await api.statusCheck(petition_id);
      dispatch({ type: STATUS,payload:{petitions: data} });

    } catch (error) {

      console.log(error);

    }
  };