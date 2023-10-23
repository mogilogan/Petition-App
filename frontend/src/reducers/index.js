import { combineReducers } from 'redux';


import auth from './auth';
import status from './status';
import petition from './petition';


export const reducers = combineReducers({  auth,status,petition });