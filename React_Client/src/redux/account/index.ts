import { Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Epic, ofType, StateObservable } from 'redux-observable';
import { getUrl } from '@common/api';
import {
    types,
    userLogin,
    register,
    setError,
    setLoading,
    setRegister,
    setLoggedIn,
    setRevoke,
    revoke,
    getUserInfo,
    setUserInfo
} from './actions';
import { Action, RootState } from '@common/models';
import _ from 'lodash';

export const loginEpic: Epic = (
    action$: Observable<Action>,
    state$: StateObservable<RootState>,
    { post }
) =>
    action$.pipe(
        filter(userLogin.match),
        switchMap((action) => {
            const url = getUrl('profileBaseUrl', 'signIn');
            return post(
                url,
                action.payload,
                {},
                {
                    startWith: setLoading,
                    succeeded: setLoggedIn,
                    failed: setError,
                    endWith: setLoading,
                    cancel: action$.pipe(ofType(types.CANCEL_OPERATION))
                }
            );
        })
    );

export const revokeEpic: Epic = (
    action$: Observable<Action>,
    state$: StateObservable<RootState>,
    { post }
) =>
    action$.pipe(
        filter(revoke.match),
        switchMap(() => {
            const url = getUrl('profileBaseUrl', 'revoke');
            return post(
                url,
                {},
                {},
                {
                    startWith: setLoading,
                    succeeded: setRevoke,
                    failed: setError,
                    endWith: (loading: boolean) => {
                        setLoading(loading);
                        window.location.href = '/login';
                    },
                    cancel: action$.pipe(ofType(types.CANCEL_OPERATION))
                }
            );
        }),
        // ignoreElements()
    );

export const registerEpic: Epic = (
    action$: Observable<Action>,
    state$: StateObservable<RootState>,
    { post }
) =>
    action$.pipe(
        filter(register.match),
        switchMap((action) => {
            const url = getUrl('profileBaseUrl', 'signUp');
            return post(
                url,
                action.payload,
                {},
                {
                    delay: 1000,
                    startWith: setLoading,
                    succeeded: setRegister,
                    failed: setError,
                    endWith: setLoading,
                    cancel: action$.pipe(ofType(types.CANCEL_OPERATION))
                }
            );
        })
    );

export const getUserInfoEpic: Epic = (
    action$: Observable<Action>,
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
                    startWith: setLoading,
                    succeeded: setUserInfo,
                    failed: setError,
                    endWith: setLoading,
                    cancel: action$.pipe(ofType(types.CANCEL_OPERATION))
                }
            );
        })
    );
