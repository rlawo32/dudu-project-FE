import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const PaymentFailed = () => {
    const navigate = useNavigate();

    useEffect(() => {
        alert('결제 실패!');
        navigate("/");
        // window.location.reload();
    }, [])

    return (
        <div>
            <h1>결제실패</h1>
        </div>
    )
}

export default PaymentFailed;