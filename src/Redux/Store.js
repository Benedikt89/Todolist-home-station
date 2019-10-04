import {applyMiddleware, createStore} from "redux";
import listsReducer from "./listsReducer";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(listsReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
export default store;