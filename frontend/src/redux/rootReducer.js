import { combineReducers } from "redux";
import { cartReducer } from "./cart/reducer";
import { userDetailsReducer, userSignInReducer, userUpdateProfileReducer } from "./user/reducer";
import { orderCreateReducer, orderDetailsReducer, orderListReducer } from "./order/reducer";
import { productDetailsReducer, productListReducer } from "./products/reducer";
import { addProductReducer } from "./upload/reducer";

const rootReducer = combineReducers({
    products: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignIn: userSignInReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    MyOrderList: orderListReducer,
    addProduct: addProductReducer
})

export default rootReducer