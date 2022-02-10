import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { userSignIn } from '../redux/user/actions';
import LoadingBox from '../components/LoadingBox';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import '..//Css/Form.css'

function Login() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('' || history.location.state)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const { data } = await axios.post('https://storebackend.herokuapp.com/api/user/login', {
                email: email,
                password: password
            })

            setLoading(false)
            if (data.isAdmin) {
                history.push('/dashboard')
                dispatch(userSignIn(data))
                return
            }
            history.push('/')
            dispatch(userSignIn(data))
        }
        catch (err) {
            setLoading(true)
            setMessage(err.response && err.response.data.message ? err.response.data.message : err.message)
            setLoading(false)
        }
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
                    {message && <Alert variant='warning'>{message}</Alert>}
                    <Form className='Login-form was-validated' onSubmit={handleSubmit}>
                        <h1>Sign In</h1>
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

                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                minLength='5'
                                maxLength='20'
                                type="password"
                                value={password}
                                name='password'
                                placeholder="Enter your Password"
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="warning" className='submitBtn' type="submit">Sign in</Button>
                    </Form>
                </>
            }
        </>
    )
}

export default Login
