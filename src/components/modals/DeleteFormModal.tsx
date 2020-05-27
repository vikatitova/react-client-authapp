import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const DeleteFormModal = (props: any) => {
    const { user, deleteUser, isModalOpen } = props;

    const handleClose = () =>
        props.dispatch({
            type: 'CLOSE_MODAL',
            modalType: 'DELETE',
        });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        deleteUser(user);
        handleClose();
    };

    console.log('DELETE');

    return (
        <>
            <Modal show={isModalOpen} onHide={handleClose}>
                <Form noValidate onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete {user.name}?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant='primary' type='submit'>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default DeleteFormModal;
