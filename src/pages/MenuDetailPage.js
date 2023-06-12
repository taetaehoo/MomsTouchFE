import React, { lazy, Suspense } from 'react';
import { useParams } from "react-router-dom";

const MenuDetailInfo = lazy(() =>  import("../components/MenuDetailInfo"));
const MenuPlusBtnContainer = lazy(() => import("../components/MenuPlusBtnContainer"));

const MenuDetailPage = () => {
    const { itemId, shopId } = useParams();

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <MenuDetailInfo itemId = {itemId} shopId = {shopId}/>
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <MenuPlusBtnContainer itemId = {itemId} shopId = {shopId}/>
            </Suspense>
        </>
    );
};

export default MenuDetailPage;