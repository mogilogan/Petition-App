import * as actionType from "../constants/actionTypes";

const statusReducer = (state = { petition: [] }, action) => {
  switch (action.type) {
    case actionType.STATUS:
      return { ...state, petition: action.payload.petitions.petition };
    case actionType.CLEAR:
      return { ...state, petition: [] };
    default:
      return state;
  }
};

export default statusReducer;
