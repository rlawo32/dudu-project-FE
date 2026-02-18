import React, {useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import {useDrag} from "react-use-gesture";
import styled from "styled-components";
import axios from "axios";

import * as PortOne from "@portone/browser-sdk/v2";

// declare global {
//     interface Window {
//         PaymentWidget: any;
//     }
// }

interface Props {
    isModal: boolean;
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentWidgetView = styled.div<{ x: number; y: number; }>`
  position: absolute;
  top: ${(props) => props.y + "px"};
  left: ${(props) => props.x + "px"};
  height: fit-content;
  width: 500px;
  border: 1px solid ${({theme}) => theme.textColor};
  border-radius: 15px;
  background-color: ${({theme}) => theme.bgColor};
  text-align: center;
  
  .modal-bar {
    height: 30px;
    background-color: rgba(216,201,201,0.5);
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    text-align: right;
    cursor: move;
    
    button {
      border: none;
      background: none;
      cursor: pointer;
    }
  }

  .modal-content {
    width: 100%;
    padding: 60px 0;
    text-align: center;
  }
  
  .pl-widget-submit {
    display: inline-block;
    min-height: 60px;
    min-width: 250px;
    padding: 16px 10px 17px;
    margin: 20px auto;
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
`;

const PaymentWidget = (props: Props) => {
    const modalRef:any = useRef<any>();

    const [logoPos, setLogoPos] = useState({x:0, y:0});
    const bindLogoPos = useDrag((params)=>{
        setLogoPos({
            x: params.offset[0],
            y: params.offset[1]
        })
    });

    const location = useLocation();
    const storeId:string|undefined = process.env.REACT_APP_PORTONE_STORE_ID;
    const channelKey:string|undefined = process.env.REACT_APP_PORTONE_CHANNEL_KEY;

    const paymentTrigger = async (memberInfo:any, orderId:string, customerKey:string, orderName:string, paymentFee:number, successUrl:string) => {
        try {
            const response = await PortOne.requestPayment({
                storeId: storeId!!,
                channelKey: channelKey,
                paymentId: customerKey, // 고유 주문 번호
                orderName: orderName,
                totalAmount: Number(paymentFee),
                currency: "CURRENCY_KRW",
                payMethod: "CARD",
                customer: {
                    fullName: memberInfo.memberName || "소셜사용자",
                    phoneNumber: (memberInfo.memberPhone || "01000000000").replace(/-/g, ""),
                    email: memberInfo.memberEmail || "test@test.com",
                },
                redirectUrl: successUrl,
            });

            if (!response) {
                alert("결제 응답이 없습니다.");
                return;
            }

            if (response.code !== undefined) {
                return alert(`결제 실패: ${response.message}`);
            }
            
            window.location.href = successUrl;
        } catch (err) {
            console.error("결제 프로세스 에러: ", err);
        }
    }

    useEffect(() => {
            axios({
                method: "GET",
                url: "/member/findMemberInfo",
            }).then(async (res):Promise<void> => {
                const memberInfo = res.data.data;
                const paymentInfo:any[] = location.state;
                const customerKey:string = "payment-" + Math.random().toString(16).substring(2) + "_" + memberInfo.memberNo;
                let orderId:string = Math.random().toString(16).substring(2);
                let orderName:string = paymentInfo[0].lectureTitle;
                if(paymentInfo.length > 1) {
                    orderName += " 외 " + (paymentInfo.length-1) + "건";
                }
                let paymentFee:number = 0;
                for(let i:number=0; i<paymentInfo.length; i++) {
                    orderId += "_" + paymentInfo[i].lectureNo;
                    paymentFee += paymentInfo[i].lectureFee;
                }

                const successParams = new URLSearchParams({
                    paymentKey: customerKey,
                    orderId: orderId,
                    amount: paymentFee.toString() // 보통 성공 페이지에서 금액 검증을 위해 금액도 같이 보냅니다.
                }).toString();

                const successUrl = `${window.location.origin}/paymentSuccess?${successParams}`;

                if(storeId !== undefined) {
                    paymentTrigger(memberInfo, orderId, customerKey, orderName, paymentFee, successUrl);
                }
            }).catch((err):void => {
                console.log(err.message);
            })
    }, [])

    return (
        <PaymentWidgetView ref={modalRef} x={logoPos.x} y={logoPos.y}>
            <div className="modal-bar" {...bindLogoPos()} />
            <div className="modal-content">
                결제중...
            </div>
            <button className="pl-widget-submit" onClick={() => props.setIsModal(false)}>
                닫기
            </button>
        </PaymentWidgetView>
    )
}

export default PaymentWidget;