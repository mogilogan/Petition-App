import * as actionType from "../constants/actionTypes";

const duplicateReducer = (state = { Ids: [] }, action) => {
  switch (action.type) {
    case actionType.DUPLICATE:
      return { ...state, Ids: action.payload };
    case actionType.CLEAR:
      return { ...state, Ids: [] };
    default:
      return state;
  }
};

export default duplicateReducer;
