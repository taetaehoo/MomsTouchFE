import React, {useEffect, useState} from 'react';
import styles from '../styles/MenuDetailInfo.module.css';
import axiosInstance from "../apis/AxiosInstance";

const MenuDetailInfo = ({itemId, shopId}) => {
    const [menuInfo, setMenuInfo] = useState({})
    useEffect(  () => {
         axiosInstance.get(`/api/shop/${shopId}/menus/${itemId}`)
            .then(result => setMenuInfo(result.data))
            .catch(err => console.log(err))

    }, [])

    return (
        <>
            <div className={styles.MenuInfoBox}>
                <h2>메뉴 이름: {menuInfo && menuInfo.name}</h2>
                <p>메뉴 가격: {menuInfo && menuInfo.price}</p>
                <p>메뉴 설명: {menuInfo && menuInfo.description}</p>
            </div>
        </>
    );
};

export default MenuDetailInfo;