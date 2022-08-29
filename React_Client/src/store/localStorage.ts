/**
 * Get the global state from session storage
 */
import { RootState, TokenResponse } from '@common/models/Interfaces';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import CryptoJS from 'crypto-js';
import { isEmpty } from 'lodash';

/* Initial state */
export const initialRootState: RootState = {
    users: {
        loading: false,
        paging: {},
        userRoles: [],
        error: {}
    },
    roles: {
        loading: false,
        paging: {},
        error: {} as Error
    },
    account: {
        loading: false,
        isLoggedIn: false,
        isRegistered: false,
        isEmailConfirmed: false,
        isPasswordChanged: false,
        error: {},
        userLogin: {}
    },
    profiles: {
        loading: false,
        error: {},
        profile: {}
    },
    weatherForcast: {
        loading: false,
        records: [],
        error: {}
    }
};

export const loadState = () => {
    try {
        const serializedState = sessionStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

/**
 * Save the global state to session storage
 * @param {string | object | number} state
 */
export const saveState = (state: RootState = initialRootState) => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem('state', serializedState);
    } catch (err) {
        return err;
    }
    return undefined;
};

/**
 * Reset global state and cookies
 */
export const clearState = () => {
    setCookie('access_token', '', 0);
    setCookie('refresh_token', '', 0);
    setCookie('user_id', '', 0);
    const serializedState = JSON.stringify(initialRootState);
    sessionStorage.setItem('state', serializedState);
};

/**
 * Get cookie value function
 * @param { string } name
 */
export const getCookie = (name: string) => {
    const cookieValue = `; ${document.cookie}`;
    const parts: any[] = cookieValue.split(`; ${name}=`);
    if (parts && parts.length > 1) {
        return parts.pop().split(';').shift();
    }
    return '';
};

/**
 * Save cookie value function
 * @param { string } name
 * @param { string } value
 * @param { number } days
 */
export const setCookie = (
    name: string,
    value: string | undefined = '',
    days: number = 0
) => {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + value + '; ' + expires + '; path=/';
};

/**
 * Remove cookie value function
 * @param { string } name
 */
export const removeCookie = (name: string) => setCookie(name);

export const saveAuthorizeState = (tokenResponse: TokenResponse) => {
    setCookie('access_token', tokenResponse.accessToken, 7);
    setCookie('refresh_token', tokenResponse.refreshToken, 7);
    setCookie('user_id', tokenResponse.userId, 7);
};

export const saveTokens = (tokenResponse: TokenResponse) => {
    setCookie('access_token', tokenResponse.accessToken, 7);
    setCookie('refresh_token', tokenResponse.refreshToken, 7);
};

export const getTokens = (): TokenResponse => ({
    accessToken: getCookie('access_token'),
    refreshToken: getCookie('refresh_token')
});

export const getAccessToken = () => getCookie('access_token');

export const getRefreshToken = () => getCookie('refresh_token');

export const getUserId = (): string => getCookie('user_id');

export const isAuthenticated = (): boolean =>
    !isEmpty(getAccessToken()) && !isEmpty(getUserId());

export const isExpired = (): boolean => {
    const token = getAccessToken();
    if (isEmpty(token)) {
        return true;
    }
    const jwt = jwtDecode<JwtPayload>(token);
    const currentTimestamp = new Date().getTime() / 1000;
    return Math.round(jwt.exp as number) < currentTimestamp;
};

export const encyptCookie = (value: string) => {
    const key = process.env.ENCRYPTION_SECRET_KEY || 'd3f@ultpK3Y!';
    return CryptoJS.AES.encrypt(value, key);
};

export const decryptCookie = (value: string) => {
    const key = process.env.ENCRYPTION_SECRET_KEY || 'd3f@ultpK3Y!';
    const bytes = CryptoJS.AES.decrypt(value, key);
    return bytes.toString(CryptoJS.enc.Utf8);
};
