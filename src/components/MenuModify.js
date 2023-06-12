import React, {useEffect, useRef, useState} from 'react';
import styles from '../styles/MenuModify.module.css';
import axios from '../apis/AxiosInstance';
import OptionInput from "./OptionInput";

const MenuModify = ({menu,shop,detail,discount}) => {
    const [image, setImage] = useState('');
    const [menuName, setMenuName] = useState('');
    const [menuDesc, setMenuDesc] = useState('');
    const [price, setPrice] = useState('');
    const [option, setOption] = useState('');
    const [optionPrice, setOptionPrice] = useState('');
    const [optionSetPrice, setOptionSetPrice] = useState('');
    const [discountPolicy, setDiscountPolicy] = useState(discount?.discountPolicy?.discountPolicyId || '');
    const [optionGroupList, setOptionGroupList] = useState([]);

    console.log(detail?.discountPolicy?.discountPolicyId);

    const handleOptionGroupList = (optionGroupList) => {
        setOptionGroupList(optionGroupList);
    };



    const changeMenu = value => {
        setMenuName(value);
    }

    const changePrice = value => {
        setPrice(value);
    }
    const changeMenuDesc = value => {
        setMenuDesc(value);
    }
    const changeOption = value => {
        setOption(value);
    }

    const changeOptionPrice = value => {
        setOptionPrice(value);
    }
    const changeOptionSetPrice = value => {
        setOptionSetPrice(value);
    }



    // 수정 버튼 클릭시 API 호출
    const handleSubmit = async (event) => {
        event.preventDefault();

        const menuUpdateRequest = {
            image: image,
            menu: {
                discountPolicyId: discountPolicy,
                name: menuName,
                description: menuDesc,
                price: price,
                category: "MAIN",
                optionGroupList: [
                    {
                        name: "optionGroupList",
                        optionList: [
                            {
                                name: option,
                                price: 1000
                            }
                        ]
                    },
                    {
                        name: "음료 선택",
                        optionList: [
                            {
                                name: "콜라",
                                price: 1000
                            }
                        ]
                    }

                ],

            }
        };

        let formData = new FormData();
        const json = JSON.stringify(menuUpdateRequest.menu);
        const blob = new Blob([json], { type: "application/json" });
        formData.append("image",'');
        formData.append("menu",blob);


        await axios.put(`api/shop/${shop}/menus/${menu.menuId}`,
            formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(result => console.log(result)).catch(err => console.log(err));
    }

    return (
        <>
            <p className={styles.PTag}>수정 메뉴 이름: </p><p className={styles.PTagRight}>{menu === undefined ? '' : menu.name}</p>
            <form className={styles.FormTag} onSubmit={handleSubmit}>
                <br />
                <br />
                <input type={"text"} placeholder={"메뉴 이름"} defaultValue={menuName} onChange={e => changeMenu(e.target.value)}/>
                <input type={"text"} placeholder={"메뉴 설명"} defaultValue={menuDesc} onChange={e => changeMenuDesc(e.target.value)}/>
                <input type={"text"} placeholder={"가격"} defaultValue={price} onChange={e => changePrice(e.target.value)}/>
                <input type={"text"} placeholder={"세트가격"} defaultValue={optionSetPrice} onChange={e => changeOptionSetPrice(e.target.value)}/>
                <OptionInput handleOptionGroupList={handleOptionGroupList} />

                <select
                    name="discountChoice"
                    value={detail?.discountPolicy?.discountPolicyId || ""}
                    onChange={e => setDiscountPolicy(e.target.value)}
                >
                    <option value="">--할인 정책 선택--</option>
                    {discount?.discountList?.amountDiscountPolicyList?.map(policy => (
                        <option key={policy.id} value={policy.id}>
                            {policy.baseAmount}원 이상 시켰을 때 {policy.discountAmount}원 할인
                        </option>
                    ))}
                    {discount?.discountList?.rateDiscountPolicyList?.map(policy => (
                        <option key={policy.id} value={policy.id}>
                            {policy.baseAmount}원 이상 시켰을 때 {policy.discountRate}% 할인
                        </option>
                    ))}
                    {discount?.discountList?.timeDiscountPolicyList?.map(policy => (
                        <option key={policy.id} value={policy.id}>
                            {policy.baseTime} 이전에 시켰을 때 {policy.discountAmount}원 할인
                        </option>
                    ))}
                </select>

                <br /><br /><br />

                <button className={styles.Btn} type={"submit"}>수정</button>

            </form>
        </>
    );
};

export default MenuModify;