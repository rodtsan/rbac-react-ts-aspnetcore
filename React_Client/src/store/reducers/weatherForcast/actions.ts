import { createAction } from '@reduxjs/toolkit';
export * from './reducer';

export const types = {
    FETCH_WEATHER_FORCAST_REQUEST: 'FETCH_WEATHER_FORCAST_REQUEST',
    SET_WEATHER_FORCAST_CANCEL: 'SET_WEATHER_FORCAST_CANCEL',
    SET_WEATHER_RECORDS: 'SET_WEATHER_RECORDS',
    WEATHER_FORCAST_CANCEL_OPERATION: 'WEATHER_FORCAST_CANCEL_OPERATION',
    WEATHER_FORCAST_LOADING: 'WEATHER_FORCAST_LOADING'
};

export const fetchWeatherForcast = createAction(types.FETCH_WEATHER_FORCAST_REQUEST);
export const getWeatherForcastRecords = createAction<any>(types.SET_WEATHER_RECORDS);

