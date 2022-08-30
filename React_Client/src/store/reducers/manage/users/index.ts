import { Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Epic, StateObservable } from 'redux-observable';
import { getUrl } from '@src/common/APIs';
import { RootAction, RootState } from '@common/models/Interfaces';
import {
    getUsersPerPage,
    getUserInfo,
    getUserRoles,
    addUserRoles,
    setUpdateUser,
    setError,
    setLoading,
    setPaging,
    updateUser,
    deleteUser,
    setUserRoles,
    setDeleteUser,
    cancelAction
} from './actions';

export const getUserInfoEpic: Epic = (
    action$: Observable<RootAction>,
    state$: StateObservable<RootState>,
    { get }
) =>
    action$.pipe(
        filter(getUserInfo.match),
        switchMap(({ payload }) => {
            const url = String(getUrl('profileBaseUrl', 'getUserInfo')).concat(payload);
            return get(
                url,
                {},
                {
                    delay: 1000,
                    startWith: setLoading,
                    succeeded: setPaging,
                    failed: setError,
                    endWith: setLoading,
                    cancel: action$.pipe(filter(cancelAction.match))
                }
            );
        })
    );

export const getUsersPerPageEpic: Epic = (
    action$: Observable<RootAction>,
    state$: StateObservable<RootState>,
    { get }
) =>
    action$.pipe(
        filter(getUsersPerPage.match),
        switchMap(({ payload }) => {
            const url = getUrl('profileBaseUrl', 'getUsersPerPage');
            return get(url, payload, {
                delay: 500,
                startWith: setLoading,
                succeeded: setPaging,
                failed: setError,
                endWith: setLoading,
                cancel: action$.pipe(filter(cancelAction.match))
            });
        })
    );

export const getUserRolesEpic: Epic = (
    action$: Observable<RootAction>,
    state$: StateObservable<RootState>,
    { get }
) =>
    action$.pipe(
        filter(getUserRoles.match),
        switchMap(({ payload }) => {
            const url = String(getUrl('profileBaseUrl', 'getUserRoles')).concat(payload);
            return get(
                url,
                {},
                {
                    startWith: setLoading,
                    succeeded: setUserRoles,
                    failed: setError,
                    endWith: setLoading,
                    cancel: action$.pipe(filter(cancelAction.match))
                }
            );
        })
    );

export const addUserRolesEpic: Epic = (
    action$: Observable<RootAction>,
    state$: StateObservable<RootState>,
    { patch }
) =>
    action$.pipe(
        filter(addUserRoles.match),
        switchMap(({ payload }) => {
            const url = String(getUrl('profileBaseUrl', 'addUserRoles')).concat(
                payload.userId
            );
            return patch(
                url,
                payload,
                {},
                {
                    delay: 1000,
                    startWith: setLoading,
                    succeeded: setUpdateUser,
                    failed: setError,
                    endWith: setLoading,
                    cancel: action$.pipe(filter(cancelAction.match))
                }
            );
        })
    );

export const updateUserEpic: Epic = (
    action$: Observable<RootAction>,
    state$: StateObservable<RootState>,
    { patch }
) =>
    action$.pipe(
        filter(updateUser.match),
        switchMap(({ payload }) => {
            const url = String(getUrl('profileBaseUrl', 'updateUser')).concat(
                payload.userId
            );
            return patch(
                url,
                payload,
                {},
                {
                    delay: 1000,
                    startWith: setLoading,
                    succeeded: setUpdateUser,
                    failed: setError,
                    endWith: setLoading,
                    cancel: action$.pipe(filter(cancelAction.match))
                }
            );
        })
    );

export const deleteUserEpic: Epic = (
    action$: Observable<RootAction>,
    state$: StateObservable<RootState>,
    { del }
) =>
    action$.pipe(
        filter(deleteUser.match),
        switchMap(({ payload }) => {
            const url = String(getUrl('profileBaseUrl', 'deleteUser')).concat(payload);
            return del(url, {
                delay: 1000,
                startWith: setLoading,
                succeeded: setDeleteUser,
                failed: setError,
                endWith: setLoading,
                cancel: action$.pipe(filter(cancelAction.match))
            });
        })
    );
