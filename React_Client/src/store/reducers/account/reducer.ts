import { saveAuthorizeState } from '@store/localStorage';
import { createSlice } from '@reduxjs/toolkit';
import { UserLogin } from '@src/common/models/Interfaces';

export const loginSlice = createSlice({
    name: 'account',
    initialState: {
        loading: false,
        isLoggedIn: false,
        isRegistered: false,
        isEmailConfirmed: false,
        isPasswordChanged: false,
        error: {},
        userLogin: {} as UserLogin
    },
    reducers: {
        setRegister: (state, action) => {
            return {
                ...state,
                isRegistered: true,
            };
        },
        setUser: (state, action) => {
            return {
                ...state,
                userLogin: action.payload
            };
        },
        setLoggedIn: (state, action) => {
            saveAuthorizeState(action.payload);
            return {
                ...state,
                isLoggedIn: true
            };
        },
        setEmailConfirmed: (state, action) => {
            return {
                ...state,
                isEmailConfirmed: true
            };
        },
        setPasswordChanged: (state, action) => {
            return {
                ...state,
                isPasswordChanged: true
            };
        },
        setRevoke: (state, action) => {
            return {
                ...state,
                isLoggedIn: false,
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
                error: action.payload
            };
        },
        setClear: () => {
            return {
                loading: false,
                isLoggedIn: false,
                isRegistered: false,
                isEmailConfirmed: false,
                isPasswordChanged: false,
                error: {},
                userLogin: {}
            };
        }
    }
});

// Action creators are generated for each case reducer function
export const {
    setRegister,
    setLoading,
    setError,
    setLoggedIn,
    setEmailConfirmed,
    setPasswordChanged,
    setRevoke,
    setUser,
    setClear
} = loginSlice.actions;

export default loginSlice.reducer;
