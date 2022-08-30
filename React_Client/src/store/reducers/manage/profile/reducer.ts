import { createSlice } from '@reduxjs/toolkit';
import { Profile } from '@src/common/models/Interfaces';

export const profileSlice = createSlice({
    name: 'profiles',
    initialState: {
        loading: false,
        error: {},
        profile: {} as Profile
    },
    reducers: {
        setData: (state, action) => {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    ...action.payload
                },
                loading: false
            };
        },
        setLoading: (state, action) => {
            return {
                ...state,
                loading: action.payload
            };
        },
        setError: (state, action) => {
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        },
        setClear: () => {
            return {
                loading: false,
                error: {},
                profile: {}
            };
        }
    }
});

export const { setData, setLoading, setError, setClear } = profileSlice.actions;

export default profileSlice.reducer;
