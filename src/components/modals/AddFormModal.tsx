import React, { useState } from 'react';
import { Button, Modal, Form, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

const AddFormModal = (props: any) => {
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [formInput, setFormInput] = useState({
        name: '',
        age: '',
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const changeHandler = (event: any): void => {
        setFormInput({
            ...formInput,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            return;
        } else {
            setValidated(true);
        }

        props.saveUser(formInput);
        setFormInput({
            name: '',
            age: '',
        });
        setValidated(false);
        handleClose();
    };

    return (
        <>
            <Button variant='success' onClick={handleShow}>
                Add New User
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>
                                Name
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder='Name'
                                    name='name'
                                    value={formInput.name}
                                    onChange={changeHandler}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>
                                Age
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder='Age'
                                    name='age'
                                    value={formInput.age}
                                    onChange={changeHandler}
                                />
                            </Col>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant='primary' type='submit'>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default AddFormModal;
