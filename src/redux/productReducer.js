import axios from 'axios';

const initialState = {
    productList: [],
    isLoading: false,
    sessionCart: [],
    sessionTotal: 0,
}

const SET_PRODUCTS      = 'SET_PRODUCTS',
      CREATE_PRODUCT    = 'CREATE_PRODUCT',
      EDIT_PRODUCT      = 'EDIT_PRODUCT',
      SET_CART          = 'SET_CART',
      ADD_TO_CART       = 'ADD_TO_CART',
      REMOVE_FROM_CART  = 'REMOVE_FROM_CART';

      export default function productReducer(state = initialState, action) {
          switch(action.type) {
            case `${SET_PRODUCTS}_PENDING`:
                return {...state, isLoading: true}
            case `${SET_PRODUCTS}_FULFILLED`:
                return {...state, productList: action.payload, isLoading: false}
            case `${CREATE_PRODUCT}_PENDING`:
                return {...state, isLoading: true}
            case `${CREATE_PRODUCT}_FULFILLED`:
                return {...state, isLoading: false}
            case `${EDIT_PRODUCT}_PENDING`:
                return {...state, isLoading: true}
            case `${EDIT_PRODUCT}_FULFILLED`:
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
            default:
                return {...state}
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
export function createProduct(name, price, product_url, sizes, dimensions, description, in_stock, admin_id) {
    return {
        type: CREATE_PRODUCT,
        payload: axios.post('/api/products', {name, price, product_url, sizes, dimensions, description, in_stock, admin_id}).then(res => window.location.pathname = '/products').catch(err => console.log('Err in create product', err))
    }
}
export function editProduct(id, name, price, product_url, sizes, dimensions, description, in_stock) {
    console.log(id, name, price, product_url, sizes, dimensions, description, in_stock);
    return {
        type: EDIT_PRODUCT,
        payload: axios.put(`/api/products/${id}`, {name, price, product_url, sizes, dimensions, description, in_stock}).then(res => window.location.pathname = '/products').catch(err => console.log('Err in edit product', err))
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