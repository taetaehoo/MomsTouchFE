import React, {useEffect, useState} from 'react';
import styles from '../styles/MenuPlusBtnContainer.module.css'
import ShopBasket from "./ShopBasket";
import {selectOptions} from "@testing-library/user-event/dist/select-options";
import axiosInstance from "../apis/AxiosInstance";

const MenuPlusBtnContainer = ({itemId, shopId}) => {
    const [quantity, setQuantity] = useState(1);
    const [menuInfo, setMenuInfo] = useState(null);
    const [checkedItem, setCheckedItem] = useState([]);
    useEffect(async () => {
        await axiosInstance.get(`/api/shop/${shopId}/menus/${itemId}`)
            .then(result => setMenuInfo(result.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        console.log(menuInfo)
    }, [menuInfo])

    const data = []

    const handleChange = event => {
        if (event.target.checked) {
            //validate
            createCartGroup(event);
        }
        //없애기.
    }

    const createCartGroup = (event) => {
        const price = getPrice(event.target.value, event.target.name);

        const list = {
            menuOptionId: event.target.value,
            menuOptionGroupList : [
                {
                    menuOptionId: event.target.name,
                    price: price,
                }
            ]
        }

        return list;
    }

    const getPrice = (optionGroupId, optionId) => {



    }

    const plusBtn = () => {
        setQuantity(quantity + 1);
    }

    const minusBtn = () => {
        setQuantity(quantity-1 > 0 ? quantity -1 : quantity);
    }


    return (
        <>
            <div className={styles.BtnBox}>상품 갯수: <button className={styles.PlusBtn} onClick={() => plusBtn()}>+</button>{quantity}<button className={styles.MinusBtn} onClick={() => minusBtn()}>-</button></div>
        <ul className={styles.DivUl}>
            {menuInfo && menuInfo.optionGroupList.map(optionGroup => {
                return <li key={optionGroup.optionGroupId} className={styles.DivLi}>{optionGroup.name}<ul>
                    {optionGroup && optionGroup.optionList.map(option => {
                        return <label><input type={"checkbox"} name={option.optionId} value={optionGroup.optionGroupId} onChange={handleChange}/>{option.name} {option.price}원</label>
                    })}
                </ul></li>
            })}
        </ul>
            <ul></ul>
            <ShopBasket/>
    </>
    );
};

export default MenuPlusBtnContainer;