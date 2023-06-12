import React, {useEffect, useState} from 'react';
import styles from '../styles/OrderList.module.css';
import axiosInstance from "../apis/AxiosInstance";


const OrderList = ({list}) => {
    const [basketList, setBasketList] = useState(null);

    useEffect(() => {
        axiosInstance.get(`/api/members/1/carts`)
            .then(result => setBasketList(result.data))
            .catch(err => console.log(err))

    }, [])

    return (
        <ul className={styles.DivUl}>
            {}
        </ul>
    );
};

export default OrderList;