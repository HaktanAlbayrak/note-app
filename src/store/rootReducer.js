import { combineReducers } from "@reduxjs/toolkit";
import projectSlice from "./projectStore";

const createReducer = combineReducers({
  projectSlice,
});

export default createReducer;
