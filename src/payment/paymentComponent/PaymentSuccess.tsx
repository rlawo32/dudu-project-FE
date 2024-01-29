import {useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);

    const paymentKey = urlParams.get("paymentKey");
    const orderId = urlParams.get("orderId");
    const amount = urlParams.get("amount");

    useEffect(() => {
        const lectureApplicationData:object = {
            paymentKey: paymentKey,
            orderId: orderId,
            amount: amount,
        }
        const paymentSuccess = async ():Promise<void> => {
            await axios({
                method: "POST",
                url: "/lecture/lectureApplicationInsert",
                data: JSON.stringify(lectureApplicationData),
                headers: {'Content-type': 'application/json'}
            }).then((res):void => {
                alert("결제가 완료되었습니다.");
                // navigate("/");
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        setTimeout(() => {paymentSuccess().then();}, 200);
    }, [])

    return (
        <div>
            <h1>결제 완료</h1>
        </div>
    )
}

export default PaymentSuccess;