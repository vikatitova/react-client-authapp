import React, { useState, useContext } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { loginCustomer } from '../controllers/login.controller';
import { signupCustomer } from '../controllers/signup.controller';
import { AuthFormMapping } from '../shared/constants';
import { AuthPageName, IAuthResponse } from '../shared/interfaces/common';
import { Notify } from './Notify';
import { useNotify } from '../hooks/notify.hook';
import { AuthContext } from '../context/AuthContext';

const StyledForm = styled(Form)`
    margin: 0 auto;
    width: 500px;
`;

const StyledPageName = styled.h1`
    display: flex;
    justify-content: center;
    padding-bottom: 50px;
`;

const AuthForm = () => {
    const authFormName: string = AuthFormMapping[window.location.pathname];
    const authPathName: string = window.location.pathname;
    const [isLoading, setLoading] = useState(false);
    const auth = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const { message, type, addNotification } = useNotify();
    const [validated, setValidated] = useState(false);
    const [formInput, setFormInput] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (event: any): Promise<void> => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            return;
        } else {
            setValidated(true);
        }

        const { email, password } = formInput;

        if (AuthPageName.LOGIN === authPathName) {
            try {
                setLoading(true);
                const res: IAuthResponse = await loginCustomer(email, password);
                auth.login(res.token, email);
                if (res.path) {
                    auth.setAvatar(res.path);
                }
                addNotification(res.message, 'info');
                setShow(true);
                setLoading(false);
            } catch (err) {
                const { message } = err;
                addNotification(message, 'error');
                setShow(true);
                setLoading(false);
            }
        } else {
            try {
                setLoading(true);
                const res: IAuthResponse = await signupCustomer(
                    email,
                    password
                );
                addNotification(res.message, 'info');
                setShow(true);
                setLoading(false);
            } catch (err) {
                const { message } = err;
                addNotification(message, 'error');
                setShow(true);
                setLoading(false);
            }
        }

        setFormInput({
            email: '',
            password: '',
        });
        setValidated(false);
    };

    const changeHandler = (event: any): void => {
        setFormInput({
            ...formInput,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Container>
            <Notify
                message={message}
                type={type}
                setShow={setShow}
                show={show}
            />
            <StyledPageName>{authFormName} Page</StyledPageName>
            <StyledForm
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
            >
                <Form.Group as={Row} controlId='formHorizontalEmail'>
                    <Form.Label column sm={2}>
                        Email
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Email'
                            name='email'
                            value={formInput.email}
                            onChange={changeHandler}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId='formHorizontalPassword'>
                    <Form.Label column sm={2}>
                        Password
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            required
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={formInput.password}
                            onChange={changeHandler}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                        {isLoading ? (
                            <Button variant='primary' disabled>
                                <Spinner
                                    as='span'
                                    animation='border'
                                    size='sm'
                                    role='status'
                                    aria-hidden='true'
                                />
                                <span className='sr-only'>Loading...</span>
                            </Button>
                        ) : (
                            <Button type='submit'>{authFormName}</Button>
                        )}
                    </Col>
                </Form.Group>
            </StyledForm>
        </Container>
    );
};

export default AuthForm;
