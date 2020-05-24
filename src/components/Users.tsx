import React, { useState, useContext, useEffect } from 'react';
import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useNotify } from '../hooks/notify.hook';
import AddFormModal from './modals/AddFormModal';
import DeleteFormModal from './modals/DeleteFormModal';
import { ISaveUserResponse } from '../shared/interfaces/common';
import { Notify } from './Notify';
import { useUsers } from '../hooks/users.hook';
import { AuthContext } from '../context/AuthContext';
import {
    saveUserController,
    getUsersController,
} from '../controllers/users.controller';

const TableWrapper: any = styled.div`
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
`;
const TableTitle: any = styled.div`
    padding-bottom: 15px;
    background: #435d7d;
    color: #fff;
    padding: 16px 30px;
    border-radius: 3px 3px 0 0;
`;
const TableTitleH2: any = styled.h2`
    margin: 5px 0 0;
    font-size: 24px;
`;
const ModalWrapper: any = styled.div`
    & button:first-child {
        margin-right: 20px;
    }
`;
const ActionsWrapper: any = styled.div`
    display: flex;
    width: 50%;
    justify-content: space-around;
`;

const Users = () => {
    const { message, type, addNotification, show, setShow } = useNotify();
    const { users, addUsers } = useContext(AuthContext);

    const TableHeader = () => {
        const HEADERS: string[] = ['User ID', 'User Name', 'Age', 'Actions'];
        const headerList = HEADERS.map((header) => (
            <th key={uuidv4()}>{header}</th>
        ));
        return (
            <thead>
                <tr>{headerList}</tr>
            </thead>
        );
    };

    const TableBody = () => {
        const bodyList = users.map((user) => (
            <tr key={uuidv4()}>
                <td key={uuidv4()}>{user.id}</td>
                <td key={uuidv4()}>{user.name}</td>
                <td key={uuidv4()}>{user.age}</td>
                <td key={uuidv4()}>
                    {
                        <ActionsWrapper>
                            <Button variant='outline-info'>edit</Button>
                            <Button variant='outline-danger'>delete</Button>
                        </ActionsWrapper>
                    }
                </td>
            </tr>
        ));
        return <tbody>{bodyList}</tbody>;
    };

    const saveUser = async (formInput: {
        name: string;
        age: string;
    }): Promise<void> => {
        const { name, age } = formInput;
        try {
            const data: ISaveUserResponse[] = await saveUserController(
                name,
                age
            );
            addUsers(data);
            addNotification(`User ${name} was successfully created`, 'info');
        } catch (err) {
            addNotification(err.message, 'error');
        }
    };

    const getUsers = async (): Promise<void> => {
        try {
            const data: ISaveUserResponse[] = await getUsersController();
            addUsers(data);
        } catch (err) {
            addNotification(err.message, 'error');
        }
    };

    useEffect(() => {
        if (!users.length) {
            getUsers();
        }
    }, []);

    return (
        <Container>
            {show && <Notify message={message} type={type} setShow={setShow} />}
            <TableWrapper>
                <TableTitle>
                    <Row>
                        <Col sm={4}>
                            <TableTitleH2>
                                Manage <b>Users</b>
                            </TableTitleH2>
                        </Col>
                        <Col sm={8} className='d-flex justify-content-end'>
                            <ModalWrapper>
                                <AddFormModal saveUser={saveUser} />
                                <DeleteFormModal />
                            </ModalWrapper>
                        </Col>
                    </Row>
                </TableTitle>
            </TableWrapper>
            <Table striped bordered hover>
                <TableHeader />
                <TableBody />
            </Table>
        </Container>
    );
};

export default Users;
