import React, { useEffect, useState } from 'react';
import styles from '../styles/Statistics.module.css';
import axios from '../apis/AxiosInstance';

const Statistics = () => {
    const [orderStatistic, setOrderStatistic] = useState({});
    const [menuStatistic, setMenuStatistic] = useState([]);

    const handleFetchPolicies = async () => {
        try {
            const response = await axios.get('/api/statistic/shop/1');
            setOrderStatistic(response.data.orderStatistic);
            setMenuStatistic(response.data.menuStatistic);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleFetchPolicies();
    }, []);

    return (
        <div>
            <button className={styles.BtnTag} type="button" onClick={handleFetchPolicies}>
                조회하기
            </button>
            <div>
                <h2>주문 통계</h2>
                <p>주문 수: {orderStatistic.totalOrderCount}</p>
                <p>총 주문 가격: {orderStatistic.totalOrderPrice}원</p>
            </div>
            <div>
                <h2>메뉴 통계</h2>
                <table className={styles.Table}>
                    <thead>
                    <tr>
                        <th>메뉴 ID</th>
                        <th>메뉴 이름</th>
                        <th>설명</th>
                        <th>수량</th>
                        <th>카테고리</th>
                    </tr>
                    </thead>
                    <tbody>
                    {menuStatistic.map((item, index) => (
                        <tr key={index}>
                            <td>{item.menuId}</td>
                            <td>{item.menuName}</td>
                            <td>{item.description}</td>
                            <td>{item.count}</td>
                            <td>{item.category}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Statistics;