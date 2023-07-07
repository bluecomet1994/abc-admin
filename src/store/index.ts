import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';
import user from "./reducers/user.reducer";
import application from './reducers/application.reducer';

const store = createStore(
  combineReducers({ user, application }),
  applyMiddleware(thunk)
);

export default store;