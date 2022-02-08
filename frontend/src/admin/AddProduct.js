import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { addProduct } from '..//redux/upload/actions'
import LoadingBox from '../components/LoadingBox';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import '..//Css/Form.css'

export default function AddProduct() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(0)
    const [rating, setRating] = useState(0)
    const [numReviews, setNumReviews] = useState(0)
    const uploadProduct = useSelector(state => state.addProduct)
    const user = useSelector(state => state.userSignIn)
    const { loading, message, error } = uploadProduct
    const { data } = user

    if (!data.isAdmin) history.push('/login')

    const addProductHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('file', image)
        formData.append('price', price)
        formData.append('rating', rating)
        formData.append('numReviews', numReviews)
        dispatch(addProduct(formData))
    }

    return (
        <>
            {loading
                ? <LoadingBox></LoadingBox>
                : <>
                    {message && <Alert variant='success'>{message}</Alert>}
                    {error && <Alert variant='warning'>{error}</Alert>}
                    <Form className='AddProduct-form was-validated' onSubmit={addProductHandler} encType="multipart/form-data">
                        <h1>Add Product</h1>
                        <Form.Group className="mb-4" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                minLength='5'
                                maxLength='30'
                                type="text"
                                name='name'
                                value={name}
                                placeholder="Enter your product name"
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                name='file'
                                onChange={e => setImage(e.target.files[0])}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name='price'
                                value={price}
                                placeholder="Enter your product price"
                                onChange={e => setPrice(e.target.value < 0 ? price : e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicRating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                type="number"
                                name='rating'
                                value={rating}
                                placeholder="Enter your product rating"
                                onChange={e => setRating(e.target.value < 0 ? rating : e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicNumReviews">
                            <Form.Label>Num Reviews</Form.Label>
                            <Form.Control
                                type="number"
                                name='numReviews'
                                value={numReviews}
                                placeholder="Enter your product reviews"
                                onChange={e => setNumReviews(e.target.value < 0 ? numReviews : e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="warning" className='submitBtn' type="submit">Add Product</Button>
                    </Form>
                </>
            }
        </>
    )
}
