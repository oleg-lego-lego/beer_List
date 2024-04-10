import {configureStore} from "@reduxjs/toolkit";
import beerStoreReducer from "./reducer/beerStore-reducer";
import errorReducer from "./reducer/error-reducer";

export const store = configureStore({
    reducer: {
        beerStore: beerStoreReducer,
        error: errorReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch