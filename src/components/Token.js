import React from 'react';
import {useLocation, useSearchParams} from "react-router-dom";

const Token = () => {
    const location = useLocation();
    const [searchParam, setSearchParam] = useSearchParams();

    sessionStorage.setItem('accessToken', searchParam.get('id'))

    return (
        <>

        </>
    );
};

export default Token;