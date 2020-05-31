import {combineReducers, createStore} from 'redux';
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    users: userReducer    
})

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer);

export default store;
