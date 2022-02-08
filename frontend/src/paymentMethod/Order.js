import React, { useEffect, useState } from 'react'
import { detailsOrder } from '../redux/order/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import LoadingBox from '..//components/LoadingBox'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import '..//Css/Placeorder.css'

export default function Placeorder(props) {
    const history = useHistory()
    const dispatch = useDispatch()
    const [message, setMessage] = useState(false)
    const orderId = props.match.params.id
    const orderDetails = useSelector(state => state.orderDetails)
    const { loading, order, error } = orderDetails
    const token = localStorage.getItem('token')

    if (!token) history.push('/login')

    const handlePayment = (e) => {
        setMessage(true)
        if (e.target.id === 'PayPal') return window.open('https://www.paypal.com/signin')
        window.open('https://dashboard.stripe.com/login')
    }

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage(false)
            }, 3000);
        }
        dispatch(detailsOrder(orderId))
    }, [dispatch, orderId, message])

    return (
        <>
            {message && <Alert variant='warning'>Your order has been successfully confirmed</Alert>}
            {loading
                ? <LoadingBox></LoadingBox>
                : error
                    ? <Alert variant="warning">{error}</Alert>
                    : <>
                        <h2>Order: {order._id}</h2>
                        <div className='row'>
                            <div className='col-md-6 col-lg-6'>
                                <div className='order-details'>
                                    <h2>shipping</h2>
                                    <p>
                                        <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                        <strong>Address:</strong> {order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.postalCode},{order.shippingAddress.country}
                                    </p>
                                    {order.isDelivered
                                        ? <Alert variant='success'>Delivered at {order.delivered}</Alert>
                                        : <Alert variant='danger'>Not Delivered</Alert>
                                    }
                                </div>

                                <div className='order-details'>
                                    <h2>Payment</h2>
                                    <p>
                                        <strong>Method:</strong> {order.paymentMethod}
                                    </p>
                                    {order.isPaid
                                        ? <Alert variant='success'>Paid at {order.paid}</Alert>
                                        : <Alert variant='danger'>Not Paid</Alert>
                                    }
                                </div>

                                <div className='order-details'>
                                    <h2>Order Items</h2>
                                    {order.orderItems.map(item =>
                                        <div key={item._id} className='order-item'>
                                            <article className='order-item'>
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
                                        <p>Subtotal <span>${order.subTotal}</span> </p>
                                        <p>Tax <span>${order.tax}</span> </p>
                                        <p><strong>Grand Total</strong> <span> <strong> ${order.grandTotal} </strong></span> </p>
                                        {order.paymentMethod === 'PayPal'
                                            ? <Button
                                                variant='warning'
                                                className='place-order'
                                                id={order.paymentMethod}
                                                onClick={handlePayment}
                                            >
                                                PayPal
                                            </Button>

                                            : <Button
                                                variant='warning'
                                                className='place-order'
                                                id={order.paymentMethod}
                                                onClick={handlePayment}
                                            >
                                                Stripe
                                            </Button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}
