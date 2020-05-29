import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import DeleteFormModalContainer from '../containers/DeleteFormModalContainer';
import EditFormModalContainer from '../containers/EditFormModalContainer';
import { AuthContext } from '../context/AuthContext';
import {
    deleteUserController,
    getUserController,
    getUsersController,
    saveUserController,
    editUserController,
} from '../controllers/users.controller';
import { useNotify } from '../hooks/notify.hook';
import { IUser } from '../shared/interfaces/common';
import AddFormModal from './modals/AddFormModal';
import { Notify } from './Notify';

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

const Users = (props: any) => {
    const {
        modal: { isModalOpen, modalType },
        openModal,
    } = props;
    const { message, type, addNotification, show, setShow } = useNotify();
    const [selectedUser, setSelectedUser] = useState({});
    const [editableUser, setEditabledUser] = useState({});
    const authContext = useContext(AuthContext);

    const TableHeader = () => {
        const HEADERS: string[] = ['User ID', 'User Name', 'Age', 'Actions'];
        const headerList = HEADERS.map((header, i) => (
            <th key={i}>{header}</th>
        ));
        return (
            <thead>
                <tr>{headerList}</tr>
            </thead>
        );
    };

    const TableBody = () => {
        const bodyList = authContext.users.map((user) => (
            <tr key={uuidv4()}>
                <td key={uuidv4()}>{user.id}</td>
                <td key={uuidv4()}>{user.name}</td>
                <td key={uuidv4()}>{user.age}</td>
                <td key={uuidv4()}>
                    {
                        <ActionsWrapper>
                            <Button
                                variant='outline-info'
                                onClick={() => {
                                    handleEditUser(user);
                                }}
                            >
                                edit
                            </Button>
                            <Button
                                variant='outline-danger'
                                onClick={() => {
                                    openModal('DELETE');
                                    setSelectedUser(user);
                                }}
                            >
                                delete
                            </Button>
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
            const data: IUser[] = await saveUserController(name, age);
            authContext.addUsers(data);
            addNotification(`User ${name} was successfully created`, 'info');
        } catch (err) {
            addNotification(err.message, 'error');
        }
    };

    const getUsers = async (): Promise<void> => {
        try {
            const data: IUser[] = await getUsersController();
            authContext.addUsers(data);
        } catch (err) {
            addNotification(err.message, 'error');
        }
    };

    const getUser = async (user: IUser): Promise<void> => {
        try {
            const data: IUser = await getUserController(user);
            setEditabledUser(data);
        } catch (err) {
            addNotification(err.message, 'error');
        }
    };

    const deleteUser = async (user: IUser): Promise<void> => {
        try {
            const { name } = user;
            const data: IUser = await deleteUserController(user);
            authContext.deleteUser(data);
            addNotification(`User ${name} was successfully removed`, 'info');
        } catch (err) {
            addNotification(err.message, 'error');
        }
    };

    const editUser = async (user: IUser): Promise<void> => {
        try {
            const { name } = user;
            const data: IUser = await editUserController(user);
            authContext.editUser(data);
            addNotification(`User ${name} was successfully changed`, 'info');
        } catch (err) {
            addNotification(err.message, 'error');
        }
    };

    const handleEditUser = async (user: IUser) => {
        await getUser(user);
        openModal('EDIT');
    };

    useEffect(() => {
        if (!authContext.users.length) {
            getUsers();
        }
    }, []);

    return (
        <Container>
            {show && <Notify message={message} type={type} setShow={setShow} />}
            {isModalOpen && modalType === 'DELETE' && (
                <DeleteFormModalContainer
                    user={selectedUser}
                    deleteUser={deleteUser}
                />
            )}
            {isModalOpen && modalType === 'EDIT' && (
                <EditFormModalContainer
                    user={editableUser}
                    editUser={editUser}
                />
            )}
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
                                {/* <DeleteFormModal /> */}
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
