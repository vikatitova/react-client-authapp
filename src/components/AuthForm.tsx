import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { loginCustomer } from '../controllers/login.controller';
import { signupCustomer } from '../controllers/signup.controller';
import { AuthFormMapping } from '../shared/constants';
import { AuthPageName } from '../shared/interfaces';

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
    const authFormName = AuthFormMapping[window.location.pathname];

    const [validated, setValidated] = useState(false);
    const [formInput, setFormInput] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        event.preventDefault();
        setValidated(true);

        const { email, password } = formInput;

        if (AuthPageName.LOGIN) {
            loginCustomer(email, password);
        } else {
            signupCustomer(email, password);
        }
    };

    const changeHandler = (event: any) => {
        setFormInput({
            ...formInput,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Container>
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
