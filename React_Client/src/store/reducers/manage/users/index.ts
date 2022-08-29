import { Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Epic, ofType, StateObservable } from 'redux-observable';
import { getUrl } from '@common/api';
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
    types,
    updateUser,
    deleteUser,
    setUserRoles,
    setDeleteUser,
} from './actions';

export const getUserInfoEpic: Epic = (
    action$: Observable<RootAction>,
    state$: StateObservable<RootState>,
    { get }
) =>
    action$.pipe(
        filter(getUserInfo.match),
        switchMap((action) => {
            const url = String(getUrl('profileBaseUrl', 'getUserInfo')).concat(
                action.payload
            );
            return get(
                url,
                {},
                {
                    delay: 1000,
                    startWith: setLoading,
                    succeeded: setPaging,
                    failed: setError,
                    endWith: setLoading,
                    cancel: action$.pipe(ofType(types.SET_USERS_CANCEL))
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
        switchMap((action) => {
            const url = getUrl('profileBaseUrl', 'getUsersPerPage');
            return get(url, action.payload, {
                delay: 500,
                startWith: setLoading,
                succeeded: setPaging,
                failed: setError,
                endWith: setLoading,
                cancel: action$.pipe(ofType(types.SET_USERS_CANCEL))
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
        switchMap((action) => {
            const url = String(getUrl('profileBaseUrl', 'getUserRoles')).concat(
                action.payload
            );
            return get(
                url,
                {},
                {
                    startWith: setLoading,
                    succeeded: setUserRoles,
                    failed: setError,
                    endWith: setLoading,
                    cancel: action$.pipe(ofType(types.SET_USERS_CANCEL))
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
        switchMap((action) => {
            const url = String(getUrl('profileBaseUrl', 'addUserRoles')).concat(
                action.payload.userId
            );
            return patch(
                url,
                action.payload,
                {},
                {
                    delay: 1000,
                    startWith: setLoading,
                    succeeded: setUpdateUser,
                    failed: setError,
                    endWith: setLoading,
                    cancel: action$.pipe(ofType(types.SET_USERS_CANCEL))
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
        switchMap((action) => {
            const url = String(getUrl('profileBaseUrl', 'updateUser')).concat(
                action.payload.userId
            );
            return patch(
                url,
                action.payload,
                {},
                {
                    delay: 1000,
                    startWith: setLoading,
                    succeeded: setUpdateUser,
                    failed: setError,
                    endWith: setLoading,
                    cancel: action$.pipe(ofType(types.SET_USERS_CANCEL))
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
        switchMap((action) => {
            const url = String(getUrl('profileBaseUrl', 'deleteUser')).concat(
                action.payload
            );
            return del(url, {
                delay: 1000,
                startWith: setLoading,
                succeeded: setDeleteUser,
                failed: setError,
                endWith: setLoading,
                cancel: action$.pipe(ofType(types.SET_USERS_CANCEL))
            });
        })
    );
