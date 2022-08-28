import { Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Epic, ofType, StateObservable } from 'redux-observable';
import { getUrl } from '@common/api';
import { axiosInstance } from '@common/epic-templates';
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
    setUserDetails
} from './actions';
import { Action, RootState } from '@common/models';
import { UserPayload, UserRolesPayload } from '@redux/payloads';

export const getUserInfoEpic: Epic = (
    action$: Observable<Action>,
    state$: StateObservable<RootState>,
    { get }
) =>
    action$.pipe(
        filter(getUserInfo.match),
        switchMap((action: Action<string>) => {
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
    action$: Observable<Action>,
    state$: StateObservable<RootState>,
    { get }
) =>
    action$.pipe(
        filter(getUsersPerPage.match),
        switchMap((action: Action) => {
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

export const getUserEpic: Epic = (
    action$: Observable<Action>,
    state$: StateObservable<RootState>,
    { all }
) =>
    action$.pipe(
        filter(getUserRoles.match),
        switchMap((action: Action<string>) => {
            const userInfoUrl = String(getUrl('profileBaseUrl', 'getUserInfo')).concat(
                action.payload
            );
            const userRolesUrl = String(getUrl('profileBaseUrl', 'getUserRoles')).concat(
                action.payload
            );
            var requestOne = axiosInstance.get(userInfoUrl);
            var requestTwo = axiosInstance.get(userRolesUrl);
            return all([requestOne, requestTwo], {
                delay: 500,
                startWith: setLoading,
                succeeded: setUserDetails,
                failed: setError,
                endWith: setLoading,
                cancel: action$.pipe(ofType(types.SET_USERS_CANCEL))
            });
        })
    );

export const getUserRolesEpic: Epic = (
    action$: Observable<Action>,
    state$: StateObservable<RootState>,
    { get }
) =>
    action$.pipe(
        filter(getUserRoles.match),
        switchMap((action: Action<string>) => {
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
    action$: Observable<Action>,
    state$: StateObservable<RootState>,
    { patch }
) =>
    action$.pipe(
        filter(addUserRoles.match),
        switchMap((action: Action<UserRolesPayload>) => {
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
    action$: Observable<Action>,
    state$: StateObservable<RootState>,
    { patch }
) =>
    action$.pipe(
        filter(updateUser.match),
        switchMap((action: Action<UserPayload>) => {
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
    action$: Observable<Action>,
    state$: StateObservable<RootState>,
    { del }
) =>
    action$.pipe(
        filter(deleteUser.match),
        switchMap((action: Action<string>) => {
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
