import React, {useEffect, useState} from 'react';
import styles from '../styles/Item.module.css';
import {Link} from "react-router-dom";
import axiosInstance from "../apis/AxiosInstance";

const ItemList = () => {
    const [items, setItems] = useState({});
    const [menus, setMenus] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axiosInstance.get("/api/shop/1/menus");
            setItems(result.data);
            setMenus(result.data.menuList)

        }

        fetchData();
        console.log(items);
    }, [])



    return (
        <ul className={styles.DivUl}>
            {
             menus && menus.map(menu => {
                 return <Link to={`/detail/${1}/${menu.menuId}`}><li className={styles.DivLi} key={menu.menuId}><p>{menu.name}</p><p>{menu.price}</p></li></Link>
                })
            }
        </ul>
    );
};

export default ItemList;