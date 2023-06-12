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

    }, [])

    useEffect(() => {
        console.log(items)
    }, [items])

    return (
        <ul className={styles.DivUl}>
            {
             menus && menus.map(menu => {
                 return <Link to={`/detail/${1}/${menu.menuId}`} className={styles.LinkTag}><li className={styles.DivLi} key={menu.menuId} ><img loading={"lazy"} src={process.env.REACT_APP_BASE_URL+`${menu.imageUrl}`}/><p>{menu.name}</p><p>{menu.price}원</p></li></Link>
                })
            }
        </ul>
    );
};

export default ItemList;