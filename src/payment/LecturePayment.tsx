import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import HeaderNavigation from "../navigation/HeaderNavigation";
import FooterNavigation from "../navigation/FooterNavigation";
import PaymentWidget from "./paymentComponent/PaymentWidget";

import * as Styled from "./LecturePayment.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpLong as topIcon} from "@fortawesome/free-solid-svg-icons";


const LecturePayment = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isPaymentModal, setIsPaymentModal] = useState<boolean>(false);

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
            <div className="lp-main">
                <div className="lp-main-view">
                    <div className="lp-main-title">
                        수강자 정보
                    </div>
                    <div className="lp-main-content">
                        <div className="lp-content-top">
                            <div className="lp-top-left">
                                <div className="lp-institution">
                                    {location.state.lectureInstitution}
                                </div>
                                <div className="lp-title">
                                    {location.state.lectureTitle}
                                </div>
                            </div>
                            <div className="lp-top-right">
                                <div className="lp-teacher">
                                    <div className="section-title">
                                        강사명
                                    </div>
                                    {location.state.lectureTeacher}
                                </div>
                                <div className="lp-period">
                                    <div className="section-title">
                                        강좌기간
                                    </div>
                                    {location.state.lecturePeriod}
                                </div>
                                <div className="lp-time">
                                    <div className="section-title">
                                        강좌시간 / 횟수
                                    </div>
                                    {location.state.lectureTime.substring(0, 12)}
                                    {
                                        location.state.lectureTime.substring(13, 14) === '1' ? '(월)' :
                                            location.state.lectureTime.substring(13, 14) === '2' ? '(화)' :
                                                location.state.lectureTime.substring(13, 14) === '3' ? '(수)' :
                                                    location.state.lectureTime.substring(13, 14) === '4' ? '(목)' :
                                                        location.state.lectureTime.substring(13, 14) === '5' ? '(금)' :
                                                            location.state.lectureTime.substring(13, 14) === '6' ? '(토)' : '(일)'
                                    }
                                </div>
                                <div className="lp-fee">
                                    <div className="section-title">
                                        강좌료
                                    </div>
                                    {location.state.lectureFee}
                                </div>
                            </div>
                        </div>
                        <div className="lp-content-bot">
                            <div className="lp-bot-left">
                                <div className="lp-member">
                                    김성재(본인)
                                </div>
                            </div>
                            <div className="lp-bot-right">
                                <div className="lp-paymentFee">
                                    <div className="section-title">
                                        결제예정 금액
                                    </div>
                                    {location.state.lectureFee.toLocaleString()}원
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lp-main-notice">
                        <div className="section-title">
                            유의사항
                        </div>
                        <ul>
                            <li>신청하신 강좌는 최소 정원에 미달되거나 사정에 의해 폐강 될 수 있으니 양해 바랍니다.</li>
                            <li>환불시 강의시작일 3일전부터 환불기준에 따른 환불 차감액이 발생이 됩니다.</li>
                            <li>환불 및 수강 취소시 강의시작일로부터 3일전은 환불액에서 1/3 환급, 2일전은 1/2 환급, 전날부터는 환불이 불가합니다.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="lp-button">
                <div className="section-button">
                    <div className="button-fee">
                        <span>총 결제예정금액</span>
                        <div>
                            {location.state.lectureFee.toLocaleString()}
                        </div>
                        <span>원</span>
                    </div>
                    <div>
                        <button className="btn-back"
                                onClick={() => navigate(-1)}>이전</button>
                        <button className="btn-payment"
                                onClick={() => {window.scrollTo({ top: 50, behavior: "smooth" });
                                    setIsPaymentModal(true);}}>결제하기</button>
                    </div>
                </div>
            </div>

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