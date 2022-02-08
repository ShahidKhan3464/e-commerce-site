import { CART_ADD_ITEM, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING } from "./types";

const initialState = {
    cartItems: [],
    shipping: {},
    payment: 'PayPal'
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x._id === item._id)
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x._id === existItem._id ? item : x)
                }
            }
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x._id !== action.payload)
            }

        case CART_SAVE_SHIPPING:
            return {
                ...state,
                shipping: action.payload
            }

        case CART_SAVE_PAYMENT:
            return {
                ...state,
                payment: action.payload
            }

        case CART_EMPTY:
            return {
                ...state,
                cartItems: [],
            }

        default: return state
    }
}