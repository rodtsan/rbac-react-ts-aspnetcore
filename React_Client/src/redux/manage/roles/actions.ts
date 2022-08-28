import { createAction } from '@reduxjs/toolkit';
import { Paging, RolePayload } from '@redux/payloads';
export { setPaging, setUpdateRole, setLoading, setError, setClear } from './reducer';

export const types = {
    GET_ROLES_PER_PAGE: 'roles/get_roles_per_page',
    UPDATE_ROLE_INFO: 'roles/update_role_info',
    SET_ROLES_CANCEL: 'roles/set_roles_cancel'
};

export const getRolesPerPage = createAction<Paging>(types.GET_ROLES_PER_PAGE);
export const updateRole = createAction<RolePayload>(types.UPDATE_ROLE_INFO);
