import React, { useEffect } from 'react'
import Section from './Section'
import LoadingBox from './LoadingBox'
import { useSelector } from 'react-redux'
import { listProducts } from '../redux/products/actions'
import { useDispatch } from 'react-redux'
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import '..//Css/Products.css'

const Products = () => {
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.products)
    const { loading, products, error } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <>
            {loading
                ? <LoadingBox></LoadingBox>
                : error
                    ? <Alert variant='warning'>{error}</Alert>
                    : <section className='Products'>
                        {products.map(product => <Section key={product._id} product={product} />)}
                    </section>
            }
        </>
    )
}

export default Products
