import { createAction } from '@reduxjs/toolkit';
import { ProfilePayload } from '@redux/payloads';
import { setData, setLoading, setError, setClear } from './reducer';

export const types = {
    GET_PROFILE: 'profiles/get_profile',
    UPDATE_PROFILE: 'profiles/update_profile',
    SET_PROFILE_CANCEL: 'profiles/set_profile_cancel'
};

const getProfile = createAction<string>(types.GET_PROFILE);
const updateProfile = createAction<ProfilePayload>(types.UPDATE_PROFILE);
const setCancel = createAction<string>(types.SET_PROFILE_CANCEL);

export { getProfile, updateProfile, setCancel, setData, setLoading, setError, setClear };
