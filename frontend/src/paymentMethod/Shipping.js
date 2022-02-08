import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps'
import { saveShipping } from '../redux/cart/actions';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '..//Css/Form.css'

export default function Shipping() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [fullName, setFullName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')
    const token = localStorage.getItem('token')

    if (!token) history.push('/login')

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = { fullName, address, city, postalCode, country }
        dispatch(saveShipping(data))
        history.push('/payment')
    }

    return (
        <>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <Form className='Shipping-form was-validated' onSubmit={handleSubmit}>
                <h1>Shipping Address</h1>
                <Form.Group className="mb-4" controlId="formBasicFullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        minLength='5'
                        maxLength='30'
                        type="text"
                        value={fullName}
                        name='fullName'
                        placeholder="Enter your fullName"
                        onChange={e => setFullName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        minLength='5'
                        maxLength='50'
                        type="text"
                        value={address}
                        name='address'
                        placeholder="Enter your Address"
                        onChange={e => setAddress(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBasicCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        minLength='5'
                        maxLength='20'
                        type="text"
                        value={city}
                        name='city'
                        placeholder="Enter your City"
                        onChange={e => setCity(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPostalCode">
                    <Form.Label>PostalCode</Form.Label>
                    <Form.Control
                        minLength='2'
                        maxLength='10'
                        type="text"
                        value={postalCode}
                        name='postalCode'
                        placeholder="Enter your PostalCode"
                        onChange={e => setPostalCode(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        minLength='5'
                        maxLength='20'
                        type="text"
                        value={country}
                        name='country'
                        placeholder="Enter your Country"
                        onChange={e => setCountry(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="warning" className='submitBtn' type="submit">Continue</Button>
            </Form>
        </>
    )
}
