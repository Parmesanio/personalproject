import axios from 'axios';

const initialState = {
    primateList: [],
    isLoading: false,
    admin: {}
}

const SET_PRIMATES      = 'SET_PRIMATES',
      SET_ADMIN         = 'SET_ADMIN',
      DELETE_PROFILE    = 'DELETE_PROFILE';


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
        case `${DELETE_PROFILE}_PENDING`:
            return {...state, isLoading: true}
        case `${DELETE_PROFILE}_FULFILLED`:
            return {...state, isLoading: false}
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
export function deleteProfile(id) {
    return {
        type: DELETE_PROFILE,
        payload: axios.delete(`/api/primate/${id}`).then(() => window.location.pathname = '/').catch(err => console.log('Err in delete', err))
    }
}