import React, {useState} from 'react';
import styles from '../styles/Tab.module.css';
import Enrollment from "./Enrollment";
import OrderAccept from "./OrderAccept";
import SaleRatio from "./SaleRatio";
import Statistics from "./Statistics";
import Modify from "./Modify";

const items = [
    {id: 1, name: "수정"}, {id: 2, name: "등록"}, {id: 3, name: "주문 접수"}, {id: 4, name: "할인 설정"}, {
        id: 5, name: "통계"
    }
]

const obj = {
    1: <Modify/>,
    2: <Enrollment />,
    3: <OrderAccept/>,
    4: <SaleRatio/>,
    5: <Statistics/>
}
const Tab = () => {
    const [activeTab, setActiveTab] = useState(1);

    const clickHandler = id => {
        setActiveTab(id);
    }

    return (
        <>
            <ul className={styles.DivUl}>
                {items.map(item => {
                    return <li id={item.id} className={styles.DivLi}
                               onClick={() => clickHandler(item.id)}>{item.name}</li>
                })}
            </ul>
            <div>
                {obj[activeTab]}
            </div>
        </>
    );
};

export default Tab;