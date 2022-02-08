import { ADD_PRODUCT_FAIL, ADD_PRODUCT_REQUEST, ADD_PRODUCT_RESET, ADD_PRODUCT_SUCCESS } from './types'

const initialState = {
    loading: false,
    message: '',
    error: ''
}

export const addProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT_REQUEST:
            return { loading: true }

        case ADD_PRODUCT_SUCCESS:
            return { loading: false, message: action.payload }

        case ADD_PRODUCT_FAIL:
            return { loading: false, error: action.payload }

        case ADD_PRODUCT_RESET:
            return { message: '', error: '' }

        default: return state
    }
}