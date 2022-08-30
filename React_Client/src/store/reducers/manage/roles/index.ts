/* Roles Epic API calls */
import { Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { StateObservable } from 'redux-observable';
import { getUrl } from '@src/common/APIs';
import { RootAction, RootState } from '@common/models/Interfaces';
import {
    getRolesPerPage,
    setLoading,
    setPaging,
    setUpdateRole,
    setError,
    updateRole,
    cancelAction
} from './actions';

export const getRolesPerPageEpic: Epic = (
    action$: Observable<RootAction>,
    state$: StateObservable<RootState>,
    { get }
) =>
    action$.pipe(
        filter(getRolesPerPage.match),
        switchMap(({ payload }) => {
            const url = getUrl('profileBaseUrl', 'getRolesPerPage');
            return get(url, payload, {
                delay: 1000,
                startWith: setLoading,
                succeeded: setPaging,
                failed: setError,
                endWith: setLoading,
                cancel: action$.pipe(filter(cancelAction.match))
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
        switchMap(({ payload }) => {
            const url = String(getUrl('profileBaseUrl', 'updateRole')).concat(
                payload.roleId
            );
            return patch(
                url,
                payload,
                {},
                {
                    startWith: setLoading,
                    succeeded: setUpdateRole,
                    failed: setError,
                    endWith: setLoading,
                    cancel: action$.pipe(filter(cancelAction.match))
                }
            );
        })
    );
