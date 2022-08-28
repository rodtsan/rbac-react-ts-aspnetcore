import { createAction } from '@reduxjs/toolkit';
import types from './types';

import { setData, setLoading, setError } from './reducer';

const fetchWeatherForcast = createAction(types.FETCH_WEATHER_FORCAST_REQUEST);
const weatherForcastLoading = createAction<boolean>(types.WEATHER_FORCAST_LOADING);
const getWeatherForcastRecords = createAction<any>(types.SET_WEATHER_RECORDS);

export default {
    fetchWeatherForcast,
    weatherForcastLoading,
    getWeatherForcastRecords,
    setData,
    setLoading,
    setError
};
