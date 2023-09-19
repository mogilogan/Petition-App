import { combineReducers } from 'redux';


import auth from './auth';
import status from './status';
import adders from './addpetition';

export const reducers = combineReducers({  auth,status,adders });