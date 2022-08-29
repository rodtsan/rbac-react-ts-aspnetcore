import { createAction } from '@reduxjs/toolkit';
import { Role, Paging } from '@common/models/Interfaces';
export * from './reducer';

export const getRolesPerPage = createAction<Paging>('roles/getRolesPerPage');
export const updateRole = createAction<Role>('roles/updateRole');
export const cancelAction = createAction<string>('roles/cancelAction');
