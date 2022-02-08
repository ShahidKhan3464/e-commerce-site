import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartProducts') ? JSON.parse(localStorage.getItem('cartProducts')) : []
    },
    userSignIn: {
        data: {
            isAdmin: localStorage.getItem('isAdmin') ? JSON.parse(localStorage.getItem('isAdmin')) : false,
            token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
        }
    }
}

const store = createStore(rootReducer, initialState, applyMiddleware(thunk))
export default store