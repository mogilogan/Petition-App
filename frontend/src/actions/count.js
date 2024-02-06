import { COUNT, CLEAR, DASHBOARD } from "../constants/actionTypes";
import * as api from "../api/index";

export const dashboards =
  (formData, setError, setDash, setType, setTypeData) => async (dispatch) => {
    try {
      // returns all count for present user
      const { data } = await api.Dashboard(formData);

      dispatch({ type: DASHBOARD, payload: data });

      setDash(data?.graph);
      setType(data?.type);
      setTypeData(data?.type[0]?.data);
    } catch (error) {
      // clear state if requested data is not fetched
      dispatch({ type: CLEAR });
      if (error?.response?.data) {
        setError(error.response.data);
      } else {
        setError(error.message);
      }
    }
  };
