import { Store, createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { state } from '.';
import { AppState } from '../models/redux_models/AppState';

const enhancer = compose(
    applyMiddleware(reduxThunk, logger),
    applyMiddleware(reduxThunk)
);

export const store: Store<AppState> = createStore(
    state, enhancer
);
