import {useEffect} from "react";
import {useLocation} from "react-router-dom";

declare global {
    interface Window {
        PaymentWidget: any;
    }
}

const LecturePayment = () => {
    const location = useLocation();
    const lectureNo:number = location.state.lectureNo;
    const lectureFee:number = location.state.lectureFee;
    const lectureTitle:number = location.state.lectureTitle;


    const clientKey:string|undefined = process.env.REACT_APP_TOSS_CLIENT_KEY;
    const secretKey:string = "";
    const customerKey:string = "YbX2HuSlsC9uVJW6NMRMj"; // custom 가능 (memberNo 넣어주기)

    useEffect(() => {
        const script:HTMLScriptElement = document.createElement("script");
        script.async = true;
        script.src = `https://js.tosspayments.com/v1/payment-widget`;
        document.head.appendChild(script);

        script.addEventListener("load", ():void => {
            const button:HTMLElement|null = document.getElementById("payment-button");
            const paymentWidget = window.PaymentWidget(clientKey, customerKey);

            paymentWidget.renderPaymentMethods(
                '#payment-widget',
                { value: lectureFee },
                { variantKey: "DEFAULT" })
            paymentWidget.renderAgreement(
                '#payment-agreement',
                { variantKey: "AGREEMENT" })

            if(button !== null) {
                button.addEventListener("click", ():void => {
                    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
                    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
                    paymentWidget.requestPayment({
                        orderId: lectureNo,
                        orderName: lectureTitle,
                        successUrl: window.location.origin + "/paymentSuccess",
                        failUrl: window.location.origin + "/fail",
                        customerEmail: "customer123@gmail.com",
                        customerName: "김토스",
                        customerMobilePhone: "01012341234",
                    });
                });
            }

        })
    }, [])

    return (
        <div>
            <div>결제금액 : {lectureFee}</div>
            <div id="payment-widget"></div>
            <div id="payment-agreement"></div>
            <button id="payment-button">결제하기</button>
        </div>
    )
}

export default LecturePayment;