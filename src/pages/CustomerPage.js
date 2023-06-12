import React from 'react';
import {Route, Routes} from "react-router-dom";
import MainPage from "./MainPage";
import MenuDetailPage from "./MenuDetailPage";
import OrderListPage from "./OrderListPage";
import Header from "../components/Header";
import Token from "../components/Token";
import LogPage from "./LogPage";

const CustomerPage = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path={"/"} element={<MainPage />}></Route>
                <Route path={"/token/*"} element={<Token />}></Route>
                <Route path={"/detail/:shopId/:itemId"} element={<MenuDetailPage />}></Route>
                <Route path={"/cart"} element={<OrderListPage />}></Route>
                <Route path={"/log"} element={<LogPage />}></Route>
            </Routes>
        </>
    );
};

export default CustomerPage;