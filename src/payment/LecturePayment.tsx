import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import HeaderNavigation from "../navigation/HeaderNavigation";
import FooterNavigation from "../navigation/FooterNavigation";
import PaymentInfo from "./paymentComponent/PaymentInfo";
import PaymentWidget from "./paymentComponent/PaymentWidget";
import PaymentSuccess from "./paymentComponent/PaymentSuccess";

import useLecturePaymentStoreData from "../stores/useLecturePaymentDataStore";

import * as Styled from "./LecturePayment.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpLong as topIcon} from "@fortawesome/free-solid-svg-icons";


const LecturePayment = () => {
    const location = useLocation();

    const {setIsSuccess} = useLecturePaymentStoreData();
    const [isPaymentModal, setIsPaymentModal] = useState<boolean>(false);

    useEffect(() => {
        setIsSuccess(false);
    }, [])

    return (
        <Styled.LecturePaymentView $isModal={isPaymentModal}>
            <HeaderNavigation />

            <div className="top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <FontAwesomeIcon icon={topIcon} className="icon-custom" />
            </div>

            <div className="lp-sub">
                <div className="lp-sub-view">
                    <div className="lp-sub-title">
                        수강결제
                    </div>
                </div>
            </div>

            <PaymentInfo lectureInfo={location.state} isModal={isPaymentModal} setIsModal={setIsPaymentModal}/>

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