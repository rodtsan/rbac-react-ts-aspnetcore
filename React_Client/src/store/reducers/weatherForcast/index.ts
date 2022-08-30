import { Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Epic, StateObservable } from 'redux-observable';
import { getUrl } from '@src/common/APIs';
import { RootAction, RootState } from '@common/models/Interfaces';
import {
    fetchWeatherForcast,
    setError,
    setLoading,
    setData,
    cancelAction
} from './actions';

export const getWeatherForcastEpic: Epic = (
    action$: Observable<RootAction>,
    state$: StateObservable<RootState>,
    { get }
) =>
    action$.pipe(
        filter(fetchWeatherForcast.match),
        switchMap(() => {
            const url = getUrl('profileBaseUrl', 'weatherForcast');
            return get(
                url,
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
