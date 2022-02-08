import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import '..//Css/About.css'

function About() {
    return (
        <Container>
            <Row>
                <Col sm={12} md={6} className="right">
                    <Image src='Images/me.jpg' className="my-img" />
                </Col>

                <Col sm={12} md={6}>
                    <h1 className="h1">Hi, I'm Shahid khan. I'm a <span className="text_clr">Mern-Stack Developer.</span></h1>
                </Col>
            </Row>
        </Container>
    )
}

export default About
