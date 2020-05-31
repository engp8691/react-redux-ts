import {combineReducers, createStore} from 'redux';
import userReducer from "./userReducer";
import recorderReducer from "./recorderReducer";

const rootReducer = combineReducers({
    users: userReducer,
    recorder: recorderReducer   
})

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer);

export default store;
