import React, {useEffect, useState} from 'react';
import styles from '../styles/OrderButton.module.css';
import axiosInstance from "../apis/AxiosInstance";
import {useNavigate} from "react-router-dom";

const OrderButton = () => {
    const [basketList, setBasketList] = useState([]);
    const [address, setAddress] = useState('');
    const [phoneNum, setPhoneNum] = useState('');

    const navigator = useNavigate();

    const updateAddress = val => {
        setAddress(val);
    }

    const updatePhoneNum = val => {
        setPhoneNum(val);
    }

    const data = [];

    const getData = () => {
        const tmpData = {
            menuId: 0,
        }

        basketList.map(basket => {
            tmpData.menuId = basket.menuId;
            if (basket.menuOptionGroupList) {
                const optionGroup = getOptionGroupList(basket.menuOptionGroupList);
            }

        })
    }

    const getOptionGroupList = optionGroupList => {
        console.log(optionGroupList)
    }

    const order = () => {
        const data = {
            address: address,
            phoneNumber: phoneNum,
            shopId: 1,
            orderMenuList: [

            ]
        }

        basketList.map(basket => {
            console.log(basket)
            const tmps = {
                menuId: basket.menuId,
                optionGroupSelectInfoList: [],
                count: basket.quantity
            }
            basket.cartMenuOptionGroupList.map(optionGroup => {
                const tmp = {
                    name: optionGroup.menuOptionGroupName,
                    optionSelectInfoList: [

                    ]
                }

                optionGroup.cartMenuOptionList.map(option => {
                    const tmpData = {
                        id: option.menuOptionId,
                        name: option.menuOptionName,
                        price: {
                            amount: option.price
                        }
                    }

                    tmp.optionSelectInfoList.push(tmpData);
                })

                tmps.optionGroupSelectInfoList.push(tmp);
            })
            data.orderMenuList.push(tmps);
        })

        console.log(data);
        axiosInstance.post(`/api/order`, data).then(result => console.log(result)).catch(err => console.log(err));
        navigator('/');
    }

    useEffect(() => {
        axiosInstance.get(`/api/carts`)
            .then(result => {
                setBasketList(result.data.cartMenuList)


            })
            .catch(err => console.log(err))

    }, [])

    return (
        <>
            <input type={"text"} className={styles.InputTag} placeholder={"주소를 적으세요"} required={true} value={address} onChange={e => updateAddress(e.target.value)}/>
            <input type={"tel"} className={styles.InputTag} placeholder={"전화번호를 적으세요"} required={true} value={phoneNum} onChange={e => updatePhoneNum(e.target.value)}/>
            <button className={styles.Button}><p className={styles.Letter} onClick={() => order()}>주문!</p></button>
        </>
    );
};

export default OrderButton;