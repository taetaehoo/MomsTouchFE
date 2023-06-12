import React, {useEffect, useState} from 'react';
import styles from '../styles/OrderPrice.module.css'
import axiosInstance from "../apis/AxiosInstance";
const OrderPrice = ({list}) => {
    const [basketList, setBasketList] = useState(null);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        axiosInstance.get(`/api/carts`)
            .then(result => {
                setBasketList(result.data);
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
           setPrice(getPrice);
           console.log(basketList)
    }, [basketList])

    const getPrice = () => {
        let sum = 0;

        console.log(basketList)
        if(basketList) {
            basketList.cartMenuList.map(basket => {
                sum += basket.quantity * basket.discountedPrice;
                basket.cartMenuOptionGroupList.map(optionGroup => {
                    optionGroup.cartMenuOptionList.map(option => {
                        sum += option.price;
                    })
                })
            })
            console.log(sum);
        }
        else
            return 0;

        return sum;
    }

    return (
        <>
            <p>총 가격: {price}원</p>
        </>
    );
};

export default OrderPrice;