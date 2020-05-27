import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Home from './components/Home';
import UsersContainer from './containers/UsersContainer';
import { IRouteProps } from './shared/interfaces/common';

const PrivateRoute = ({
    component: Component,
    isAuthenticated,
    ...rest
}: IRouteProps) => (
    <Route
        {...rest}
        render={(props) =>
            isAuthenticated ? <Component {...props} /> : <Redirect to='/' />
        }
    ></Route>
);

const PublicRoute = ({
    component: Component,
    isAuthenticated,
    ...rest
}: IRouteProps) => (
    <Route
        {...rest}
        render={(props) =>
            isAuthenticated ? <Redirect to='/' /> : <Component {...props} />
        }
    ></Route>
);

export const useRoutes = (isAuthenticated: boolean) => {
    return (
        <Switch>
            <Route component={Home} path='/' exact />

            <PublicRoute
                component={AuthForm}
                isAuthenticated={isAuthenticated}
                path='/signup'
                exact
            />

            <PublicRoute
                component={AuthForm}
                isAuthenticated={isAuthenticated}
                path='/login'
                exact
            />

            <PrivateRoute
                component={UsersContainer}
                isAuthenticated={isAuthenticated}
                path='/users'
                exact
            />

            <Redirect to='/' />
        </Switch>
    );
};
