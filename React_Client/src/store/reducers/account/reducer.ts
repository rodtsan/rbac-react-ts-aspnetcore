import { saveAuthorizeState } from '@store/localStorage';
import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'account',
    initialState: {
        loading: false,
        isLoggedIn: false,
        isRegistered: false,
        isPasswordReset: false,
        error: {},
        userLogin: {}
    },
    reducers: {
        setRegister: (state, action) => {
            return {
                ...state,
                isRegistered: true,
                register: action.payload
            };
        },
        setUserInfo: (state, action) => {
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
        setRevoke: (state, action) => {
            return {
                ...state,
                isLoggedIn: false
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
                loggedIn: false,
                isRegistered: false,
                isPasswordReset: false,
                error: {},
                register: {},
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
    setRevoke,
    setUserInfo,
    setClear
} = loginSlice.actions;

export default loginSlice.reducer;
