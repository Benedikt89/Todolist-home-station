import {createStore} from "redux";
import listsReducer from "./listsReducer";


const store = createStore(listsReducer);
export default store;