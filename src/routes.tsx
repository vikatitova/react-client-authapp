import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import AuthForm from './components/AuthForm';

export const useRoutes = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/' exact>
                    <Home />
                </Route>
                <Route path='/users' exact>
                    {/* <Users /> */}
                </Route>
                <Redirect to='/' />
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path='/' exact>
                <Home />
            </Route>
            <Route path='/signup' exact>
                <AuthForm />
            </Route>
            <Route path='/login' exact>
                <AuthForm />
            </Route>
            <Redirect to='/' />
        </Switch>
    );
};
