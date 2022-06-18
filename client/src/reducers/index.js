import { combineReducers } from "redux";

import authReducer from "./authReducers";
import postReducer from "./postReducer";

export const reducers = combineReducers({ authReducer, postReducer });
