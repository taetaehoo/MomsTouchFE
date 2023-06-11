import React, {useEffect, useState} from 'react';
import MenuDetailInfo from "../components/MenuDetailInfo";
import MenuPlusBtnContainer from "../components/MenuPlusBtnContainer";
import ShopBasket from "../components/ShopBasket";
import {useParams} from "react-router-dom";
import axiosInstance from "../apis/AxiosInstance";

const MenuDetailPage = () => {
    const id = useParams("itemId");
    const shopId = id.shopId;
    const itemId = id.itemId;

    const [name, setName] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const result = await axiosInstance.get(`api/shop/${shopId}/menus/${itemId}`)
            setName(result.data);
        }

        fetchData()
    }, [])
    return (
        <>
            <MenuDetailInfo menu = {name}/>
            <MenuPlusBtnContainer menu = {name}/>
            <ShopBasket />
        </>
    );
};

export default MenuDetailPage;