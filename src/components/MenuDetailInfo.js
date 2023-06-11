import React, {useEffect, useState} from 'react';
import styles from '../styles/MenuDetailInfo.module.css';

const MenuDetailInfo = ({menu}) => {

    return (
        <>
            <div className={styles.MenuInfoBox}>
                <h2>메뉴 이름: {menu && menu.name}</h2>
                <p>메뉴 가격: {menu && menu.price}</p>
                <p>메뉴 설명: {menu && menu.description}</p>
            </div>
        </>
    );
};

export default MenuDetailInfo;