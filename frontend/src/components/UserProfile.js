import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updateUserProfile, userDetails } from '..//redux/user/actions'
import { USER_UPDATE_RESET } from '../redux/user/types';
import LoadingBox from './LoadingBox';
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import '..//Css/Form.css'

export default function UserProfile() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const userProfile = useSelector(state => state.userDetails)
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { loading, user, error } = userProfile
    var { loading: loadingUpdate, message, error: errorUpdate } = userUpdateProfile
    const token = localStorage.getItem('token')

    if (!token) history.push('/login')

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUserProfile({ userId: user._id, name, email, password }))
    }

    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_RESET })
            dispatch(userDetails())
            return
        }
        setName(user.name)
        setEmail(user.email)
        setPhone(user.phone)
    }, [dispatch, user])

    return (
        <>
            <Form className='Profile-form was-validated' onSubmit={handleSubmit}>
                <h1>User Profile</h1>
                {
                    loading
                        ? <LoadingBox></LoadingBox>
                        : error
                            ? <Alert variant='success'>{error}</Alert>
                            : <>
                                {loadingUpdate && <LoadingBox></LoadingBox>}
                                {errorUpdate && <Alert variant='warning'>{errorUpdate}</Alert>}
                                {message && <Alert variant='success'>{message}</Alert>}
                                <Form.Group className="mb-4" controlId="formBasicFullName">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        minLength='5'
                                        maxLength='30'
                                        type="text"
                                        value={name}
                                        name='fullName'
                                        placeholder='Enter your fullName'
                                        onChange={e => setName(e.target.value)}
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
                                        placeholder='Enter your Email'
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
                                        placeholder='Enter your Phone No'
                                        onChange={e => setPhone(e.target.value)}
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

                                <Button variant="warning" className='submitBtn' type="submit">Update</Button>
                            </>
                }
            </Form>
        </>
    )
}
