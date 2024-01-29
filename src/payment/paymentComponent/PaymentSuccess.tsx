
const PaymentSuccess = () => {
    const urlParams = new URLSearchParams(window.location.search);

    const paymentKey = urlParams.get("paymentKey");
    const orderId = urlParams.get("orderId");
    const amount = urlParams.get("amount");
    console.log(paymentKey)
    console.log(orderId)
    console.log(amount)

    return (
        <div>
            <h1>결제 완료</h1>
        </div>
    )
}

export default PaymentSuccess;