import axios from 'axios';

const initialState = {
    primateList: [],
    productList: [],
    isLoading: false,
    admin: {},
    sessionCart: [],
    sessionTotal: 0,
    weather: []
}

const SET_PRIMATES      = 'SET_PRIMATES',
      SET_PRODUCTS      = 'SET_PRODUCTS',
      SET_ADMIN         = 'SET_ADMIN',
      DELETE_PROFILE    = 'DELETE_PROFILE',
      CREATE_PROFILE    = 'CREATE_PROFILE',
      EDIT_PROFILE      = 'EDIT_PROFILE',
      SET_CART          = 'SET_CART',
      ADD_TO_CART       = 'ADD_TO_CART',
      REMOVE_FROM_CART  = 'REMOVE_FROM_CART',
      SET_WEATHER       = 'SET_WEATHER';


export default function primateReducer(state=initialState, action) {
    switch(action.type) {
        case `${SET_PRIMATES}_PENDING`:
            return {...state, isLoading: true}
        case `${SET_PRIMATES}_FULFILLED`:
            return {...state, primateList: action.payload, isLoading: false}
        case `${SET_PRODUCTS}_PENDING`:
            return {...state, isLoading: true}
        case `${SET_PRODUCTS}_FULFILLED`:
            return {...state, productList: action.payload, isLoading: false}
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
        case `${ADD_TO_CART}_PENDING`:
            return {...state, isLoading: true}
        case `${ADD_TO_CART}_FULFILLED`:
            return {...state, sessionCart: action.payload.cart, sessionTotal: action.payload.total, isLoading: false}
        case `${SET_CART}_PENDING`:
            return {...state, isLoading: true}
        case `${SET_CART}_FULFILLED`:
            return {...state, sessionCart: action.payload.cart, sessionTotal: action.payload.total, isLoading: false}
        case `${REMOVE_FROM_CART}_PENDING`:
            return {...state, isLoading: true}
        case `${REMOVE_FROM_CART}_FULFILLED`:
            return {...state, sessionCart: action.payload.cart, sessionTotal: action.payload.total, isLoading: false}
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
export function setProducts() {
    return {
        type: SET_PRODUCTS,
        payload: axios.get('/api/products').then(response => {
            return response.data;
        }).catch(err => console.log('Err in setProducts', err))
    }
}
export function setWeather() {
    return {
        type: SET_WEATHER,
        payload: axios.get('http://api.openweathermap.org/data/2.5/forecast?id=4151366&APPID=42f85a624e44cf0c1e9d9d4f641fbede&units=imperial')
            .then(res => console.log(res.data)).catch(err => console.log('Err in SET_WEATHER', err))
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
        payload: axios.delete(`/api/primate/${id}`).then(() => window.location.pathname = '/').catch(err => console.log('Err in delete', err))
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
export function setCart() {
    return {
        type: SET_CART,
        payload: axios.get('/api/user/cart').then(res => res.data).catch(err => console.log('Err in set cart', err))
    }
}
export function addToCart(product) {
    return {
        type: ADD_TO_CART,
        payload: axios.post('/api/user/cart', {product}).then(res => res.data).catch(err => console.log('Err in addToCart', err))
    }
}
export function removeFromCart(id) {
    return {
        type: REMOVE_FROM_CART,
        payload: axios.delete(`/api/user/cart/${id}`).then(res => res.data).catch(err => console.log('Err in removeFromCart', err))
    }
}