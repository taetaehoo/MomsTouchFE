import React from 'react';
import styles from '../styles/Modify.module.css';
import ItemListByShop from "./ItemListByShop";

const Modify = () => {
    return (

        <div className={styles.ListBox}>
            <ItemListByShop />
        </div>
    );
};

export default Modify;