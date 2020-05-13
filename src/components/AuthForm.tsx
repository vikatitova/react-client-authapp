import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { loginCustomer } from '../controllers/login.controller';
import { signupCustomer } from '../controllers/signup.controller';
import { AuthFormMapping } from '../shared/constants';
import { AuthPageName } from '../shared/interfaces';
import { Notify } from './Notify';
import { useNotify } from '../hooks/notify.hook';

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
        } else {
            setValidated(true);
        }

        const { email, password } = formInput;

        if (AuthPageName.LOGIN === authPathName) {
            try {
                const message = await loginCustomer(email, password);
                addNotification(message, 'info');
                setShow(true);
            } catch (err) {
                const { message } = err;
                addNotification(message, 'error');
                setShow(true);
            }
        } else {
            try {
                const message = await signupCustomer(email, password);
                addNotification(message, 'info');
                setShow(true);
            } catch (err) {
                const { message } = err;
                addNotification(message, 'error');
                setShow(true);
            }
        }
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
                        <Button type='submit'>{authFormName}</Button>
                    </Col>
                </Form.Group>
            </StyledForm>
        </Container>
    );
};

export default AuthForm;
