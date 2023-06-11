import React from 'react';
import styles from '../styles/MenuList.module.css'



const MenuList = ({items, shopId, click}) => {
    return (
        <ul className={styles.DivUl}>
            <p className={styles.PTag}>메뉴판</p>
            {items.filter(item => {
                return item.shopId === shopId;
            }).map(menu => {
                {
                    return <li key={menu.id} className={styles.DivLi} onClick={() => click(menu.id)}><p className={styles.NameTag}>{menu.name}</p><p className={styles.PriceTag}>{menu.price}원</p></li>
                }
            })}
        </ul>
    );
};

export default MenuList;