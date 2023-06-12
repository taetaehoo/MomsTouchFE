import React from 'react';
import styles from '../styles/OrderButton.module.css';

const OrderButton = () => {
    // TODO `/api/order` 로 보내기
    return (
        <>
            <button className={styles.Button}><p className={styles.Letter}>주문!</p></button>
        </>
    );
};

export default OrderButton;