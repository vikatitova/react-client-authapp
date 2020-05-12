import React, { Fragment } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import AuthForm from './components/AuthForm';
import { useAuth } from './hooks/auth.hook';

const PrivateRoute = (props: any) => {
    const { token } = useAuth();
    const isAuthenticated = !!token;

    return (
        <Fragment>
            {isAuthenticated ? props.children : <Redirect to='/' />}
        </Fragment>
    );
};

const PublicRoute = (props: any) => {
    const { token } = useAuth();
    const isAuthenticated = !!token;

    return (
        <Fragment>
            {isAuthenticated ? <Redirect to='/' /> : props.children}
        </Fragment>
    );
};

export const useRoutes = () => {
    return (
        <Switch>
            <PublicRoute>
                <Route component={Home} path='/' exact />
                <Route component={AuthForm} path='/signup' exact />
                <Route component={AuthForm} path='/login' exact />
            </PublicRoute>

            <PrivateRoute>
                {/* <Route component={Users} path='/users' exact /> */}
            </PrivateRoute>
        </Switch>
    );
};
