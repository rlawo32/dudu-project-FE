import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import HeaderNavigation from "../../navigation/HeaderNavigation";
import FooterNavigation from "../../navigation/FooterNavigation";
import TopButtonNavigation from "../../navigation/TopButtonNavigation";
import FixedConfettiEffect from "../../styles/FixedConfettiEffect";

import useLecturePaymentStoreData from "../../stores/useLecturePaymentDataStore";

const PaymentSuccessView = styled.div`
  position: relative;

  .lp-sub {
    height: 100%;
    width: 100%;
    background: rgba(216,201,201,0.5);

    .lp-sub-view {
      width: 1160px;
      @media screen and (max-width: 1280px) {
        width: 100%;
        padding: 62px 0 80px;
      }
      padding: 82px 0 150px;
      margin: 0 auto;
      text-align: center;

      .lp-sub-title {
        margin: 7% auto 0;
        font-size: 48px;
        @media screen and (max-width: 1024px) {
          font-size: 32px;
        }
      }
    }
  }
  
  .lp-success-title {
    width: fit-content;
    margin: 80px auto 0;
    font-size: 30px;
    font-weight: bold;
  }

  .lp-main-view {
    width: 1160px;
    margin: 100px auto 10%;
    @media screen and (max-width: 1280px) {
      box-sizing: border-box;
      width: 100%;
      padding: 0 20px;
    }

    .lp-main-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;

      font-size: 24px;
      font-weight: bold;
      line-height: 32px;
      letter-spacing: -.6px;
    }

    .lp-main-content {
      padding: 40px;
      margin-top: 20px;
      border: 1px solid #ddcdc5;
      border-radius: 12px;

      .lp-content-top {
        display: flex;
        padding-bottom: 40px;
        border-bottom: 1px solid ${({theme}) => theme.textColor};

        .lp-top-left {
          width: calc(50% - 60px);
          margin-right: 60px;

          .lp-institution {
            width: fit-content;
            padding: 0 6px;
            margin: 0 2px 2px 0;
            border: 1px solid ${({theme}) => theme.textColor};
            border-radius: 9px;
            font-size: 11px;
            line-height: 16px;
            white-space: nowrap;
          }

          .lp-title {
            margin-top: 4px;
            font-size: 24px;
            font-weight: bold;
            line-height: 32px;
            letter-spacing: -.6px;
          }
        }

        .lp-top-right {
          width: 50%;
          padding: 0 30px 0 20px;
          border-left: 1px solid ${({theme}) => theme.rgbaLight};
          font-size: 16px;
          line-height: 26px;
          letter-spacing: -.4px;

          .section-title {
            width: 120px;
            margin-right: 20px;
            font-size: 13px;
            line-height: 32px;
          }

          .lp-teacher {
            display: flex;
            width: calc(100% - 140px);
            font-size: 13px;
            line-height: 32px;
            word-break: break-all;
          }

          .lp-period {
            display: flex;
            width: calc(100% - 140px);
            font-size: 13px;
            line-height: 32px;
            word-break: break-all;

          }

          .lp-time {
            display: flex;
            width: calc(100% - 140px);
            font-size: 13px;
            line-height: 32px;
            word-break: break-all;

            span {
              margin: 0 4px;
            }
          }

          .lp-fee {
            display: flex;
            width: calc(100% - 140px);
            font-size: 13px;
            line-height: 32px;
            word-break: break-all;

          }
        }
      }

      .lp-content-bot {
        position: relative;
        display: flex;
        padding: 32px 0 0;

        .lp-bot-left {
          width: 50%;
          font-weight: bold;

          .lp-member {
            margin-bottom: 12px;
            font-size: 18px;
          }
        }

        .lp-bot-right {
          width: 50%;
          padding-left: 20px;

          .lp-paymentFee {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            font-size: 18px;
            font-weight: bold;

            .section-title {
            }
          }
        }
      }
    }
    
    .lp-button-section {
      width: fit-content;
      margin: 80px auto 0;
      
      .btn-lp-home {
        display: inline-block;
        min-height: 60px;
        min-width: 90px;
        padding: 16px 10px 17px;
        border: 2px solid ${({theme}) => theme.rgbaMedium};
        border-radius: 8px;
        background-color: ${({theme}) => theme.bgColor};
        color: ${({theme}) => theme.textColor};
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        transition: all .4s ease;
        cursor: pointer;
      }
      
      .btn-lp-history {
        display: inline-block;
        min-height: 60px;
        min-width: 250px;
        padding: 16px 10px 17px;
        margin-left: 10px;
        border: 1px solid ${({theme}) => theme.rgbaLight};
        border-radius: 8px;
        background-color: ${({theme}) => theme.reverseBgColor};
        color: ${({theme}) => theme.reverseTextColor};
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        transition: all .4s ease;
        cursor: pointer;
      }
    }
  }
`;

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const paymentKey = urlParams.get("paymentKey");
    const orderId = urlParams.get("orderId");
    const amount = urlParams.get("amount");

    const {isSuccess, setIsSuccess} = useLecturePaymentStoreData();
    const [lectureInfo, setLectureInfo] = useState<{
        lectureNo:number; lectureTitle:string; lectureDivision:string; lectureTeacher:string;
        lectureTime:string; lecturePeriod:string; lectureFee:number; lectureInstitution:string;
        lectureStateNo:number; lectureCount:number; lectureEventType:string; lectureThumbnail:string;
    }[]>([{
        lectureNo: 0, lectureTitle: '', lectureDivision: '', lectureTeacher: '',
        lectureTime: '', lecturePeriod: '', lectureFee: 0, lectureInstitution: '',
        lectureStateNo: 0, lectureCount: 0, lectureEventType: '', lectureThumbnail: ''
    }]);
    const [memberName, setMemberName] = useState<string>("");

    useEffect(() => {
        const memberInfoData = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/member/findMemberInfo"
            }).then((res):void => {
                setMemberName(res.data.data.memberName);
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        memberInfoData().then();
        const lectureApplicationData:object = {
            paymentKey: paymentKey,
            orderId: orderId
        }
        const paymentSuccess = async ():Promise<void> => {
            await axios({
                method: "POST",
                url: "/lecture/lectureApplicationInsert",
                data: JSON.stringify(lectureApplicationData),
                headers: {'Content-type': 'application/json'}
            }).then((res):void => {
                console.log(res.data.data)
                setLectureInfo(res.data.data);
                setIsSuccess(true);
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        setTimeout(() => {paymentSuccess().then();}, 200);
    }, [])

    return (
        <PaymentSuccessView>
            <HeaderNavigation />

            <div className="lp-sub">
                <div className="lp-sub-view">
                    <div className="lp-sub-title">
                        결제완료
                    </div>
                </div>
            </div>
            <div className="lp-success-title">
                수강신청이 정상적으로 완료되었습니다.
                { isSuccess ? <FixedConfettiEffect /> : <div />}
            </div>
            <div className="lp-main-view">
                <div className="lp-main-title">
                    수강신청 내역
                </div>
                {lectureInfo.map((item, idx) => (
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
                                    <div className="section-title">
                                        강사명
                                    </div>
                                    {item.lectureTeacher}
                                </div>
                                <div className="lp-period">
                                    <div className="section-title">
                                        강좌기간
                                    </div>
                                    {item.lecturePeriod}
                                </div>
                                <div className="lp-time">
                                    <div className="section-title">
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
                                    {memberName}(본인)
                                </div>
                            </div>
                            <div className="lp-bot-right">
                                <div className="lp-paymentFee">
                                    <div className="section-title">
                                        주문금액
                                    </div>
                                    {item.lectureFee.toLocaleString()}원
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="lp-button-section">
                    <button onClick={() => navigate("/")} className="btn-lp-home">홈으로</button>
                    <button onClick={() => navigate("/lectureHistory")} className="btn-lp-history">수강내역 조회</button>
                </div>
            </div>
            <TopButtonNavigation type={""} />

            <FooterNavigation />
        </PaymentSuccessView>
    )
}

export default PaymentSuccess;