import {getCookie, removeCookie, setCookie} from "./Cookie";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const reissue = async ():Promise<void> => {
    if(getCookie('refreshToken')) {
        const token:object = {
            accessToken: axios.defaults.headers.common["Authorization"]?.toString(),
            refreshToken: getCookie('refreshToken')
        }
        await axios({
            method: "POST",
            url: "/member/reissue",
            data: JSON.stringify(token),
            headers: {'Content-type': 'application/json'}
        }).then((res) => {
            const responseData = res.data;
            if(responseData.result) {
                const { grantType, accessToken, refreshToken, accessTokenExpires, accessTokenExpiresDate} = responseData.data;
                const expiresDate:Date = new Date(accessTokenExpiresDate);

                axios.defaults.headers.common['Authorization'] = `${grantType} ${accessToken}`;

                setCookie('refreshToken', refreshToken, {
                    path: '/',
                    // httpOnly: true,
                    // expires
                });
            } else {
                alert('재로그인을 해주세요1');
                removeCookie('refreshToken');
                window.localStorage.removeItem("role");
                const navigate = useNavigate();
                navigate("/");
                window.location.reload();
            }
        }).catch((err) => {
            const errCode:string = err.message.substring(err.message.length-3);

            if(errCode === '401' || errCode === '403') { // 대부분 refresh token 만료로 인한 오류
                alert('재로그인을 해주세요2');
            }
        })
    }

}



export default reissue;