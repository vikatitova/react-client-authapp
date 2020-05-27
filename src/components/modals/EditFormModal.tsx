import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

const EditFormModal = (props: any) => {
    const { user, editUser, isModalOpen } = props;
    const [validated, setValidated] = useState(false);
    const [formInput, setFormInput] = useState(user);

    const handleClose = () =>
        props.dispatch({
            type: 'CLOSE_MODAL',
            modalType: 'EDIT',
        });

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

        editUser(formInput);
        setFormInput({
            name: '',
            age: '',
        });
        setValidated(false);
        handleClose();
    };

    console.log('EDIT');

    return (
        <>
            <Modal show={isModalOpen} onHide={handleClose}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User {user.name}</Modal.Title>
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

export default EditFormModal;
