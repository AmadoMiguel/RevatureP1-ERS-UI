import {combineReducers} from 'redux';
import { AppState } from '../models/redux_models/AppState';
import { userReducer } from './reducers/user.reducer';
import { currentInfoReducer } from './reducers/info.reducer';


export const state = combineReducers<AppState>({
    user: userReducer,
    currentInfo:currentInfoReducer
}) 