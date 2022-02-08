import React, { useEffect } from 'react'
import { ORDER_CREATE_RESET } from '../redux/order/types'
import { createdOrder } from '../redux/order/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import CheckoutSteps from './CheckoutSteps'
import LoadingBox from '..//components/LoadingBox'
import Alert from 'react-bootstrap/Alert';
import '..//Css/Placeorder.css'

export default function Placeorder() {
    const history = useHistory()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const orderCreate = useSelector(state => state.orderCreate)
    const { loading, success, error, order } = orderCreate

    const subTotal = cart.cartItems.reduce((total, item) => total += item.price * item.quantity, 0)
    const tax = (subTotal * 5) / 100
    const grandTotal = subTotal + tax

    if (!cart.payment) history.push('/payment')

    const handlePlaceOrder = () => {
        const order = { ...cart, orderItems: cart.cartItems, subTotal: subTotal, tax: tax, grandTotal: grandTotal }
        dispatch(createdOrder(order))
    }

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [dispatch, history, order, success])

    return (
        <>
            {loading
                ? <LoadingBox></LoadingBox>
                : error
                    ? <Alert variant="warning">{error}</Alert>
                    : <>
                        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
                        <div className='row'>
                            <div className='col-md-6 col-lg-6'>
                                <div className='order-details'>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name:</strong> {cart.shipping.fullName} <br />
                                        <strong>Address:</strong> {cart.shipping.address},{cart.shipping.city},{cart.shipping.postalCode},{cart.shipping.country}
                                    </p>
                                </div>

                                <div className='order-details'>
                                    <h2>Payment</h2>
                                    <p>
                                        <strong>Method:</strong> {cart.payment}
                                    </p>
                                </div>

                                <div className='order-details'>
                                    <h2>Order Items</h2>
                                    {cart.cartItems.map(item =>
                                        <div key={item._id} className='order-item'>
                                            <article className='cart-item'>
                                                <img src={item.image} alt={item.name} />
                                                <div className='item-details'>
                                                    <h5>{item.name}</h5>
                                                    <h5 className='item-price'>{item.quantity} x ${item.price} = ${item.quantity * item.price}</h5>
                                                </div>
                                            </article>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='col-md-6 col-lg-6' style={{ width: '0' }}>
                                <div className="process-order">
                                    <h2>Order Summary</h2>
                                    <div className="row">
                                        <p>Subtotal <span>${subTotal}</span> </p>
                                        <p>Tax <span>${tax}</span> </p>
                                        <p><strong>Grand Total</strong> <span> <strong> ${grandTotal} </strong></span> </p>
                                        <button
                                            className='btn btn-warning place-order'
                                            onClick={handlePlaceOrder}
                                            disabled={cart.cartItems.length === 0}
                                        >
                                            Place Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}
