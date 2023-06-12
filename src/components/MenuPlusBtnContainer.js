import React, {useEffect, useState} from 'react';
import styles from '../styles/MenuPlusBtnContainer.module.css'
import ShopBasket from "./ShopBasket";
import {selectOptions} from "@testing-library/user-event/dist/select-options";
import axiosInstance from "../apis/AxiosInstance";

const MenuPlusBtnContainer = ({itemId, shopId}) => {
    const [quantity, setQuantity] = useState(1);
    const [menuInfo, setMenuInfo] = useState(null);
    const [checkedItem, setCheckedItem] = useState([]);
    useEffect(() => {
        axiosInstance.get(`/api/shop/${shopId}/menus/${itemId}`)
            .then(result => setMenuInfo(result.data))
            .catch(err => console.log(err))
    }, [])

    let data = []

    const handleChange = event => {
        const result = createCartGroup(event);
        if (event.target.checked) {
            //validate
            data.push(result);
        }
        else {
            data = data.filter(tmp => JSON.stringify(tmp) !== JSON.stringify(result))
        }

        console.log(data)
    }

    const createCartGroup = (event) => {
        const price = getPrice(event.target.value, event.target.name);
        const groupName = getGroupName(event.target.value);
        const optionName = getOptionName(event.target.value, event.target.name);
        const list = {
            menuOptionGroupId: Number(event.target.value),
            menuOptionGroupName: groupName,
            cartMenuOptionList : [
                {
                    menuOptionId: Number(event.target.name),
                    menuOptionName: optionName,
                    price: price,
                }
            ]
        }

        return list;
    }

    const getPrice = (optionGroupId, optionId) => {
        const optionGroupList = menuInfo.optionGroupList;

        const findOptionGroup = optionGroupList.filter(optionGroup => optionGroup.optionGroupId == optionGroupId);
        const options = findOptionGroup[0].optionList;
        const optionPrice = options.filter(option => option.optionId == optionId);
        return optionPrice[0].price;
    }

    const getGroupName = (optionGroupId) => {
        const optionGroupList = menuInfo.optionGroupList;

        const findOptionGroup = optionGroupList.filter(optionGroup => optionGroup.optionGroupId == optionGroupId);
        return findOptionGroup[0].name;

    }

    const getOptionName = (optionGroupId, optionId) => {
        const optionGroupList = menuInfo.optionGroupList;

        const findOptionGroup = optionGroupList.filter(optionGroup => optionGroup.optionGroupId == optionGroupId);
        const options = findOptionGroup[0].optionList;
        const optionPrice = options.filter(option => option.optionId == optionId);
        return optionPrice[0].name;
    }

    const plusBtn = () => {
        setQuantity(quantity + 1);
    }

    const minusBtn = () => {
        setQuantity(quantity-1 > 0 ? quantity -1 : quantity);
    }

    const clickEvent = () => {
        const postData = {
            menuId: menuInfo.menuId,
            menuName: menuInfo.name,
            discountPolicyId: menuInfo.discountPolicy.discountPolicyId,
            quantity: quantity,
            price: menuInfo.price,
            cartMenuOptionGroupList: data
        }

        console.log(postData);

        axiosInstance.post(`/api/members/1/carts`, postData)
            .then(result => console.log(result))
            .catch(err => console.log(err))
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
            <ShopBasket click = {clickEvent} />
    </>
    );
};

export default MenuPlusBtnContainer;