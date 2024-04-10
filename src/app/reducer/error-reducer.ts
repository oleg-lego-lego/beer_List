import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface BeerStoreStateType {
    error: null | string
}

const initialState: BeerStoreStateType = {
    error: null,
}

export const ErrorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<null | string>) => {
            state.error = action.payload
        }
    },
})


export const {setError} = ErrorSlice.actions

export default ErrorSlice.reducer