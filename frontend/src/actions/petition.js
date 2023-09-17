import {ADD} from '../constants/actionTypes';
import * as api from '../api/index'



export const addpetition = (formData) => async (dispatch) => {
    try {
      const { data } = await api.addPetition(formData);
  
      dispatch({ type: ADD,payload: data });
  
    } catch (error) {
      console.log(error);
    }
  };

