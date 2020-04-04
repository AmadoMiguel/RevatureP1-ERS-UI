import { Store, createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { state } from '.';
import { AppState } from '../models/redux_models/AppState';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const enhancer = compose(
    applyMiddleware(reduxThunk, logger),
    applyMiddleware(reduxThunk)
);

// Used to avoid redux state to be erased when refreshing
const persistConfig = {
    key:'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, state);

export default () => {
    let store: Store<AppState> = createStore(
        persistedReducer, enhancer
    );
    let storePersistor = persistStore(store);
    return {store, storePersistor}
} 

