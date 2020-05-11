import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../img/logo.svg';

const Header = () => {
    return (
        <Container fluid className='bg-light position-fixed'>
            <Container>
                <Navbar className='justify-content-between' variant='light'>
                    <Navbar.Brand as={Link} to='/'>
                        <img
                            alt=''
                            src={logo}
                            width='30'
                            height='30'
                            className='d-inline-block align-top'
                        />
                        Manage Users
                    </Navbar.Brand>
                    <Nav variant='pills' activeKey='/home'>
                        <Nav.Item>
                            <Nav.Link as={Link} to='/signup'>
                                <Button variant='success'>Sign Up</Button>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to='/login'>
                                <Button variant='info'>Log In</Button>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
            </Container>
        </Container>
    );
};
export default Header;
