import React, { useState, useEffect } from 'react';
import styles from '../styles/SaleRationInsert.module.css';
import SaleRatioDelete from './SaleRatioDelete';
import axios from "../apis/AxiosInstance";

const SaleRatioInsert = () => {
    const [showOtherComponent, setShowOtherComponent] = useState(false);
   const [amount , setAmount] = useState(0);
    const [discountAmount  , setDiscountAmount ] = useState(0);
    const [baseAmountPer,  setBaseAmountPer] = useState(0);
    const [discountRate,  setDiscountRate] = useState(0);
    const [baseTime ,  setBaseTime] = useState(0);
    const [DiscountTime,  setDiscountTime] = useState(0);



    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            shopId: 1,
            baseAmount: amount,
            discountAmount: discountAmount
        };

        axios
            .post("/api/discountPolicy/AMOUNT", data)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <div>
            {showOtherComponent ? (
                <SaleRatioDelete />
            ) : (
                <div className={styles.FormContainer}>
                    <form className={styles.FormTag}>
                        <div className={styles.FormRow}>
                            <label className={styles.LabelTag}>정량</label>
                        </div>
                        <div className={styles.FormRow}>
                            <input
                                className={styles.InputTag}
                                type="text"
                                placeholder="원"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                            />
                            <label className={styles.LabelTag}>원 기준</label>
                        </div>
                        <div className={styles.FormRow}>
                            <input
                                className={styles.InputTag}
                                type="text"
                                placeholder="원"
                                value={discountAmount}
                                onChange={e => setDiscountAmount(e.target.value)}
                            />
                            <label className={styles.LabelTag}>원을 할인</label>
                        </div>
                        <button className={styles.BtnTag} type="submit" onClick={handleSubmit}>
                            등록하기
                        </button>
                    </form>
                    {/* 나머지 폼들 */}
                </div>
            )}
        </div>
    );
};

export default SaleRatioInsert;
