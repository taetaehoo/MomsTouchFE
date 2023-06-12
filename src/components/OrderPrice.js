import React, {useEffect, useState} from 'react';
import styles from '../styles/OrderPrice.module.css'
import axiosInstance from "../apis/AxiosInstance";
const OrderPrice = ({list}) => {
    const [basketList, setBasketList] = useState(null);

    useEffect(() => {
        axiosInstance.get(`/api/members/1/carts`)
            .then(result => setBasketList(result.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        console.log(basketList)
    }, [basketList])

    return (
        <>
        </>
    );
};

export default OrderPrice;