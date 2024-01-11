import { combineReducers } from "redux";

import auth from "./auth";
import status from "./status";
import petition from "./petition";
import duplicate from "./duplicate";

export const reducers = combineReducers({ auth, status, petition, duplicate });
