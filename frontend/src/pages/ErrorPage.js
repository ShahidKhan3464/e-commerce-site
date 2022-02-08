import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import '../Css/Error.css'

function ErrorPage() {
    return (
        <div>
            <Container>
                <Row className='ErrorPage-row'>
                    <Col sm={12} md={12}>
                        <Image src='Images/error.jpg' style={{ width: '18rem', height: '18rem' }} />
                        <h2 style={{ marginBottom: '1rem' }}>Opps! Page Not Found</h2>
                        <Link to='/'><Button variant="success">Back to Home</Button></Link>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ErrorPage
