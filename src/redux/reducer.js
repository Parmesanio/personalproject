import axios from 'axios';

const initialState = {
    primateList: [],
    isLoading: false,
    admin: {}
}

const SET_PRIMATES = 'SET_PRIMATES';
const SET_ADMIN    = 'SET_ADMIN';


export default function primateReducer(state=initialState, action) {
    switch(action.type) {
        case `${SET_PRIMATES}_PENDING`:
            return {...state, isLoading: true}
        case `${SET_PRIMATES}_FULFILLED`:
            return {...state, primateList: action.payload, isLoading: false}
        case `${SET_ADMIN}_PENDING`:
            return {...state, isLoading: true}
        case `${SET_ADMIN}_FULFILLED`:
            return {...state, admin: action.payload, isLoading: false}
        default:
            return {...state}
    }
}

export function setPrimates() {
    return {
        type: SET_PRIMATES,
        payload: axios.get('/api/primates').then(response => response.data)
    }
}
export function logIn() {
    
    return {
        type: SET_ADMIN,
        payload: axios.get('/api/admin-data').then(response => response.data)
    }
}