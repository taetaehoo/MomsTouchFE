import React, { useState, useEffect } from 'react';
import styles from '../styles/SaleRatio.module.css';
import SaleRatioInsert from './SaleRationInsert';
import axios from "../apis/AxiosInstance";


const SaleRatioDelete = () => {
    const [showOtherComponent, setShowOtherComponent] = useState(false);
    const [deleteDiscount, setDeleteDiscount] = useState('');
    const [rateDiscount, setRateDiscount] = useState('');
    const [fixedDiscount, setFixedDiscount] = useState('');
    const [discountPolicy, setDiscountPolicy] = useState(null);
    const [showDiscountPolicy, setShowDiscountPolicy] = useState(null);



    const handleFormSubmit = (event) => {
        event.preventDefault();
        setShowOtherComponent(true);
    };

    const handleDiscountPolicyChange = (e) => {
        const selectedValue = e.target.value;
        axios
            .get(`/api/shop/1/menus`)
            .then(response => {
                setShowDiscountPolicy(response.data);
                setDiscountPolicy(selectedValue);
                console.log(discountPolicy);
            })
            .catch(error => {
                console.error(`Error fetching discount policy for menu 1:`, error);
            });
    };

    const handleDeleteDiscountPolicy = () => {
        axios
            .delete(`/api/discountPolicy/${discountPolicy}`)
            .then(result => console.log(result))
            .catch(err => console.log(err));
    };

    return (
        <div>
            {showOtherComponent ? (
                <SaleRatioInsert/>
            ) : (
                <form className={styles.FormTag}>
                    <select className={styles.select}
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
                    <button className={styles.DeleteButton} onClick={handleDeleteDiscountPolicy}>
                        삭제
                    </button>
                </form>
            )}
            <form className={styles.FormButton} onSubmit={handleFormSubmit}>
                <button className={styles.BtnTag} type="submit">추가 등록하기</button>
            </form>
        </div>
    );
};

export default SaleRatioDelete;
