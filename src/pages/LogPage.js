import React, {useEffect, useRef, useState} from 'react';
import axiosInstance from "../apis/AxiosInstance";
import styles from '../styles/LogPage.module.css';
import WebSocketModule from "../apis/WebSocketModule";


const LogPage = () => {
    const [log, setLog] = useState(null);
    const conn = new WebSocket('ws://localhost:8071/ws');
    const status = useRef(null);

    conn.onopen = () => {
        conn.send(JSON.stringify({
            from: "join-customer"
        }))
    }

    conn.onmessage = event => {
        console.log(event.data);
        if (JSON.parse(event.data).from === "owner") {
            status.current.innerText = '주문 상태: '+JSON.parse(event.data).data.orderStatus;
        }
    }

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
                return <li key={tmp.orderId} className={styles.DivLi}><p className={styles.Status} ref={status} >주문 상태: {tmp.status}</p> <p className={styles.Address}>주소:{tmp.address}</p> <p className={styles.Phone}>전화번호:{tmp.phoneNumber}</p>
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