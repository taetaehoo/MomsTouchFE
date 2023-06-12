import React, {useEffect, useState} from 'react';
import axiosInstance from "../apis/AxiosInstance";
import styles from '../styles/LogPage.module.css';

const LogPage = () => {
    const [log, setLog] = useState(null);

    useEffect(() => {
        axiosInstance.get(`/api/order`)
            .then(result => setLog(result.data.orders))
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        console.log(log);
    }, [log])
    return (
        <ul className={styles.DivUl}>
            {log && log.map(tmp => {
                return <li key={tmp.orderId} className={styles.DivLi}><p className={styles.Status}>주문 상태: {tmp.status}</p> <p className={styles.Address}>주소:{tmp.address}</p> <p className={styles.Phone}>전화번호:{tmp.phoneNumber}</p>
                    <ul className={styles.UlBox}>
                    {tmp.orderMenus.map(menu => {
                        return <li key={menu.orderMenuId} className={styles.LiBox}>{menu.menuName} 가격: {menu.menuPrice}원</li>
                    })}
                </ul></li>
            })}
        </ul>
    );
};

export default LogPage;