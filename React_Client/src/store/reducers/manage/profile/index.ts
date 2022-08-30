import { Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Epic, StateObservable } from 'redux-observable';
import { getUrl } from '@src/common/APIs';
import { RootAction, RootState } from '@common/models/Interfaces';
import {
    getProfile,
    updateProfile,
    setError,
    setLoading,
    setData,
    cancelAction
} from './actions';

export const getProfileEpic: Epic = (
    action$: Observable<RootAction>,
    state$: StateObservable<RootState>,
    { get }
) =>
    action$.pipe(
        filter(getProfile.match),
        switchMap(({ payload }) => {
            const url = getUrl('profileBaseUrl', 'getProfile');
            return get(
                String(url).concat(payload),
                {},
                {
                    startWith: setLoading,
                    succeeded: setData,
                    failed: setError,
                    endWith: setLoading,
                    cancel: action$.pipe(filter(cancelAction.match))
                }
            );
        })
    );

export const updateProfileEpic: Epic = (
    action$: Observable<RootAction>,
    state$: StateObservable<RootState>,
    { patch }
) =>
    action$.pipe(
        filter(updateProfile.match),
        switchMap(({ payload }) => {
            const url = String(getUrl('profileBaseUrl', 'updateProfile')).concat(
                payload.profileId as string
            );
            return patch(
                url,
                payload,
                {},
                {
                    delay: 1000,
                    startWith: setLoading,
                    succeeded: setData,
                    failed: setError,
                    endWith: setLoading,
                    cancel: action$.pipe(filter(cancelAction.match))
                }
            );
        })
    );
