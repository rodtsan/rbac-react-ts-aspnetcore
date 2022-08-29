/* Roles Epic API calls */
import { Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
import { StateObservable } from 'redux-observable';
import { getUrl } from '@common/api';
import { RootAction, RootState } from '@common/models/Interfaces';
import {
    getRolesPerPage,
    setLoading,
    setPaging,
    setUpdateRole,
    setError,
    types,
    updateRole
} from './actions';

export const getRolesPerPageEpic: Epic = (
    action$: Observable<RootAction>,
    state$: StateObservable<RootState>,
    { get }
) =>
    action$.pipe(
        filter(getRolesPerPage.match),
        switchMap((action) => {
            const url = getUrl('profileBaseUrl', 'getRolesPerPage');
            return get(url, action.payload, {
                delay: 1000,
                startWith: setLoading,
                succeeded: setPaging,
                failed: setError,
                endWith: setLoading,
                cancel: action$.pipe(ofType(types.SET_ROLES_CANCEL))
            });
        })
    );

export const updateRoleEpic: Epic = (
    action$: Observable<RootAction>,
    state$: StateObservable<RootState>,
    { patch }
) =>
    action$.pipe(
        filter(updateRole.match),
        switchMap((action) => {
            const url = String(getUrl('profileBaseUrl', 'updateRole')).concat(
                action.payload.roleId
            );
            return patch(
                url,
                action.payload,
                {},
                {
                    startWith: setLoading,
                    succeeded: setUpdateRole,
                    failed: setError,
                    endWith: setLoading,
                    cancel: action$.pipe(ofType(types.SET_ROLES_CANCEL))
                }
            );
        })
    );
