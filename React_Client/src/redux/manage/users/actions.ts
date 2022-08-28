import { createAction } from '@reduxjs/toolkit';
import { Paging, UserRolesPayload, UserPayload } from '@redux/payloads';
export * from './reducer';

export const types = {
    GET_USERS_PER_PAGE: 'users/get_user_per_page',
    GET_USER_INFO: 'users/get_user_info',
    UPDATE_USER: 'users/update_user',
    DELETE_USER: 'users/delete_user',
    GET_USER_ROLES: 'users/get_user_roles',
    ADD_USER_ROLES: 'users/add_user_roles',
    SET_USERS_CANCEL: 'users/set_user_cancel'
};

export const getUserInfo = createAction<string>(types.GET_USER_INFO);
export const getUsersPerPage = createAction<Paging>(types.GET_USERS_PER_PAGE);
export const getUserRoles = createAction<string>(types.GET_USER_ROLES);
export const addUserRoles = createAction<UserRolesPayload>(types.ADD_USER_ROLES);
export const updateUser = createAction<UserPayload>(types.UPDATE_USER);
export const deleteUser = createAction<string>(types.DELETE_USER);
