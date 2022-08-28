import { createAction } from '@reduxjs/toolkit';
import { RefreshTokenPayload, RegisterPayload, LoginPayload } from '@redux/payloads';
export {
    setRegister,
    setLoading,
    setError,
    setLoggedIn,
    setRevoke,
    setUserInfo,
    setClear
} from './reducer';

export const types = {
    USER_LOGIN: 'account/user_login',
    CANCEL_OPERATION: 'account/cancel_operation',
    GET_USER_INFO: 'account/get_user_info',
    REGISTER: 'account/register',
    REVOKE: 'account/revoke',
    REFRESH_TOKEN: 'account/refresh_token'
};

export const userLogin = createAction<LoginPayload>(types.USER_LOGIN);
export const refreshToken = createAction<RefreshTokenPayload>(types.REFRESH_TOKEN);
export const register = createAction<RegisterPayload>(types.REGISTER);
export const getUserInfo = createAction<string>(types.GET_USER_INFO);
export const revoke = createAction<string>(types.REVOKE);
export const setCancel = createAction<string>(types.CANCEL_OPERATION);
