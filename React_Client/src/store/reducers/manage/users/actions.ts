import { createAction } from '@reduxjs/toolkit';
import { User, UserRoles, Paging } from '@common/models/Interfaces';
export * from './reducer';

export const getUserInfo = createAction<string>('users/getUserInfo');
export const getUsersPerPage = createAction<Paging>('users/getUsersPerPage');
export const getUserRoles = createAction<string>('users/getUserRoles');
export const addUserRoles = createAction<UserRoles>('users/addUserRoles');
export const updateUser = createAction<User>('users/updateUser');
export const deleteUser = createAction<string>('users/deleteUser');
export const cancelAction = createAction<string>('users/cancelAction');
