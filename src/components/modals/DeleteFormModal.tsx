import React, { useState } from 'react';
import { Button, Modal, Form, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

const DeleteFormModal = () => {
    const [show, setShow] = useState(false);
    const [formInput, setFormInput] = useState({
        name: '',
        age: '',
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant='danger' onClick={handleShow}>
                Delete All Users
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete all users?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={handleClose}>
                        Delete all
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteFormModal;
