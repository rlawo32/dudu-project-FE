import {useLocation} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {useDrag} from "react-use-gesture";
import axios from "axios";

declare global {
    interface Window {
        PaymentWidget: any;
    }
}

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
    const clientKey:string|undefined = process.env.REACT_APP_TOSS_CLIENT_KEY;

    useEffect(() => {
        const script:HTMLScriptElement = document.createElement("script");
        script.async = true;
        script.src = `https://js.tosspayments.com/v1/payment-widget`;
        document.head.appendChild(script);

        axios({
            method: "GET",
            url: "/member/findMemberInfo",
        }).then((res):void => {
            console.log(res)
            const memberInfo = res.data.data;
            const paymentInfo:any[] = location.state;
            const customerKey:string = Math.random().toString(16).substring(2) + "_" + memberInfo.memberNo;
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
            console.log(customerKey)
            console.log(orderName)

            script.addEventListener("load", ():void => {
                const button:HTMLElement|null = document.getElementById("payment-button");
                const paymentWidget = window.PaymentWidget(clientKey, customerKey);
                console.log(paymentWidget)

                paymentWidget.renderPaymentMethods(
                    '#payment-widget',
                    { value: paymentFee },
                    { variantKey: "DEFAULT" })
                paymentWidget.renderAgreement(
                    '#payment-agreement',
                    { variantKey: "AGREEMENT" })

                if(button !== null) {
                    button.addEventListener("click", ():void => {
                        // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
                        // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
                        paymentWidget.requestPayment({
                            orderId: orderId,
                            orderName: orderName,
                            successUrl: window.location.origin + "/paymentSuccess",
                            failUrl: window.location.origin + "/fail",
                            customerEmail: memberInfo.memberEmail,
                            customerName: memberInfo.memberName,
                            customerMobilePhone: memberInfo.memberPhone
                        });
                    });
                }
            })
            script.addEventListener("error", (e):void => {
                e.preventDefault();
                console.log(e.message)
            })
        }).catch((err):void => {
            console.log(err.message);
        })
    }, [])

    return (
        <PaymentWidgetView ref={modalRef} x={logoPos.x} y={logoPos.y}>
            <div className="modal-bar" {...bindLogoPos()}>
                <button onClick={() => props.setIsModal(false)}>X</button>
            </div>
            <div id="payment-widget"></div>
            <div id="payment-agreement"></div>

            <button className="pl-widget-submit" id="payment-button">결제하기</button>
        </PaymentWidgetView>
    )
}

export default PaymentWidget;