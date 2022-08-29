import { createAction } from '@reduxjs/toolkit';
import { Profile } from '@common/models/Interfaces';
export * from './reducer';

/** type: {reducer:profiles}/{name: get_profile) */
export const getProfile = createAction<string>('profiles/getProfile');
export const updateProfile = createAction<Profile>('profiles/updateProfile');
export const cancelAction = createAction<string>('profiles/cancelAction');
