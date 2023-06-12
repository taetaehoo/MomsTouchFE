import React, {useState} from 'react';
import styles from '../styles/MenuModify.module.css';
import axios from '../apis/AxiosInstance';

const MenuModify = ({menu}) => {
    const [menuName, setMenuName] = useState('');
    const [price, setPrice] = useState(0);
    console.log(menu);

    const changeMenu = value => {
        setMenuName(value);
    }

    const changePrice = value => {
        setPrice(value);
    }

    // 수정 버튼 클릭시 API 호출
    const handleSubmit = async (event) => {
        event.preventDefault();

        const menuUpdateRequest = {
            name: menuName,
            price: price,

        };

        try {
            const response = await axios.put(`api/shop/${menu.shopId}/menus/${menu.id}`, menuUpdateRequest);
            console.log(response); // 응답 확인
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <p className={styles.PTag}>수정 메뉴 이름: </p><p className={styles.PTagRight}>{menu === undefined ? '' : menu.name}</p>
            <form className={styles.FormTag} onSubmit={handleSubmit}>
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
