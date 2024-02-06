import {
  ADD,
  ASSIGNSP,
  ASSIGNSSP,
  CLEAR,
  COUNT,
  ASSIGNSHO,
  FETCHALL,
  ASSIGNINS,
  REPORT,
  DASHBOARD,
} from "../constants/actionTypes";

export default (
  state = { isLoading: true, added: [], petitions: [], dashboard: [] },
  action
) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "END_LOADING":
      return { ...state, isLoading: false };

    case ADD:
      return { ...state, added: action.payload };

    case COUNT:
      return { ...state, dashboard: action.payload.petitions };
    case FETCHALL:
      return { ...state, petitions: action.payload.petitions };
    case DASHBOARD:
      return {
        ...state,
        petitions: action.payload.petitions,
        dashboard: action.payload,
      };

    case ASSIGNSSP:
      return {
        ...state,
        petitions: state.petitions.filter(
          (petition) => petition.petition_id !== action.payload
        ),
      };
    case REPORT:
      return {
        ...state,
        petitions: state.petitions.filter(
          (petition) => petition.petition_id !== action.payload
        ),
      };
    case ASSIGNSP:
      return {
        ...state,
        petitions: state.petitions.filter(
          (petition) => petition.petition_id !== action.payload
        ),
      };
    case ASSIGNINS:
      return {
        ...state,
        petitions: state.petitions.filter(
          (petition) => petition.petition_id !== action.payload
        ),
      };
    case ASSIGNSHO:
      return {
        ...state,
        petitions: state.petitions.filter(
          (petition) => petition.petition_id !== action.payload
        ),
      };

    case CLEAR:
      return { ...state, petitions: [], petition: [] };

    default:
      return state;
  }
};
