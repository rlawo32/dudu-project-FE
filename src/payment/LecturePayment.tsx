import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import HeaderNavigation from "../navigation/HeaderNavigation";
import FooterNavigation from "../navigation/FooterNavigation";
import PaymentInfo from "./paymentComponent/PaymentInfo";
import PaymentWidget from "./paymentComponent/PaymentWidget";

import useLecturePaymentStoreData from "../stores/useLecturePaymentDataStore";

import * as Styled from "./LecturePayment.style";


const LecturePayment = () => {
    const location = useLocation();

    const {setIsSuccess} = useLecturePaymentStoreData();
    const [isPaymentModal, setIsPaymentModal] = useState<boolean>(false);

    useEffect(() => {
        setIsSuccess(false);
    }, [])

    useEffect(() => {
        if(isPaymentModal) {
            document.body.style.overflow = 'hidden';
            document.body.style.width = '1903px';
        } else {
            document.body.style.overflow = 'auto';
            document.body.style.width = '100%';
        }
    }, [isPaymentModal])

    return (
        <Styled.LecturePaymentView $isModal={isPaymentModal}>
            <HeaderNavigation />

            <div className="lp-sub">
                <div className="lp-sub-view">
                    <div className="lp-sub-title">
                        수강결제
                    </div>
                </div>
            </div>

            <PaymentInfo paymentInfo={location.state} isModal={isPaymentModal} setIsModal={setIsPaymentModal}/>

            {isPaymentModal ?
                <div className="lp-modal">
                    <PaymentWidget isModal={isPaymentModal} setIsModal={setIsPaymentModal} />
                </div>
                : <div />}

            <FooterNavigation />
        </Styled.LecturePaymentView>
    )
}

export default LecturePayment;