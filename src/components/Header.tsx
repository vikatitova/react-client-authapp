import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { saveCustomerAvatar } from '../controllers/avatar.controller';
import logo from '../img/logo.svg';

const FileWrapper: any = styled.div`
    display: flex;
    position: relative;
`;
const StyledInput: any = styled.input`
    display: none;
`;
const StyledLabel: any = styled.label`
    cursor: pointer;
    color: #fff;
    display: flex;
    align-items: center;
    border-radius: 50%;
    -webkit-transition: 1s ease-in-out;
    transition: 1s ease-in-out;
    margin-bottom: 0;
    text-align: center;
    && :hover {
        opacity: 0.9;
    }
`;
const StyledImgWrapper: any = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 50%;
    background: gainsboro;
    cursor: pointer;
`;

const StyledImg: any = styled.img`
    width: 100%;
    height: 100%;
`;

const StyledEmail: any = styled.span`
    color: black;
    font-size: 1.3rem;
    margin-left: 10px;
`;

const Header = () => {
    const { isAuthenticated, logout, avatarSrc, email, setAvatar } = useContext(
        AuthContext
    );
    const history = useHistory();

    const logoutHandler = (e: any) => {
        e.preventDefault();
        logout();
        history.push('/');
    };

    const saveAvatar = async (e: any) => {
        try {
            const formData = new FormData();
            formData.append('avatarImage', e.target.files[0]);
            const path: string = await saveCustomerAvatar(formData);
            setAvatar(path);
        } catch (err) {
            console.log(err);
        }
    };

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
                    {isAuthenticated && (
                        <form>
                            <FileWrapper>
                                <StyledInput
                                    id='my-file'
                                    type='file'
                                    onChange={saveAvatar}
                                />
                                <StyledLabel htmlFor='my-file'>
                                    <StyledImgWrapper>
                                        <StyledImg src={avatarSrc} />
                                    </StyledImgWrapper>
                                    <StyledEmail>{email}</StyledEmail>
                                </StyledLabel>
                            </FileWrapper>
                        </form>
                    )}
                    <Nav variant='pills' activeKey='/home'>
                        {isAuthenticated && (
                            <>
                                <Nav.Item>
                                    <Nav.Link as={Link} to='/users'>
                                        <Button variant='warning'>Users</Button>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={Link} to='/logout'>
                                        <Button
                                            variant='danger'
                                            onClick={logoutHandler}
                                        >
                                            Log Out
                                        </Button>
                                    </Nav.Link>
                                </Nav.Item>
                            </>
                        )}
                        {!isAuthenticated && (
                            <>
                                <Nav.Item>
                                    <Nav.Link as={Link} to='/signup'>
                                        <Button variant='success'>
                                            Sign Up
                                        </Button>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={Link} to='/login'>
                                        <Button variant='info'>Log In</Button>
                                    </Nav.Link>
                                </Nav.Item>
                            </>
                        )}
                    </Nav>
                </Navbar>
            </Container>
        </Container>
    );
};
export default Header;
