import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import primateReducer from './primateReducer';
import productReducer from './productReducer';

const reducer = combineReducers({
    primates: primateReducer,
    products: productReducer
})

const store = createStore(
    reducer,
    applyMiddleware(reduxPromiseMiddleware())
    );

export default store;