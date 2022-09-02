import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Epic, StateObservable } from 'redux-observable';
import { getUrl } from '@src/common/APIs';
import { RootAction, RootState } from '@common/models/Interfaces';
import {
    userLogin,
    register,
    setError,
    setLoading,
    setRegister,
    setLoggedIn,
    setRevoke,
    revoke,
    getUser,
    setUser,
    cancelAction,
    confirmEmail,
    setEmailConfirmed,
    forgotPassword,
    resetPassword,
    setPasswordChanged
} from './actions';

export const loginEpic: Epic = (
    action$: Observable<RootAction>,
    state$: StateObservable<RootState>,
    { post }
): Observable<unknown> =>
    action$.pipe(
        filter(userLogin.match),
        switchMap(({ payload }) => {
            const url = getUrl('profileBaseUrl', 'signIn');
            return post(
                url,
                payload,
                {},
                {
                    startWith: setLoading,
                    succeeded: setLoggedIn,
                    failed: setError,
                    endWith: setLoading,
                    cancel: action$.pipe(filter(cancelAction.match))
                }
            );
        })
    );

export const revokeEpic: Epic = (
    action$: Observable<RootAction>,
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
                    endWith: setLoading,
                    cancel: action$.pipe(filter(cancelAction.match))
                }
            );
        })
    );

export const registerEpic: Epic = (
    action$: Observable<RootAction>,
    state$: StateObservable<RootState>,
    { post }
) =>
    action$.pipe(
        filter(register.match),
        switchMap(({ payload }) => {
            const url = getUrl('profileBaseUrl', 'signUp');
            return post(
                url,
                payload,
                {},
                {
                    delay: 1000,
                    startWith: setLoading,
                    succeeded: setRegister,
                    failed: setError,
                    endWith: setLoading,
                    cancel: action$.pipe(filter(cancelAction.match))
                }
            );
        })
    );

export const getUserEpic: Epic = (
    action$: Observable<RootAction>,
    state$: StateObservable<RootState>,
    { get }
) =>
    action$.pipe(
        filter(getUser.match),
        switchMap(({ payload }) => {
            const url = String(getUrl('profileBaseUrl', 'getUser')).concat(payload);
            return get(
                url,
                {},
                {
                    startWith: setLoading,
                    succeeded: setUser,
                    failed: setError,
                    endWith: setLoading,
                    cancel: action$.pipe(filter(cancelAction.match))
                }
            );
        })
    );

export const confirmEmailEpic: Epic = (
    action$: Observable<RootAction>,
    state$: StateObservable<RootState>,
    { get }
) =>
    action$.pipe(
        filter(confirmEmail.match),
        switchMap(({ payload }) => {
            const url = String(getUrl('profileBaseUrl', 'confirmEmail'));
            return get(url, payload, {
                startWith: setLoading,
                succeeded: setEmailConfirmed,
                failed: setError,
                endWith: setLoading,
                cancel: action$.pipe(filter(cancelAction.match))
            });
        })
    );

export const forgotPasswordEpic: Epic = (
    action$: Observable<RootAction>,
    state$: StateObservable<RootState>,
    { get }
) =>
    action$.pipe(
        filter(forgotPassword.match),
        switchMap(({ payload }) => {
            const url = String(getUrl('profileBaseUrl', 'forgotPassword'));
            return get(url, payload, {
                startWith: setLoading,
                succeeded: setEmailConfirmed,
                failed: setError,
                endWith: setLoading,
                cancel: action$.pipe(filter(cancelAction.match))
            });
        })
    );

export const resetPasswordEpic: Epic = (
    action$: Observable<RootAction>,
    state$: StateObservable<RootState>,
    { post }
) =>
    action$.pipe(
        filter(resetPassword.match),
        switchMap(({ payload }) => {
            const url = String(getUrl('profileBaseUrl', 'resetPassword'));
            return post(
                url,
                payload,
                {},
                {
                    startWith: setLoading,
                    succeeded: setPasswordChanged,
                    failed: setError,
                    endWith: setLoading,
                    cancel: action$.pipe(filter(cancelAction.match))
                }
            );
        })
    );
