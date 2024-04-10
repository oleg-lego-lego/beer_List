import React, {useEffect} from 'react';
import './App.css';
import {AxiosError} from "axios";
import {useAppDispatch} from "./app/hooks/redux";
import {getBeerStore} from "./app/reducer/beerStore-reducer";
import {HeaderBar} from "./components/HeaderBar";
import {TablePage} from "./components/TablePage";
import {FooterSite} from "./components/FooterSite";
import {beerShopAPI} from "./api/api-beerShop";
import {ErrorSnackbar} from "./components/ErrorSnackbar";
import {setError} from "./app/reducer/error-reducer";


function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        beerShopAPI.getBeerAll()
            .then(res => {
                dispatch(getBeerStore(res.data));
            })
            .catch((err: AxiosError) => {
                dispatch(setError(err.message))
            })
    }, [dispatch])

    return (
        <>
            <HeaderBar/>
            <TablePage/>
            <FooterSite/>
            <ErrorSnackbar/>
        </>
    );
}

export default App;
