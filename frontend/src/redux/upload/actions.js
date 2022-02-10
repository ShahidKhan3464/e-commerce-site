import axios from 'axios'
import { ADD_PRODUCT_FAIL, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS } from './types'

export const addProduct = (product) => async (dispatch) => {
    dispatch({ type: ADD_PRODUCT_REQUEST })
    try {
        const { data } = await axios.post('https://storebackend.herokuapp.com/api/upload/product', product, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data })

    } catch (err) {
        dispatch({
            type: ADD_PRODUCT_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}