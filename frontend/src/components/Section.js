import React from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import 'bootstrap/dist/css/bootstrap.min.css';
import '..//Css/Section.css'

function Section({ product }) {
    const { _id, name, image, price, rating, numReviews } = product

    return (
        <article className='product'>
            <Card>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>
                        <h5> {name} </h5>
                        <h3> ${price} </h3>
                    </Card.Title>
                    <div className='rating'>
                        <Rating rating={rating} numReviews={numReviews} />
                    </div>
                    <Link to={`product/${_id}`} className='btn btn-primary' >Details</Link>
                </Card.Body>
            </Card>
        </article>
    )
}

export default Section