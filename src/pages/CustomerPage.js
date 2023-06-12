import React from 'react';
import {Route, Routes} from "react-router-dom";
import MainPage from "./MainPage";
import MenuDetailPage from "./MenuDetailPage";
import OrderListPage from "./OrderListPage";
import Header from "../components/Header";
import Token from "../components/Token";

const CustomerPage = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path={"/"} element={<MainPage />}></Route>
                <Route path={"/id"} element={<Token />}></Route>
                <Route path={"/detail/:shopId/:itemId"} element={<MenuDetailPage />}></Route>
                <Route path={"/cart"} element={<OrderListPage />}></Route>
            </Routes>
        </>
    );
};

export default CustomerPage;