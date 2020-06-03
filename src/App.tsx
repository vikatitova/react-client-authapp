import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './routes';
import styled from 'styled-components';
import { useUsers } from './hooks/users.hook';

const Wrapper = styled.div`
    padding-top: 70px;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const App = () => {
    const { token, login, logout, email, avatarSrc, setAvatar } = useAuth();
    const { users, addUsers, deleteUser, editUser, clearUsers } = useUsers();
    const isAuthenticated: boolean = !!token;
    const routes = useRoutes(isAuthenticated);

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
                email,
                isAuthenticated,
                avatarSrc,
                setAvatar,
                users,
                addUsers,
                deleteUser,
                editUser,
                clearUsers,
            }}
        >
            <Router>
                <Header />
                <Wrapper>{routes}</Wrapper>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
