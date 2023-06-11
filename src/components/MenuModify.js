import React, {useEffect, useRef, useState} from 'react';
import styles from '../styles/MenuModify.module.css';

const MenuModify = ({menu}) => {
    const [menuName, setMenuName] = useState('');
    const [price, setPrice] = useState(0);

    const changeMenu = value => {
        setMenuName(value);
    }

    const changePrice = value => {
        setPrice(value);
    }

    return (
        <>
            <p className={styles.PTag}>수정 메뉴 이름: </p><p className={styles.PTagRight}>{menu === undefined ? '' : menu.name}</p>
            <form className={styles.FormTag}>
                <br />
                <br />
                <input type={"text"} placeholder={"메뉴 이름"} onChange={e => changeMenu(e.target.value)}/>
                <input type={"text"} placeholder={"가격"} onChange={e => changePrice(e.target.value)}/>
                <input type={"text"} placeholder={"할인 정책"} />

                <br /><br /><br />

                <button className={styles.Btn} type={"submit"}>수정</button>

            </form>
        </>
    );
};

export default MenuModify;