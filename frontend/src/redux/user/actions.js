import axios from 'axios'
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_SIGNIN, USER_UPDATE_REQUEST, USER_UPDATE_FAIL, USER_UPDATE_SUCCESS } from "./types"

export const userSignIn = (data) => (dispatch) => {
    dispatch({
        type: USER_SIGNIN,
        payload: data
    })
    localStorage.setItem('isAdmin', data.isAdmin)
    localStorage.setItem('token', data.token)
}

export const userDetails = () => async (dispatch) => {
    dispatch({ type: USER_DETAILS_REQUEST })
    try {
        const { data } = await axios.get('https://storebackend.herokuapp.com/api/user/profile', {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
    }
    catch (err) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const updateUserProfile = (user) => async (dispatch) => {
    dispatch({ type: USER_UPDATE_REQUEST })
    try {
        const { data } = await axios.put('https://storebackend.herokuapp.com/api/user/profile', user, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data.message })
    }
    catch (err) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}