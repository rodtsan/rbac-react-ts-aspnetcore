import { createAction } from '@reduxjs/toolkit';
export * from './reducer';

export const fetchWeatherForcast = createAction('weatherForcast/fetchWeatherForcast');
export const cancelAction = createAction<any>('weatherForcast/cancelAction');
