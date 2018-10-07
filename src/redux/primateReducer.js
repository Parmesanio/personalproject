import axios from 'axios';

const initialState = {
    primateList: [],
    isLoading: false,
    admin: {},
    weather: []
}

const SET_PRIMATES      = 'SET_PRIMATES',
      DELETE_PROFILE    = 'DELETE_PROFILE',
      CREATE_PROFILE    = 'CREATE_PROFILE',
      EDIT_PROFILE      = 'EDIT_PROFILE',
      SET_ADMIN         = 'SET_ADMIN',
      SET_WEATHER       = 'SET_WEATHER';


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
        case `${CREATE_PROFILE}_PENDING`:
            return {...state, isLoading: true}
        case `${CREATE_PROFILE}_FULFILLED`:
            return {...state, isLoading: false}
        case `${EDIT_PROFILE}_PENDING`:
            return {...state, isLoading: true}
        case `${EDIT_PROFILE}_FULFILLED`:
            return {...state, isLoading: false}
        case `${SET_WEATHER}_PENDING`:
            return {...state, isLoading: true}
        case `${SET_WEATHER}_FULFILLED`:
            return {...state, weather: action.payload, isLoading: false}
        default:
            return {...state}
    }
}
export function setPrimates() {
    return {
        type: SET_PRIMATES,
        payload: axios.get('/api/primates').then(response => response.data).catch(err => console.log('Err in setPrimates', err))
    }
}
export function setWeather() {
    return {
        type: SET_WEATHER,
        payload: axios.get('https://api.openweathermap.org/data/2.5/weather?id=4151366&APPID=42f85a624e44cf0c1e9d9d4f641fbede&units=imperial')
            .then(res => res.data).catch(err => console.log('Err in SET_WEATHER', err))
    }
}
export function logIn() {
    return {
        type: SET_ADMIN,
        payload: axios.get('/api/admin-data').then(response => response.data).catch(err => console.log('Err in setAdmin', err))
    }
}
export function deleteProfile(id) {
    return {
        type: DELETE_PROFILE,
        payload: axios.delete(`/api/primate/${id}`).then(() => window.location.pathname = '/meet-the-primates').catch(err => console.log('Err in delete', err))
    }
}
export function createPrimateProfile(name, species, dob, gender, bio, photo_urls, id) {
     return {
        type: CREATE_PROFILE,
        payload: axios.post('/api/primates', {name, species, dob, gender, bio, photo_urls, id}).then(() => window.location.pathname = '/meet-the-primates').catch(err => console.log('Err in createProfile', err))
    }
}
export function editPrimateProfile(id, name, species, dob, gender, bio, photo_urls, admin_id) {
    return {
        type: EDIT_PROFILE,
        payload: axios.put(`/api/primate/${id}`, {name, species, dob, gender, bio, photo_urls, admin_id}).then(() => window.location.pathname = '/meet-the-primates').catch(err => console.log('Err in createProfile', err.response))
    }
}