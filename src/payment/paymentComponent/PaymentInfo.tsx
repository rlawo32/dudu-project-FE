import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import TopButtonNavigation from "../../navigation/TopButtonNavigation";

interface Props {
    paymentInfo:{lectureNo:number}[];
    isModal:boolean;
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentInfo = (props:Props) => {
    const navigate = useNavigate();

    const [paymentDetail, setPaymentDetail] = useState<{
        lectureNo:number; lectureInstitution:string; lectureTitle:string; lectureTeacher:string;
        lecturePeriod:string; lectureTime:string; lectureCount:number; lectureFee:number;
    }[]>([]);
    const [totalPaymentFee, setTotalPaymentFee] = useState<number>(0);

    const lectureApplicationDuplicationHandler = async ():Promise<void> => {
        let duplicationChk:boolean = true;
        for(let i:number=0; i<paymentDetail.length; i++) {
            await axios({
                method: "GET",
                url: "/lecture/lectureApplicationDuplicationChk",
                params: {lectureNo: paymentDetail[i].lectureNo}
            }).then((res):void => {
                if(res.data) {
                    duplicationChk = false;
                }
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        if(duplicationChk) {
            window.scrollTo({ top: 50, behavior: "smooth" });
            props.setIsModal(true);
        } else {
            alert('이미 수강신청한 강좌입니다.');
        }
    }

    useEffect(() => {
        for(let i:number=0; i<props.paymentInfo.length; i++) {
            axios({
                method: "GET",
                url: "/lecture/auth/lectureDetail",
                params: {lectureNo: props.paymentInfo[i].lectureNo}
            }).then((res):void => {
                setPaymentDetail(prev => [...prev, res.data.data]);
                setTotalPaymentFee(prev => prev + res.data.data.lectureFee);
            }).catch((err):void => {
                console.log(err.message);
            })
        }
    }, [])

    return (
        <div>

            <div className="lp-main">
                <div className="lp-main-view">
                    <div className="lp-main-title">
                        강좌 정보
                    </div>
                    {paymentDetail.map((item, idx) => (
                        <div key={idx} className="lp-main-content">
                            <div className="lp-content-top">
                                <div className="lp-top-left">
                                    <div className="lp-institution">
                                        {item.lectureInstitution}
                                    </div>
                                    <div className="lp-title">
                                        {item.lectureTitle}
                                    </div>
                                </div>
                                <div className="lp-top-right">
                                    <div className="lp-teacher">
                                        <div className="responsive-title section-title">
                                            강사명
                                        </div>
                                        {item.lectureTeacher}
                                    </div>
                                    <div className="lp-period">
                                        <div className="responsive-title section-title">
                                            강좌기간
                                        </div>
                                        {item.lecturePeriod}
                                        <div className="responsive-period">
                                            {
                                                item.lectureTime.substring(13, 14) === '1' ? '(월)' :
                                                    item.lectureTime.substring(13, 14) === '2' ? '(화)' :
                                                        item.lectureTime.substring(13, 14) === '3' ? '(수)' :
                                                            item.lectureTime.substring(13, 14) === '4' ? '(목)' :
                                                                item.lectureTime.substring(13, 14) === '5' ? '(금)' :
                                                                    item.lectureTime.substring(13, 14) === '6' ? '(토)' : '(일)'
                                            }
                                            <div>
                                                {item.lectureTime.substring(0, 12)}
                                            </div>
                                            <span> / </span>
                                            {item.lectureCount}회
                                        </div>
                                    </div>
                                    <div className="lp-time">
                                        <div className="responsive-title section-title">
                                            강좌시간 / 횟수
                                        </div>
                                        {item.lectureTime.substring(0, 12)}
                                        {
                                            item.lectureTime.substring(13, 14) === '1' ? '(월)' :
                                                item.lectureTime.substring(13, 14) === '2' ? '(화)' :
                                                    item.lectureTime.substring(13, 14) === '3' ? '(수)' :
                                                        item.lectureTime.substring(13, 14) === '4' ? '(목)' :
                                                            item.lectureTime.substring(13, 14) === '5' ? '(금)' :
                                                                item.lectureTime.substring(13, 14) === '6' ? '(토)' : '(일)'
                                        }
                                        <span>/</span>
                                        {item.lectureCount}회
                                    </div>
                                    <div className="lp-fee">
                                        <div className="section-title">
                                            강좌료
                                        </div>
                                        {item.lectureFee.toLocaleString()}원
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
                                        {item.lectureFee.toLocaleString()}원
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="lp-main-notice">
                        <div className="section-title">
                            유의사항
                        </div>
                        <ul>
                            <li>신청하신 강좌는 최소 정원에 미달되거나 사정에 의해 폐강 될 수 있으니 양해 바랍니다.</li>
                            <li>환불시 강의시작일 3일전부터 환불기준에 따른 환불 차감액이 발생이 됩니다.</li>
                            <li>환불 및 수강 취소시 강의시작일로부터 3일전은 환불액에서 전액 환급, 2일전은 2/3 환급, 1일전은 1/2 환급, 강의 당일부터는 환불이 불가합니다.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <TopButtonNavigation type={"D"} />
            <div className="lp-button">
                <div className="button-fee">
                    <div className="fee-text">총 결제예정금액</div>
                    <div className="fee-amount">
                        {totalPaymentFee.toLocaleString()}
                        <div className="fee-text">원</div>
                    </div>
                </div>
                <div className="button-active">
                    <button className="btn-back"
                            onClick={() => navigate(-1)}>이전</button>
                    <button className="btn-payment"
                            onClick={() => lectureApplicationDuplicationHandler()}>결제하기</button>
                </div>
            </div>
        </div>
    )
}

export default PaymentInfo;