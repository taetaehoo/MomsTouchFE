import React, {useEffect} from 'react';
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

const Token = () => {
    const location = useLocation();
    const [searchParam, setSearchParam] = useSearchParams();

    sessionStorage.setItem('accessToken', searchParam.get('id'))

    const navigator = useNavigate();

    useEffect(() => {
        sessionStorage.setItem('accessToken', searchParam.get('id'))

        navigator('/')

    }, [])
    return (
        <>
            안녕~
        </>
    );
};

export default Token;