import React from 'react';
import styles from '../styles/ShopBasket.module.css';
import {Link} from "react-router-dom";
const ShopBasket = ({click}) => {
    return (
        <>
            <button className={styles.ShopBtn} onClick={() => click()}><Link to={"/"}>장바구니 담기</Link></button>
            
        </>
        // TODO Link tag 넣기
    );
};

export default ShopBasket;