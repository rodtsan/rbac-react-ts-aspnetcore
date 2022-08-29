import { Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Epic, ofType, StateObservable } from 'redux-observable';
import { getUrl } from '@common/api';
import { RootAction, RootState } from '@common/models/Interfaces';
import { fetchWeatherForcast, setError, setLoading, setData, types } from './actions';

export const getWeatherForcastEpic: Epic = (
    action$: Observable<RootAction>,
    state$: StateObservable<RootState>,
    { get }
) =>
    action$.pipe(
        filter(fetchWeatherForcast.match),
        switchMap((action) => {
            const url = getUrl('profileBaseUrl', 'weatherForcast');
            console.log(action.payload);
            return get(
                url,
                {},
                {
                    delay: 1000,
                    startWith: setLoading,
                    succeeded: setData,
                    failed: setError,
                    endWith: setLoading,
                    cancel: action$.pipe(ofType(types.SET_WEATHER_FORCAST_CANCEL))
                }
            );
        })
    );
