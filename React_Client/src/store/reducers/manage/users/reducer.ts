import { createSlice } from '@reduxjs/toolkit';
import { Paging, UserRole } from '@common/models/Interfaces';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        loading: false,
        paging: {} as Paging<{ userId: string }>,
        error: {},
        userRoles: [] as UserRole[]
    },
    reducers: {
        setPaging: (state, action) => {
            return {
                ...state,
                loading: false,
                paging: action.payload
            };
        },
        setUserDetails: (state, action) => {
            return {
                ...state,
                loading: false,
                userRoles: action.payload
            };
        },
        setUserRoles: (state, action) => {
            return {
                ...state,
                loading: false,
                userRoles: action.payload
            };
        },
        setUpdateUser: (state, action) => {
            const records = (state.paging?.records || []).map((record) => {
                if (record.userId === action.payload.userId) {
                    return {
                        ...record,
                        ...action.payload
                    };
                }
                return record;
            });
            return {
                ...state,
                paging: {
                    ...state.paging,
                    records
                }
            };
        },
        setDeleteUser: (state, action) => {
            const records = (state.paging.records || []).filter(
                (record) => record.userId !== action.payload.userId
            );
            return {
                ...state,
                paging: {
                    ...state.paging,
                    records
                }
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
                loading: false,
                error: action.payload
            };
        },
        setClear: () => {
            return {
                loading: false,
                paging: {} as Paging<{ userId: string }>,
                error: {},
                userRoles: []
            };
        }
    }
});

export const {
    setPaging,
    setLoading,
    setUserRoles,
    setDeleteUser,
    setError,
    setUpdateUser,
    setUserDetails,
    setClear
} = usersSlice.actions;

export default usersSlice.reducer;
