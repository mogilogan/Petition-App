import { ADD } from '../constants/actionTypes';

export default (state = { isLoading: true, added: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
   
    case ADD:
      return { ...state, added: [action.payload] };

      case "CLEAR":
        return {...state, added:[action.payload]}
    default:
      return state;
  }
};