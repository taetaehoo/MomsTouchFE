import React from 'react';
import styles from '../styles/Header.module.css';
import {Link} from "react-router-dom";
import axiosInstance from "../apis/AxiosInstance";
const Header = () => {
    const login = () => {
        axiosInstance.get("/login/oauth2/code/google").then(result => {
            console.log(result);
        })
    }
    return (
        <div className={styles.HeaderBox}>
            <div className={styles.Box}>
                <h2 className={styles.Logo}><Link to={"/"} className={styles.LinkTag}>MomsTouch</Link></h2>
            </div>
            <div className={styles.Box}>
                <h4 className={styles.Login} onClick={() => login()}>Login</h4>
                <h4 className={styles.Order}><Link to={"/cart"} className={styles.LinkTag}>Cart</Link></h4>
            </div>
        </div>
    );
};

export default Header;