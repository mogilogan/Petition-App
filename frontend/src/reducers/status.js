import * as actionType from '../constants/actionTypes';




const statusReducer = (state = { petitions: [] }, action) => {
    switch (action.type) {
      case actionType.STATUS:
        return { ...state, petition: action.payload.petitions.petition };
      default:
        return state;
    }
  };
  
  export default statusReducer;