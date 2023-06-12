import React from 'react';
import styles from '../styles/OrderButton.module.css';

const OrderButton = () => {
    // TODO `/api/order` 로 보내기
    return (
        <form>
            <input type={"text"} placeholder={"주소를 적으세요"} required={true}/>
            <input type={"tel"} placeholder={"전화번호를 적으세요"} required={true}/>
            <button className={styles.Button}><p className={styles.Letter}>주문!</p></button>
        </form>
    );
};

export default OrderButton;