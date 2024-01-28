
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

        </div>
    )
}

export default PaymentSuccess;