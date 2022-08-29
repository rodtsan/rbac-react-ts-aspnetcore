import { createAction } from '@reduxjs/toolkit';
import { Profile } from '@store/reducers/payloads';
export * from './reducer';

export const types = {
    GET_PROFILE: 'profiles/get_profile',
    UPDATE_PROFILE: 'profiles/update_profile',
    SET_PROFILE_CANCEL: 'profiles/set_profile_cancel'
};

export const getProfile = createAction<string>(types.GET_PROFILE);
export const updateProfile = createAction<Profile>(types.UPDATE_PROFILE);
export const setCancel = createAction<string>(types.SET_PROFILE_CANCEL);
