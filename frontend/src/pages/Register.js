import React, { useState, useEffect } from 'react'
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import '..//Css/Form.css'

function Register() {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = async (e) => {
        if (e.target.value < 0) return setPhone(0)
        setPhone(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await axios.post("https://storebackend.herokuapp.com/api/user/register", {
                name: fullName,
                email: email,
                phone: phone,
                password: password
            })

            setMessage(data)
            setLoading(false)
        }
        catch (err) {
            setLoading(true)
            setMessage(err.response && err.response.data.message ? err.response.data.message : err.message)
            setLoading(false)
        }
        setFullName('')
        setEmail('')
        setPhone('')
        setPassword('')
    }

    useEffect(() => {
        setTimeout(() => {
            setMessage('')
        }, 3000)
    }, [message])

    return (
        <>
            {loading
                ? <LoadingBox></LoadingBox>
                : <>
                    {message && <Alert variant='success'>{message}</Alert>}
                    <Form className='Register-form was-validated' onSubmit={handleSubmit}>
                        <h1>Sign Up</h1>
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

                        <Form.Group className="mb-4" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                minLength='5'
                                maxLength='30'
                                type="email"
                                value={email}
                                name='email'
                                placeholder="Enter your Email"
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicPhone">
                            <Form.Label>Contact No</Form.Label>
                            <Form.Control
                                minLength='11'
                                maxLength='30'
                                type="number"
                                value={phone}
                                name='phone'
                                placeholder="Enter your Phone No"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                minLength='5'
                                maxLength='10'
                                type="password"
                                value={password}
                                name='password'
                                placeholder="Enter your Password"
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="warning" className='submitBtn' type="submit">Sign Up</Button>
                    </Form>
                </>
            }
        </>
    )
}

export default Register
