// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
// import admin from './admin';
// ==============================|| COMBINE REDUCERS ||============================== //
// admin
const reducers = combineReducers({ menu });

export default reducers;
