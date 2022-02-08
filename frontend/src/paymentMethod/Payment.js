import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { savePayment } from '../redux/cart/actions'
import CheckoutSteps from './CheckoutSteps'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Payment() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [payment, setPayment] = useState('PayPal')
    const shipping = JSON.parse(localStorage.getItem('shipping'))

    if (!shipping) history.push('/shipping')

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(savePayment(payment))
        history.push('/placeorder')
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <Form className='Payment-form' onSubmit={handleSubmit}>
                <h1>Payment Method</h1>
                <Form.Group className="mb-4" controlId="formBasicPayment">
                    <Form.Check
                        type="radio"
                        value="paypal"
                        name="radio"
                        className='input'
                        onChange={e => setPayment(e.target.value)}
                        required
                        checked
                    />
                    <Form.Label className='label'>PayPal</Form.Label>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPayment">
                    <Form.Check
                        type="radio"
                        value="stripe"
                        name='radio'
                        className='input'
                        onChange={e => setPayment(e.target.value)}
                        required
                    />
                    <Form.Label className='label'>Stripe</Form.Label>
                </Form.Group>

                <Button variant="warning" className='submitBtn' type="submit">Continue</Button>
            </Form>
        </>
    )
}
