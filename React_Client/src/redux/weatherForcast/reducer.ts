import { createSlice } from '@reduxjs/toolkit';

export const weatherForcastSlice = createSlice({
    name: 'weatherForcast',
    initialState: {
        loading: false,
        records: [],
        error: {}
    },
    reducers: {
        setData: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            return {
                ...state,
                records: action.payload,
                loading: false
            };
        },
        setLoading: (state, action) => {
            console.log(action.payload);
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
        }
    }
});

// Action creators are generated for each case reducer function
export const { setData, setLoading, setError } = weatherForcastSlice.actions;

export type WeatherForcastState = ReturnType<typeof weatherForcastSlice.getInitialState>;

export default weatherForcastSlice.reducer;
