import {ADD,FETCHALL,START_LOADING,END_LOADING, ASSIGNSSP,ASSIGNSP, CLEAR} from '../constants/actionTypes';
import * as api from '../api/index'



export const addpetition = (formData) => async (dispatch) => {
    try {
      const { data } = await api.addPetition(formData);
  
      dispatch({ type: ADD,payload: data });

      return data.message;
  
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  };


  export const fetchall = (formData,type) => async (dispatch) => {

    
    var data;

    try{
      // switch based on filter requested
        switch (type) {
          case "new":
            ({ data } = await api.fetchNew(formData));
            break;
            case "ongoing":
              ({ data } = await api.fetchOngoing(formData));
            break;
            case "closed":
              ({ data } = await api.fetchClosed(formData));
              // case "forwarded":
              //   console.log(formData);
              // ({ data } = await api.fetchForwarded(formData));
              // console.log(data);
              
            break;
           
        
        
          default:
            console.log("Invalid type");
        }

        dispatch({type:FETCHALL ,payload:data});

    }
    catch (error){
    // clear state if requested data is not fetched
    dispatch({type:CLEAR});
    return error.message;


    }
  };



 
// assign ssp actions
  export const assignssp = (formData) => async (dispatch) => {
    try {
      
      const { data } = await api.assignSsp(formData);
  
  
    
      dispatch({ type: ASSIGNSSP,payload: data.petition_id });
  
    } catch (error) {
      console.log(error);
    }
  };

// assign sp actions
  export const assignsp = (formData) => async (dispatch) => {
    try {
      
      const { data } = await api.assignSp(formData);
  
  
    
      dispatch({ type: ASSIGNSP,payload: data.petition_id });
  
    } catch (error) {
      console.log(error);
    }
  };