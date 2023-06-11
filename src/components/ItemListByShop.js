import React, {useEffect, useState} from 'react';
import styles from '../styles/ItemListByShop.module.css';
import MenuList from "./MenuList";
import MenuModify from "./MenuModify";

const shops = [
    {id: 1, name: '공대점'}, {id: 2, name: '금오점'}, {id: 3, name: '옥계점'}
];

const items = [
    {id: 1, name: '햄버거', price: 5000, shopId: 1}, {id: 2, name: '햄', price: 6000, shopId: 1}, {id: 3, name: '버', price: 7000, shopId: 2},
    {id: 4, name: '거', price: 8000, shopId: 3}, {id: 5, name: '굴', price: 9000, shopId: 3}, {id: 6, name: '총', price: 10000, shopId: 3}
];

const ItemListByShop = () => {
    const [selectedShop, setSelectedShop] = useState(1);
    const [selectedMenu, setSelectedMenu] = useState(0);

    const updateMenuId = id => {
        setSelectedMenu(id);
    }

    const clickHandler = id => {
        setSelectedShop(id);
    }

    return (
        <div className={styles.Flex}>
            <ul className={styles.DivUl}>

                {shops.map(shop => {
                    return <li key={shop.id} className={styles.DivLi}
                               onClick={() => clickHandler(shop.id)}>{shop.name}</li>
                })}
                <p className={styles.PTag}>지점 명: {shops[selectedShop-1].name}</p>
            </ul>

            <div className={styles.Menu}>
                <MenuList items = {items} shopId={selectedShop} click = {updateMenuId}/>
            </div>
            <div>
                <MenuModify menu = {items[selectedMenu-1]}/>
            </div>
        </div>
    );
};

export default ItemListByShop;