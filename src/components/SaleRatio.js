import React, {useEffect} from 'react';
import styles from '../styles/SaleRatio.module.css';
import axiosInstance from "../apis/AxiosInstance";
const SaleRatio = () => {
    useEffect(() => {
        axiosInstance.get("/api/discountPolicy").then(result => console.log(result)).catch(err => console.log(err))
    })
    return (
        <form className={styles.FormTag}>
            <label className={styles.LabelTag}>조조 할인률</label><input className={styles.InputTag} type={"text"} placeholder={"원"} autoFocus={true}/><br />
            <label className={styles.LabelTag}>정율 할인률</label><input className={styles.InputTag} type={"text"} placeholder={"원"}/><br />
            <label className={styles.LabelTag}>정률 할인률</label><input className={styles.InputTag} type={"text"} placeholder={"원"}/><br />
            
            <button className={styles.BtnTag} type={"submit"}>수정하기</button>
        </form>
    );
};

export default SaleRatio;