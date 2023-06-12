import React, {lazy, Suspense, useEffect, useState} from 'react';
import axiosInstance from "../apis/AxiosInstance";

const OrderList = lazy(() => import("../components/OrderList"));
const OrderPrice = lazy(() => import("../components/OrderPrice"))
const OrderButton = lazy(() => import("../components/OrderButton"));


const OrderListPage = () => {
    const [basketList, setBasketList] = useState(null);
    useEffect(() => {
        axiosInstance.get(`/api/members/1/carts`)
            .then(result => setBasketList(result.data))
            .catch(err => console.log(err))
    }, [])


    // TODO `/api/members/{memberId}/carts 로 리스트 가져오기
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <OrderList/>
            </Suspense>

            <Suspense fallback={<div>Loading...</div>}>
                <OrderPrice/>
            </Suspense>

            <Suspense fallback={<div>Loading...</div>}>
                <OrderButton/>
            </Suspense>
        </>
    );
};

export default OrderListPage;