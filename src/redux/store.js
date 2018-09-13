import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import primateReducer from './reducer';

const reducer = combineReducers({
    primates: primateReducer
})

const store = createStore(
    reducer,
    applyMiddleware(reduxPromiseMiddleware())
    );

export default store;