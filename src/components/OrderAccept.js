import React, { useState, useEffect } from 'react';
import axios from '../apis/AxiosInstance';
import styles from '../styles/OrderAccept.module.css'

const OrderAccept = () => {
    const [items, setItems] = useState([]);

    // const items = [
    //     {id: 1, status: "대기중", address: "대구시 북구 관음동로 41"},
    //     {id: 2, status: "배달중", address: "구미시 대학로 17-14"}
    // ]

    const statusNum = status => {
        return status.padStart(5, " ");
    }

    const addressNum = address => {
        return address.padStart(15, " ");
    }

    const handleClickAccept = async (item) => {
        try {
            console.log(item);
            const response = await axios.post(`api/order/${item.orderId}`); // 주문접수
            // 응답이 성공적이면 상태 업데이트하기
            if (response.status === 200) {
                const response2 = await axios.put(`api/order/${item.orderId}/delivery`);  //배달중으로 변경
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }



    const handleClickReject = async (item) => {
        try {
            console.log(item);
            const response = await axios.delete(`api/order/${item.orderId}`); // 주문 거부
            // 응답이 성공적이면 상태 업데이트하기
            if (response.status === 200) {

            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleClickDelivered = async (item) => {
        // "배달완료" 버튼이 클릭되었을 때 실행할 로직을 여기에 작성합니다.
        try {
            const response = await axios.put(`api/order/${item.orderId}/complete`); // 여기에 실제 API URL을 대체하세요.
            // 응답이 성공적이면 상태 업데이트하기
            if (response.status === 200) {
                // Do something...
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('api/order/shop/1');
                console.log(response.data);
                setItems(response.data.orders);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <ul className={styles.DivUl}>
            {items.map(item => (
                <li key={item.id} className={styles.DivLi}>
                    <p className={styles.PTag}>{item.id}</p>
                    <p className={styles.PTag}>{statusNum(item.customer.name)}</p>
                    <p className={styles.PTag}>{statusNum(item.status)}</p>
                    <p className={styles.PTag}>{addressNum(item.address)}</p>
                    {item.status === 'ORDER' && <button className={styles.BtnTag} onClick={() => handleClickAccept(item)}>수락</button>}
                    {item.status === 'DELIVERY' && <button className={styles.BtnTag} onClick={() => handleClickDelivered(item)}>배달완료</button>}
                    <button className={styles.BtnTag} onClick={() => handleClickReject(item)}>거절</button>
                </li>
            ))}
        </ul>
    );
};

export default OrderAccept;
