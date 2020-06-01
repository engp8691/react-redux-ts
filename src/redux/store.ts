import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userEventReducer from "./userEventReducer";
import recorderReducer from "./recorderReducer";

const rootReducer = combineReducers({
    userevents: userEventReducer,
    recorder: recorderReducer   
})

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
