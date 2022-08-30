import { createSlice } from '@reduxjs/toolkit';
import { Paging, Role } from '@common/models/Interfaces';

export const rolesSlice = createSlice({
    name: 'roles',
    initialState: {
        loading: false,
        paging: {} as Paging<Role>,
        error: {}
    },
    reducers: {
        setPaging: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            return {
                ...state,
                // loading: false,
                paging: action.payload
            };
        },
        setUpdateRole: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            const records = (state.paging?.records || []).map((record) => {
                if (record.roleId === action.payload.roleId) {
                    return {
                        ...record,
                        ...action.payload
                    };
                }
                return record;
            });
            return {
                ...state,
                loading: false,
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
                paging: {},
                error: {}
            };
        }
    }
});

// Action creators are generated for each case reducer function
export const { setPaging, setLoading, setUpdateRole, setError, setClear } =
    rolesSlice.actions;

export default rolesSlice.reducer;
