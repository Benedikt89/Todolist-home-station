import {applyMiddleware, createStore} from "redux";
import listsReducer from "./listsReducer";
import thunkMiddleware from "redux-thunk";


const store = createStore(listsReducer, applyMiddleware(thunkMiddleware));
export default store;