import axios from 'axios'
import { MY_ORDER_LIST_FAIL, MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from './types'
import { CART_EMPTY } from '..//cart/types'

export const createdOrder = (order) => async (dispatch) => {
    dispatch({ type: ORDER_CREATE_REQUEST })
    try {
        const { data } = await axios.post('http://localhost:3001/api/order', order, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order })
        dispatch({ type: CART_EMPTY })
        localStorage.removeItem('cartProducts')
    }
    catch (err) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const detailsOrder = (orderId) => async (dispatch) => {
    dispatch({ type: ORDER_DETAILS_REQUEST })
    try {
        const { data } = await axios.get(`http://localhost:3001/api/order/${orderId}`, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
    }
    catch (err) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const listOrderMine = () => async (dispatch) => {
    dispatch({ type: MY_ORDER_LIST_REQUEST })
    try {
        const { data } = await axios.get('http://localhost:3001/api/order/mine', {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
    }
    catch (err) {
        dispatch({
            type: MY_ORDER_LIST_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}