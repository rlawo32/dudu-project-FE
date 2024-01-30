import PaymentWidget from "./PaymentWidget";
import React from "react";
import {useNavigate} from "react-router-dom";

interface Props {
    lectureInfo:{
        lectureInstitution:string;
        lectureTitle:string;
        lectureTeacher:string;
        lecturePeriod:string;
        lectureTime:string;
        lectureCount:number;
        lectureFee:number;
    }
    isModal:boolean;
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentInfo = (props:Props) => {
    const navigate = useNavigate();

    return (
        <div>

            <div className="lp-main">
                <div className="lp-main-view">
                    <div className="lp-main-title">
                        수강자 정보
                    </div>
                    <div className="lp-main-content">
                        <div className="lp-content-top">
                            <div className="lp-top-left">
                                <div className="lp-institution">
                                    {props.lectureInfo.lectureInstitution}
                                </div>
                                <div className="lp-title">
                                    {props.lectureInfo.lectureTitle}
                                </div>
                            </div>
                            <div className="lp-top-right">
                                <div className="lp-teacher">
                                    <div className="section-title">
                                        강사명
                                    </div>
                                    {props.lectureInfo.lectureTeacher}
                                </div>
                                <div className="lp-period">
                                    <div className="section-title">
                                        강좌기간
                                    </div>
                                    {props.lectureInfo.lecturePeriod}
                                </div>
                                <div className="lp-time">
                                    <div className="section-title">
                                        강좌시간 / 횟수
                                    </div>
                                    {props.lectureInfo.lectureTime.substring(0, 12)}
                                    {
                                        props.lectureInfo.lectureTime.substring(13, 14) === '1' ? '(월)' :
                                            props.lectureInfo.lectureTime.substring(13, 14) === '2' ? '(화)' :
                                                props.lectureInfo.lectureTime.substring(13, 14) === '3' ? '(수)' :
                                                    props.lectureInfo.lectureTime.substring(13, 14) === '4' ? '(목)' :
                                                        props.lectureInfo.lectureTime.substring(13, 14) === '5' ? '(금)' :
                                                            props.lectureInfo.lectureTime.substring(13, 14) === '6' ? '(토)' : '(일)'
                                    }
                                    <span>/</span>
                                    {props.lectureInfo.lectureCount}회
                                </div>
                                <div className="lp-fee">
                                    <div className="section-title">
                                        강좌료
                                    </div>
                                    {props.lectureInfo.lectureFee.toLocaleString()}원
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
                                    {props.lectureInfo.lectureFee.toLocaleString()}원
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
                            {props.lectureInfo.lectureFee.toLocaleString()}
                        </div>
                        <span>원</span>
                    </div>
                    <div>
                        <button className="btn-back"
                                onClick={() => navigate(-1)}>이전</button>
                        <button className="btn-payment"
                                onClick={() => {window.scrollTo({ top: 50, behavior: "smooth" });
                                    props.setIsModal(true);}}>결제하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentInfo;