import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import some from 'lodash/some';
import { isAuthenticated } from '@store/localStorage';
import { UserLogin } from '@common/models/Interfaces';
import '@common/utils/extensions';

export interface HeaderProps {
    onLogout: () => void;
    userLogin: UserLogin;
}

const Header: React.FunctionComponent<HeaderProps> = ({ onLogout, userLogin }) => {
    const userProfile = isAuthenticated() ? userLogin : ({} as UserLogin);
    const hasProfile = some(userProfile);
    const userRoles = userProfile?.roles as string[];
    return (
        <div className="rs-layout-header">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img className="logo" alt="" src="/rs-logo.png" />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link
                                    className={classNames('nav-link', {
                                        active: location.pathname === '/'
                                    })}
                                    to="/"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={classNames('nav-link', {
                                        active: location.pathname === '/projects'
                                    })}
                                    to="/projects"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={classNames('nav-link', {
                                        active: location.pathname === '/about'
                                    })}
                                    to="/about"
                                >
                                    About
                                </Link>
                            </li>
                            {hasProfile && userRoles.includes('administrator') && (
                                <li className="nav-item dropdown">
                                    <a
                                        id="navbarLeftDropdown"
                                        className="nav-link dropdown-toggle text-white"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        role="button"
                                    >
                                        Manage
                                    </a>
                                    <ul
                                        className="dropdown-menu bg-dark my-2"
                                        aria-labelledby="navbarLeftDropdown"
                                    >
                                        <li className="nav-item">
                                            <ul className="list-unstyled">
                                                <li className="nav-item">
                                                    <Link
                                                        className="nav-link  px-3"
                                                        to="/roles"
                                                    >
                                                        <span>Roles</span>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link
                                                        className="nav-link  px-3"
                                                        to="/users"
                                                    >
                                                        <span>Users</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            )}
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {!isAuthenticated() && (
                                <>
                                    <li className="nav-item px-3">
                                        <Link
                                            className={classNames('nav-link', {
                                                active: location.pathname === '/register'
                                            })}
                                            to="/register"
                                        >
                                            Register
                                        </Link>
                                    </li>
                                    <li className="nav-item px-3">
                                        <Link
                                            className={classNames('nav-link', {
                                                active: location.pathname === '/login'
                                            })}
                                            to="/login"
                                        >
                                            Login
                                        </Link>
                                    </li>
                                </>
                            )}
                            {hasProfile && (
                                <li className="nav-item dropdown">
                                    <div
                                        id="navbarRightDropdown"
                                        className="dropdown-toggle text-white"
                                        data-bs-display="static"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        role="button"
                                    >
                                        {userProfile?.firstName} {userProfile?.lastName}
                                    </div>
                                    <ul
                                        className="dropdown-menu dropdown-menu-end bg-dark my-2"
                                        aria-labelledby="navbarRightDropdown"
                                    >
                                        <li className="nav-item">
                                            <Link
                                                className="nav-link fw-bold"
                                                to="/profile"
                                            >
                                                <span>My Profile</span>
                                            </Link>
                                        </li>
                                        {userProfile && (
                                            <li className="nav-item">
                                                <a
                                                    href=""
                                                    className="nav-link"
                                                    onClick={onLogout}
                                                >
                                                    Logout
                                                </a>
                                            </li>
                                        )}
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
