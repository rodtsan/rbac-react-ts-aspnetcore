import { AnyAction } from '@reduxjs/toolkit';
import { Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Epic, ofType, StateObservable } from 'redux-observable';
import { getUrl } from '@common/api';
import { setError, setLoading, setData } from './reducer';
import { headerJson } from '@common/api/headers';
import { RootState } from '../localStorage';
import actions from './actions';
import types from './types';

export const getWeatherForcastEpic: Epic = (
    action$: Observable<AnyAction>,
    state$: StateObservable<RootState>,
    { get }
) =>
    action$.pipe(
        filter(actions.fetchWeatherForcast.match),
        switchMap((action) => {
            const url = getUrl('profileBaseUrl', 'weatherForcast');
            console.log(action.payload);
            return get(url, headerJson(), {
                delay: 1000,
                startWith: setLoading,
                succeeded: setData,
                failed: setError,
                endWith: setLoading,
                cancel: action$.pipe(ofType(types.SET_WEATHER_FORCAST_CANCEL))
            });
        })
    );
