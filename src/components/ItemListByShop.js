import React, { useEffect, useState } from 'react';
import styles from '../styles/ItemListByShop.module.css';
import MenuList from './MenuList';
import MenuModify from './MenuModify';
import axios from '../apis/AxiosInstance';


const shops = [
    { id: 1, name: '공대점' },
];

const ItemListByShop = () => {
    const [menus, setMenus] = useState([]);
    const [selectedShop, setSelectedShop] = useState(shops[0]?.id);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [selectedDetailMenu, setSelectedDetailMenu] = useState(null);
    const [shopInfo,setShopInfo] = useState('');


    useEffect(() => {
            if (selectedShop) {
            axios
                .get(`/api/shop/${selectedShop}/menus`)
                .then(response => {
                    setMenus(response.data.menuList || []);
                    setShopInfo(response.data);
                })
                .catch(error => {
                    console.error(`Error fetching menus for shop ${selectedShop}:`, error);
                });
        }
    }, [selectedShop]);

    useEffect(() => {
        if (selectedMenu !== null && menus[selectedMenu]) {
            axios
                .get(`api/shop/${selectedShop}/menus/${menus[selectedMenu].menuId}`)
                .then(response => {
                    setSelectedDetailMenu(response.data);
                })
                .catch(error => {
                    console.error(`Error fetching menus for shop ${selectedMenu}:`, error);
                });
        } else {
            setSelectedDetailMenu(null);  // 선택된 메뉴가 없으면 selectedDetailMenu를 null로 설정
        }
    }, [selectedMenu]);


    const clickHandler = id => {
        setSelectedShop(id);


    };

    const updateMenuId = id => {
        if (id !== selectedMenu) {
            setSelectedMenu(id);

        }
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
                <MenuModify menu={menus[selectedMenu]} shop={selectedShop} detail={selectedDetailMenu} discount = {shopInfo} />
            </div>
        </div>
    );
};

export default ItemListByShop;
