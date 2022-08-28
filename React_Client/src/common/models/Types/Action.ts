import { PayloadAction } from 'typesafe-actions';

export type Action<T = {}> = PayloadAction<string, T>;
