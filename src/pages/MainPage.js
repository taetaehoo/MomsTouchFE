import React, {useEffect} from "react";
import styles from '../styles/MainPage.module.css';
import ItemList from "../components/ItemList";
import axiosInstance from "../apis/AxiosInstance";
import {useNavigate} from "react-router-dom";

const MainPage = () => {
    const navigator = useNavigate();
    useEffect(() => {
        axiosInstance.get('/api/user',{withCredentials: true})
            .then(resp => {
               resp.data.role === 'ROLE_OWNER' ? navigator('/owner') : navigator('/')

            })
            .catch(err => console.log(err));
    }, [])
    return (
        <>
            <ItemList className={styles.ItemList}></ItemList>
        </>
    )
}

export default MainPage;