import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../redux/products/actions';
import { addToCart } from '../redux/cart/actions';
import LoadingBox from './LoadingBox'
import 'bootstrap/dist/css/bootstrap.min.css';
import '..//Css/Product.css'

function Product(props) {
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    const [quantity, setQuantity] = useState(1)
    const cart = useSelector((state) => state.cart)
    const productDetails = useSelector((state) => state.productDetails)
    const { loading, product, error } = productDetails
    const productId = props.match.params.id
    const { cartItems } = cart

    const handleChange = (e) => {
        if (e.target.value < 1) return quantity
        setQuantity(e.target.value)
    }

    const handleCart = (e) => {
        const existItem = cartItems.some(x => x._id === productId)
        if (existItem) return setMessage(`${product.name} already exits in your shopping cart`)
        dispatch(addToCart(productId, Number(quantity)))
        setMessage(`${product.name} has been added to your shopping cart`)
    }

    useEffect(() => {
        if (!message) return dispatch(detailsProduct(productId))
        setTimeout(() => {
            setMessage('')
        }, 3000)
    }, [dispatch, productId, message])

    return (
        <>
            {message && <Alert variant='warning'> {message} </Alert>}
            {loading
                ? <LoadingBox></LoadingBox>
                : error
                    ? <Alert variant='warning'>{error}</Alert>
                    : <Container>
                        <Row>
                            <Col sm={12} md={6} className='product'>
                                <img src={`${product.image}`} style={{ width: '25rem', height: '25rem' }} />
                            </Col>

                            <Col sm={12} md={6} className='details'>
                                <h1>{product.name}</h1>
                                <label htmlFor='price'>Price</label>
                                <span name='price'>${product.price}</span><br /><br />

                                <label htmlFor="size">Select Size</label>
                                <select name='size' id='size'>
                                    <option value='Xs'>Xs</option>
                                    <option value='Sm'>Sm</option>
                                    <option value='Dm'>Md</option>
                                    <option value='Lg'>Lg</option>
                                    <option value='Xl'>Xl</option>
                                </select><br /><br />

                                <label htmlFor='quantity'>Quantity</label>
                                <input type="number" name='quantity' value={quantity} id='quantity' onChange={handleChange} /><br /><br />

                                <Button variant='warning' className='cartBtn' onClick={handleCart}>Add To Cart</Button><br /><br />

                                <h3>Product Details</h3>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. A et autem distinctio facilis quas odit minus alias illo harum. Temporibus tempora impedit harum laborum blanditiis, sequi dolor explicabo excepturi voluptatem.</p>
                            </Col>
                        </Row>
                    </Container>
            }
        </>
    )
}

export default Product
