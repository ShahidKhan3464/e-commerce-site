import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING } from './types'

export const addToCart = (productId, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:3001/api/products/${productId}`)
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            _id: data._id,
            quantity
        }
    })
    localStorage.setItem('cartProducts', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId })
    localStorage.setItem('cartProducts', JSON.stringify(getState().cart.cartItems))
}

export const saveShipping = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING, payload: data })
    localStorage.setItem('shipping', JSON.stringify(data))
}

export const savePayment = (payment) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT, payload: payment })
}