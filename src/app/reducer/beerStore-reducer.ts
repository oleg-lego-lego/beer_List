import {createSlice} from "@reduxjs/toolkit";
import {v1} from "uuid";

export type BeerType = {
    key: string;
    alchool: string
    country: string
    description: string
    title: string
}

export interface BeerStoreStateType {
    items: BeerType[]
}

const initialState: BeerStoreStateType = {
    items: [],
}

export const BeerStoreSlice = createSlice({
    name: 'beerStore',
    initialState,
    reducers: {
        getBeerStore: (state, action) => {
            const newItems: BeerType[] = action.payload.map((item: BeerType) => ({...item, key: v1()}));

            state.items = state.items.concat(newItems);
        }
    },
})


export const {getBeerStore} = BeerStoreSlice.actions

export default BeerStoreSlice.reducer