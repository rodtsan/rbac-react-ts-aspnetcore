import React, { lazy } from 'react';
import pick from 'lodash/pick';
import Login from '@pages/Account/Login';
import Register from '@pages/Account/Register';
import Roles from '@pages/Manage/Roles';
import Users from '@pages/Manage/Users';
import { RouteProps } from 'react-router-dom';
import ConfirmEmail from '@pages/Account/ConfirmEmail';
import SessionExpired from '@pages/Shared/SessionExpired';
import Profile from '@pages/Manage/Profile';
import Unauthorized from '@pages/Shared/Unauthorized';
import About from '@pages/About';
import Projects from '@pages/Projects';
import ResetPassword from '@src/pages/Account/ForgotPassword';
import ChangePassword from '@src/pages/Account/ResetPassword';

const Main = lazy(() => import('@pages/Main'));

export interface ExtendedRouteProps extends RouteProps {
    name: string;
    isPublic?: boolean;
    isAuthorize?: boolean;
}

const routes: ExtendedRouteProps[] = [
    {
        name: 'main',
        path: '/',
        index: true,
        element: <Main />,
        isPublic: true
    },
    {
        name: 'projects',
        path: '/projects',
        index: true,
        element: <Projects />,
        isPublic: true
    },
    {
        name: 'about',
        path: '/about',
        index: true,
        element: <About />,
        isPublic: true
    },
    {
        name: 'login',
        path: '/login',
        element: <Login />,
        isPublic: true
    },
    {
        name: 'reset-password',
        path: '/reset-password',
        element: <ResetPassword />,
        isPublic: true
    },
    {
        name: 'change-password',
        path: '/change-password',
        element: <ChangePassword />,
        isPublic: true
    },
    {
        name: 'register',
        path: '/register',
        element: <Register />,
        isPublic: true
    },
    {
        name: 'confirm-email',
        path: '/confirm-email',
        element: <ConfirmEmail />,
        isPublic: true
    },
    {
        name: 'session-expired',
        path: '/session-expired',
        element: <SessionExpired />,
        isPublic: true
    },
    {
        name: 'unauthorized',
        path: '/unauthorized',
        element: <Unauthorized />,
        isPublic: true
    },
    {
        name: 'profile',
        path: '/profile',
        element: <Profile />,
        isAuthorize: true
    },
    {
        name: 'roles',
        path: '/roles',
        element: <Roles />,
        isAuthorize: true
    },
    {
        name: 'users',
        path: '/users',
        element: <Users />,
        isAuthorize: true
    },
    {
        name: 'users',
        path: '/*',
        element: <Login />,
        isPublic: true
    }
];

export const routeLinks = pick(routes, ['name', 'path']);

export default routes;
