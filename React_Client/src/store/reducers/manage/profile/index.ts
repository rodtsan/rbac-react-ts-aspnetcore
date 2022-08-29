import { Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Epic, ofType, StateObservable } from 'redux-observable';
import { getUrl } from '@common/api';
import { RootAction, RootState } from '@common/models/Interfaces';
import {
    getProfile,
    updateProfile,
    setError,
    setLoading,
    setData,
    types
} from './actions';


export const getProfileEpic: Epic = (
    action$: Observable<RootAction>,
    state$: StateObservable<RootState>,
    { get }
) =>
    action$.pipe(
        filter(getProfile.match),
        switchMap((action) => {
            const url = getUrl('profileBaseUrl', 'getProfile');
            return get(
                String(url).concat(action.payload),
                {},
                {
                    startWith: setLoading,
                    succeeded: setData,
                    failed: setError,
                    endWith: setLoading,
                    cancel: action$.pipe(ofType(types.SET_PROFILE_CANCEL))
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
        switchMap((action) => {
            const url = String(getUrl('profileBaseUrl', 'updateProfile')).concat(
                action.payload.profileId
            );
            return patch(url, action.payload, {}, {
                delay: 1000,
                startWith: setLoading,
                succeeded: setData,
                failed: setError,
                endWith: setLoading,
                cancel: action$.pipe(ofType(types.SET_PROFILE_CANCEL))
            });
        }),
    );
