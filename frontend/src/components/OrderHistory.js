import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { listOrderMine } from '../redux/order/actions';
import LoadingBox from './LoadingBox'
import Alert from 'react-bootstrap/Alert'
import '..//Css/OrderHistory.css'

export default function OrderHistory() {
    const history = useHistory()
    const dispatch = useDispatch()
    const myOrderList = useSelector(state => state.MyOrderList)
    const { loading, orders, error } = myOrderList
    const token = localStorage.getItem('token')

    if (!token) history.push('/login')

    useEffect(() => {
        dispatch(listOrderMine())
    }, [dispatch])

    return (
        <div>
            <h1 style={{ textAlign: 'center', margin: '2rem 0' }}>Order History</h1>
            {loading
                ? <LoadingBox></LoadingBox>
                : error
                    ? <Alert variant='warning'>{error}</Alert>
                    : <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.length === 0
                                    ? <tr>
                                        <td
                                            colSpan='6'
                                            style={{ textAlign: 'center', color: 'red', fontSize: 'large' }}
                                        >
                                            You have made no order so far!!!
                                        </td>
                                    </tr>
                                    : orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.date}</td>
                                            <td>{order.grandTotal}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                            <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                                            <td>
                                                <button
                                                    type='button'
                                                    className='small'
                                                    onClick={() => { history.push(`/order/${order._id}`) }}
                                                >
                                                    Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                        </tbody>
                    </table>
            }
        </div>
    )
}
