import { Store, createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { state } from '.';

const enhancer = compose(
    applyMiddleware(reduxThunk, logger)
);

export const store: Store<any> = createStore(
    state, enhancer
);
