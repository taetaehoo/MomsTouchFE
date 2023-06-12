import React, { useEffect, useState } from 'react';
import styles from '../styles/ItemListByShop.module.css';
import MenuList from './MenuList';
import MenuModify from './MenuModify';
import axios from '../apis/AxiosInstance';

const shops = [
    { id: 1, name: '공대점' },
    { id: 2, name: '금오점' }
];

const ItemListByShop = () => {
    const [menus, setMenus] = useState([]);
    const [selectedShop, setSelectedShop] = useState(shops[0]?.id);
    const [selectedMenu, setSelectedMenu] = useState(null);


    useEffect(() => {
        if (selectedShop) {
            axios
                .get(`/api/shop/${selectedShop}/menus`)
                .then(response => {
                    setMenus(response.data.menuList || []);
                })
                .catch(error => {
                    console.error(`Error fetching menus for shop ${selectedShop}:`, error);
                });
        }
    }, [selectedShop]);

    const clickHandler = id => {
        setSelectedShop(id);

    };

    const updateMenuId = id => {
        setSelectedMenu(id);
        console.log(id);
    };

    return (
        <div className={styles.Flex}>
            <ul className={styles.DivUl}>
                {shops.map(shop => (
                    <li key={shop.id} className={styles.DivLi} onClick={() => clickHandler(shop.id)}>
                        {shop.name}
                    </li>
                ))}
                <p className={styles.PTag}>지점 명: {shops.find(shop => shop.id === selectedShop)?.name}</p>
            </ul>

            <div className={styles.Menu}>
                <MenuList items={menus} selectedShop={selectedShop} click={updateMenuId} />
            </div>
            <div>
                <MenuModify menu={menus[selectedMenu]} />
            </div>
        </div>
    );
};

export default ItemListByShop;
