import React, {useEffect, useRef, useState} from 'react';
import styles from '../styles/MenuModify.module.css';
import axios from '../apis/AxiosInstance';
import OptionInput from "./OptionInput";
import {base_url} from "../config/config";

const MenuModify = ({menu,shop,detail,discount}) => {
    const [imageFile, setImageFile] = useState(null);
    const [menuName, setMenuName] = useState('');
    const [menuDesc, setMenuDesc] = useState('');
    const [price, setPrice] = useState('');
    const [option, setOption] = useState('');
    const [optionPrice, setOptionPrice] = useState('');
    const [optionSetPrice, setOptionSetPrice] = useState('');
    const [discountPolicy, setDiscountPolicy] = useState(discount?.discountPolicy?.discountPolicyId || null);
    const [optionGroupList, setOptionGroupList] = useState([]);
    const [imageUrl, setImageUrl] = useState("");


console.log(detail?.imageUrl);


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


    useEffect(() => {
        if (detail && detail.discountPolicy && detail.discountPolicy.discountPolicyId) {
            setDiscountPolicy(detail.discountPolicy.discountPolicyId);

        } else {
            setDiscountPolicy(null); // 선택된 할인 정책이 없을 경우 초기화
        }
    }, [detail]);

    // 수정 버튼 클릭시 API 호출
    const handleSubmit = async (event) => {
        event.preventDefault();


        const menuUpdateRequest = {  //리퀘스트 폼
            image: imageFile,
            menu: {
                discountPolicyId: discountPolicy,
                name: menuName,
                description: menuDesc,
                price: price,
                category: "MAIN",
                optionGroupList: optionGroupList.map(group => {
                    return {
                        name: group.groupName, // 옵션 그룹 이름
                        optionList: group.options.map(option => {
                            return {
                                name: option.option,
                                price: option.optionPrice
                            }
                        })
                    }
                }),
            }
        };


        let formData = new FormData();
        const json = JSON.stringify(menuUpdateRequest.menu);
        const blob = new Blob([json], { type: "application/json" });
        formData.append('image', imageFile);
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
                <img src={"http://172.30.125.92:8071" + detail?.imageUrl}/>

                <input className={styles.InputTag} type="file" accept="image/*"
                       onChange={(event) => {
                           setImageFile(event.target.files[0]);
                       }}
                />
                <input type={"text"} placeholder={"메뉴 이름"} defaultValue={menuName} onChange={e => changeMenu(e.target.value)}/>
                <input type={"text"} placeholder={"메뉴 설명"} defaultValue={menuDesc} onChange={e => changeMenuDesc(e.target.value)}/>
                <input type={"text"} placeholder={"가격"} defaultValue={price} onChange={e => changePrice(e.target.value)}/>
                <OptionInput handleOptionGroupList={handleOptionGroupList} />

                <select
                    name="discountChoice"
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