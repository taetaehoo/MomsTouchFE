import React, {useEffect, useRef, useState} from 'react';
import styles from '../styles/Enrollment.module.css';
import OptionInput from "./OptionInput";
import axios from "../apis/AxiosInstance";

const Enrollment = () => {
    const [imageFile, setImageFile] = useState('');
    const [menuName, setMenuName] = useState('');
    const [menuDesc, setMenuDesc] = useState('');
    const [price, setPrice] = useState('');
    const [option, setOption] = useState('');
    const [optionPrice, setOptionPrice] = useState('');
    const [optionSetPrice, setOptionSetPrice] = useState('');
    const [discountPolicy, setDiscountPolicy] = useState(null);
    const [showDiscountPolicy, setShowDiscountPolicy] = useState(null);
    const [optionGroupList, setOptionGroupList] = useState([]);

    const handleDiscountPolicyChange = (e) => {
        const selectedValue = e.target.value;
        axios
            .get(`/api/shop/1/menus`)
            .then(response => {
                setShowDiscountPolicy(response.data);
                const selectedValue = e.target.value;
                setDiscountPolicy(selectedValue);
            })
            .catch(error => {
                console.error(`Error fetching discount policy for menu 1:`, error);
            });
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

    const handleOptionGroupList = (optionGroupList) => {
        setOptionGroupList(optionGroupList);
    };

    const submit = async (event) => {
        event.preventDefault();

        const menuCreateRequest = {
            image: imageFile,
            menu: {
                discountPolicyId: discountPolicy,
                name: menuName,
                description: menuDesc,
                price: price,
                category: "MAIN",
                optionGroupList: optionGroupList.map(group => {
                    return {
                        name: group.groupName,
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
        const json = JSON.stringify(menuCreateRequest.menu);
        const blob = new Blob([json], {type: "application/json"});
        formData.append('image', imageFile);
        formData.append("menu", blob);

       await axios.post(`api/shop/1/menus`,
            formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(result => console.log(result)).catch(err => console.log(err));
    }
        return (
            <form className={styles.FormBox}>

                <input type={"text"} placeholder={"메뉴 이름"} defaultValue={menuName}
                       onChange={e => changeMenu(e.target.value)}/>
                <input type={"text"} placeholder={"메뉴 설명"} defaultValue={menuDesc}
                       onChange={e => changeMenuDesc(e.target.value)}/>
                <input type={"text"} placeholder={"가격"} defaultValue={price}
                       onChange={e => changePrice(e.target.value)}/>
                <label className={styles.LabelTag}>이미지</label>
                <input className={styles.InputTag} type={"file"} accept={'image/*'} onChange={(event) => {
                    setImageFile(event.target.files[0]);
                }}/><br/>
                <OptionInput handleOptionGroupList={handleOptionGroupList}/>

                <select
                    name="discountChoice"
                    onClick={handleDiscountPolicyChange}>

                    <option value="">--할인 정책 선택--</option>
                    {showDiscountPolicy?.discountList?.amountDiscountPolicyList?.map(policy => (
                        <option key={policy.id} value={policy.id}>
                            {policy.baseAmount}원 이상 시켰을 때 {policy.discountAmount}원 할인
                        </option>
                    ))}
                    {showDiscountPolicy?.discountList?.rateDiscountPolicyList?.map(policy => (
                        <option key={policy.id} value={policy.id}>
                            {policy.baseAmount}원 이상 시켰을 때 {policy.discountRate}% 할인
                        </option>
                    ))}
                    {showDiscountPolicy?.discountList?.timeDiscountPolicyList?.map(policy => (
                        <option key={policy.id} value={policy.id}>
                            {policy.baseTime} 이전에 시켰을 때 {policy.discountAmount}원 할인
                        </option>
                    ))}
                </select>
                <button className={styles.ButtonTag} onClick={submit}>메뉴 등록</button>
            </form>
        );

}



export default Enrollment;