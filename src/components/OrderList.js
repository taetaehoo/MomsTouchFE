import React, {useEffect, useState} from 'react';
import styles from '../styles/OrderList.module.css';
import axiosInstance from "../apis/AxiosInstance";


const OrderList = ({list}) => {
    const [basketList, setBasketList] = useState([]);
    useEffect(() => {
        axiosInstance.get(`/api/carts`)
            .then(result => {
                setBasketList(result.data.cartMenuList)


            })
            .catch(err => console.log(err))

    }, [])


    const getPrice = basket => {
        if (!basket)
            return 0;
        let sum = 0;
        console.log(basket);
        sum += basket.quantity * basket.discountedPrice;
        basket.cartMenuOptionGroupList.map(optionGroup => {
            optionGroup.cartMenuOptionList.map(option => {
                sum += option.price;
            })
        })
        console.log(sum);
        return sum;

    }

    return (
        <ul className={styles.DivUl}>
            {basketList.map(basket => {
                return <li key={basket.menuId} className={styles.DivLi}>{basket.menuName}{basket.quantity}개
                    * {basket.discountedPrice}원
                    <ul className={styles.BasketUl}>
                        {basket.cartMenuOptionGroupList.map(optionGroup => {
                            return <li key={optionGroup.menuOptionGroupId}
                                       className={styles.BasketLi}>{optionGroup.menuOptionGroupName}
                                <ul>
                                    {optionGroup.cartMenuOptionList.map(option => {
                                        return <li
                                            key={option.menuOptionId}>{option.menuOptionName}, {option.price}원</li>
                                    })}
                                </ul>
                            </li>
                        })}
                    </ul>
                    <p>{getPrice(basket)}원</p>
                </li>

            })}
        </ul>
    );
};

export default OrderList;