import React, {useEffect, useState} from 'react';
import styles from '../styles/MenuDetailInfo.module.css';
import axiosInstance from "../apis/AxiosInstance";

const MenuDetailInfo = ({itemId, shopId}) => {
    const [menuInfo, setMenuInfo] = useState(null)
    useEffect(  () => {
         axiosInstance.get(`/api/shop/${shopId}/menus/${itemId}`)
            .then(result => setMenuInfo(result.data))
            .catch(err => console.log(err))

    }, [])
    const getDiscount = () => {
        if (!menuInfo)
            return '';
        const discountId = menuInfo.discountPolicy.id;
        if (discountId == 1) {
            return `${menuInfo.discountPolicy.baseAmount} 원 이상일때, ${menuInfo.discountPolicy.discountAmount}원 할인`
        }
        else if (discountId == 2) {
            return `${menuInfo.discountPolicy.baseAmount} 원 이상일때, ${menuInfo.discountPolicy.discountRate}% 할인`
        }

        else if (discountId == 3) {
            return `${menuInfo.discountPolicy.baseTime} 시 이하 일때, 조조 할인 ${menuInfo.discountPolicy.discountAmount}원 할인`
        }
    }
    return (
        <>
            <div className={styles.MenuInfoBox}>
                <h2>메뉴 이름: {menuInfo && menuInfo.name}</h2>
                <p>메뉴 가격: {menuInfo && menuInfo.price}</p>
                <p>메뉴 설명: {menuInfo && menuInfo.description}</p>
                <p>할인 정책: {menuInfo && getDiscount()}</p>
                <img src={menuInfo && process.env.REACT_APP_BASE_URL+menuInfo.imageUrl}/>
            </div>
        </>
    );
};

export default MenuDetailInfo;