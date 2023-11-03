import { ADD,ASSIGNSP,ASSIGNSSP,CLEAR,COUNT,FETCHALL } from '../constants/actionTypes';

export default (state = { isLoading: true, added: [],petitions:[],count:[] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
   
    case ADD:
      return { ...state, added: action.payload };

      case COUNT: 
        return { ...state, count: action.payload};
      case FETCHALL:
        return { ...state, petitions: action.payload.petitions };

        case ASSIGNSSP: 
     
        return { ...state, petitions: state.petitions.filter((petition) => petition.petition_id !== action.payload)};
        case ASSIGNSP: 
     
        return { ...state, petitions: state.petitions.filter((petition) => petition.petition_id !== action.payload)};

        

        case CLEAR:
          return {...state,petitions:[]};
     
    default:
      return state;
  }
};