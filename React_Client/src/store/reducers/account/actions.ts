import { createAction } from '@reduxjs/toolkit';
import { RefreshToken, Register, Login } from '@store/reducers/payloads';
export * from './reducer';

export const types = {
    USER_LOGIN: 'account/user_login',
    CANCEL_OPERATION: 'account/cancel_operation',
    GET_USER_INFO: 'account/get_user_info',
    REGISTER: 'account/register',
    REVOKE: 'account/revoke',
    REFRESH_TOKEN: 'account/refresh_token'
};

export const userLogin = createAction<Login>(types.USER_LOGIN);
export const refreshToken = createAction<RefreshToken>(types.REFRESH_TOKEN);
export const register = createAction<Register>(types.REGISTER);
export const getUserInfo = createAction<string>(types.GET_USER_INFO);
export const revoke = createAction<string>(types.REVOKE);
export const setCancel = createAction<string>(types.CANCEL_OPERATION);
