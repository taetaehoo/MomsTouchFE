import React, { useState, useEffect } from 'react';
import styles from '../styles/SaleRationInsert.module.css';
import SaleRatioDelete from './SaleRatioDelete';
import axios from "../apis/AxiosInstance";

const SaleRatioInsert = () => {
    const [showOtherComponent, setShowOtherComponent] = useState(false);
   const [amount , setAmount] = useState(0);
    const [percentAmount , setPercentAmount] = useState(0);
    const [discountAmount  , setDiscountAmount ] = useState(0);
    const [discountTimeAmount  , setDiscountTimeAmount ] = useState(0);
    const [baseAmountPer,  setBaseAmountPer] = useState(0);
    const [discountRate,  setDiscountRate] = useState(0);
    const [baseTimeHour ,  setBaseTimeHour] = useState(0);
    const [baseTimeMin,  setBaseTimeMin] = useState(0);
    const [baseTimeSec,  setBaseTimeSec] = useState(0);
    const [DiscountTime,  setDiscountTime] = useState(0);


    const handleFormSubmit = (event) => {
        event.preventDefault();
        setShowOtherComponent(true);
    };
const timeSubmit = (event) => {
    event.preventDefault();

    const data = {
        shopId: 1,
        discountAmount: parseInt(discountTimeAmount),
            hour: parseInt(baseTimeHour),
            minute: baseTimeMin,
            second: baseTimeSec
};

    axios
        .post("/api/discountPolicy?type=TIME", data)
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.error(err);
        });
};

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            shopId: 1,
            baseAmount: amount,
            discountAmount: discountAmount
        };

        axios
            .post("/api/discountPolicy?type=AMOUNT", data)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.error(err);
            });
    };

    const perSubmit = (event) => {
        event.preventDefault();

        const data = {
            shopId: 1,
            baseAmount: parseInt(baseAmountPer),
            discountRate: parseInt(discountRate)
        };

        axios
            .post("/api/discountPolicy?type=RATE", data)
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
                                onChange={e => setDiscountAmount(parseInt(e.target.value))}
                            />
                            <label className={styles.LabelTag}>원을 할인</label>
                        </div>
                        <button className={styles.BtnTag} type="submit" onClick={handleSubmit}>
                            등록하기
                        </button>
                    </form>


                    <form className={styles.FormTag}>
                        <div className={styles.FormRow}>
                            <label className={styles.LabelTag}>정률</label>
                        </div>
                        <div className={styles.FormRow}>
                            <input
                                className={styles.InputTag}
                                type="text"
                                placeholder="원"
                                value={baseAmountPer}
                                onChange={e => setBaseAmountPer(e.target.value)}
                            />
                            <label className={styles.LabelTag}>원 기준</label>
                        </div>
                        <div className={styles.FormRow}>
                            <input
                                className={styles.InputTag}
                                type="text"
                                placeholder="퍼센트"
                                value={discountRate}
                                onChange={e => setDiscountRate(e.target.value)}
                            />
                            <label className={styles.LabelTag}>퍼센트를 할인</label>
                        </div>
                        <button className={styles.BtnTag} type="submit" onClick={perSubmit}>
                            등록하기
                        </button>
                    </form>


                    <form className={styles.FormTag}>
                        <div className={styles.FormRow}>
                            <label className={styles.LabelTag}>조조</label>
                        </div>
                        <div className={styles.FormRow}>
                            <input
                                className={styles.InputTag}
                                type="text"
                                placeholder="시"
                                value={baseTimeHour}
                                onChange={e => setBaseTimeHour(e.target.value)}
                            />
                            <label className={styles.LabelTag}>시 기준</label>
                        </div>
                        <div className={styles.FormRow}>
                            <input
                                className={styles.InputTag}
                                type="text"
                                placeholder="원"
                                value={discountTimeAmount}
                                onChange={e => setDiscountTimeAmount(e.target.value)}
                            />
                            <label className={styles.LabelTag}>원을 할인</label>
                        </div>
                        <button className={styles.BtnTag} type="submit" onClick={timeSubmit}>
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
