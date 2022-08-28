import { Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Epic, ofType, StateObservable } from 'redux-observable';
import { getUrl } from '@common/api';
import {
    getProfile,
    updateProfile,
    setError,
    setLoading,
    setData,
    types
} from './actions';
import { Action, RootState } from '@common/models';
import { ProfilePayload } from '@redux/payloads';

export const getProfileEpic: Epic = (
    action$: Observable<Action>,
    state$: StateObservable<RootState>,
    { get }
) =>
    action$.pipe(
        filter(getProfile.match),
        switchMap((action: Action<string>) => {
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
    action$: Observable<Action>,
    state$: StateObservable<RootState>,
    { patch }
) =>
    action$.pipe(
        filter(updateProfile.match),
        switchMap((action: Action<ProfilePayload>) => {
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
