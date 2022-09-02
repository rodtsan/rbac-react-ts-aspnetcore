import { createAction } from '@reduxjs/toolkit';
import {
    Login,
    RefreshToken,
    Register,
    ConfirmEmail,
    ForgotPassword,
    ResetPassword
} from '@common/models/Interfaces';
export * from './reducer';

/** type: {reducer:account}/{name: user_login) */

export const userLogin = createAction<Login>('account/userLogin');
export const refreshToken = createAction<RefreshToken>('account/refreshToken');
export const register = createAction<Register>('account/register');
export const confirmEmail = createAction<ConfirmEmail>('account/confirmEmail');
export const forgotPassword = createAction<ForgotPassword>('account/forgotPassword');
export const resetPassword = createAction<ResetPassword>('account/resetPassword');
export const getUser = createAction<string>('account/getUser');
export const revoke = createAction('account/revoke');
export const cancelAction = createAction<string>('account/cancelAction');
