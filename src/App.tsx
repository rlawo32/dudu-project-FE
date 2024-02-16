import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import {getCookie, removeCookie, setCookie} from "./Cookie";
import {ThemeProvider} from "styled-components";
import axios from "axios";

import MainHome from './home/MainHome';
// member
import SignIn from "./member/SignIn";
import SignUp from "./member/SignUp";
import TermsAgree from "./member/signUpComponent/TermsAgree";
import EmailAuth from "./member/signUpComponent/EmailAuth";
import EnterInfo from "./member/signUpComponent/EnterInfo";
import JoinComplete from "./member/signUpComponent/JoinComplete";
import MemberInfo from "./member/MemberInfo";
import LectureBasket from "./member/memberInfoCompnent/LectureBasket";
import LectureHistory from "./member/memberInfoCompnent/LectureHistory";
import LectureReview from "./member/memberInfoCompnent/LectureReview";
import MemberLog from "./member/memberInfoCompnent/MemberLog";
// lecture
import LectureWrite from "./lecture/LectureWrite";
import LectureList from "./lecture/LectureList";
import LectureDetailView from "./lecture/LectureDetail";
import LectureEventWrite from "./lecture/LectureEventWrite";
import LectureEventListView from "./lecture/lectureListComponent/LectureEventListView";
// community
import BoardWrite from "./community/BoardWrite";
import BoardList from "./community/BoardList";
import BoardDetail from "./community/BoardDetail";
import ReviewWrite from "./community/ReviewWrite";
import ReviewList from "./community/ReviewList";
import ReviewDetail from "./community/ReviewDetail";
// information
import FaqWrite from "./information/FaqWrite";
import FaqList from "./information/FaqList";
import BranchInfoWrite from "./information/BranchInfoWrite";
import BranchInfoList from "./information/BranchInfoList";
// payment
import LecturePayment from "./payment/LecturePayment";
import PaymentSuccess from "./payment/paymentComponent/PaymentSuccess";

//
import {GlobalStyle} from "./styles/GlobalStyles";
import {darkTheme, lightTheme} from "./styles/theme";
import useThemeToggleStore from "./stores/useThemeToggleStore";
import useTokenExpiresStore from "./stores/useTokenExpiresStore";

function App() {
    const navigate = useNavigate();

    const {themeMode, setThemeMode} = useThemeToggleStore();
    const {tokenExpiresTime, setTokenExpiresTime} = useTokenExpiresStore();

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
                    setTokenExpiresTime(120000);
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

    useEffect(() => {
        const localTheme:string|null = window.localStorage.getItem("theme");
        if(localTheme === 'false') {
            setThemeMode(false);
        } else {
            setThemeMode(true);
        }
        reissue().then();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // useEffect(() => {
    //     if(tokenExpiresTime > 0) {
    //         const timer = setInterval(() => {
    //             setTokenExpiresTime(tokenExpiresTime - 1000);
    //         }, 1000);
    //
    //         if(tokenExpiresTime === 60000) {
    //         } else if(tokenExpiresTime <= 0) {
    //             clearInterval(timer);
    //         }
    //
    //         return ():void => {
    //             clearInterval(timer);
    //         };
    //     }
    // }, [tokenExpiresTime]);

  return (
    <>
        <ThemeProvider theme={themeMode ? darkTheme : lightTheme } >
            <GlobalStyle />

            <Routes>
                <Route path="/" element={<MainHome />} />

                <Route path="/signIn" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/termsAgree" element={<TermsAgree />} />
                <Route path="/emailAuth" element={<EmailAuth />} />
                <Route path="/enterInfo" element={<EnterInfo />} />
                <Route path="/joinComplete" element={<JoinComplete />} />

                <Route path="/lectureWrite" element={<LectureWrite />} />
                <Route path="/lectureList" element={<LectureList />} />
                <Route path="/lectureEventWrite" element={<LectureEventWrite />} />
                <Route path="/lectureEventList/:eventNo" element={<LectureEventListView />} />
                <Route path="/lectureDetail/:lectureNo" element={<LectureDetailView />} />

                <Route path="/boardWrite" element={<BoardWrite />} />
                <Route path="/boardList" element={<BoardList />} />
                <Route path="/boardDetail/:boardNo" element={<BoardDetail />} />
                <Route path="/reviewList" element={<ReviewList />} />
                <Route path="/reviewDetail/:reviewNo" element={<ReviewDetail />} />

                <Route path="/faqWrite" element={<FaqWrite />} />
                <Route path="/faqList" element={<FaqList />} />
                <Route path="/branchInfoWrite" element={<BranchInfoWrite />} />
                <Route path="/branchInfoList" element={<BranchInfoList />} />

                <Route path="/lecturePayment" element={<LecturePayment />} />
                <Route path="/paymentSuccess" element={<PaymentSuccess />} />

                <Route path="/memberInfo" element={<MemberInfo />} />
                <Route path="/lectureBasket" element={<LectureBasket />} />
                <Route path="/lectureHistory" element={<LectureHistory />} />
                <Route path="/lectureReview" element={<LectureReview />} />
                <Route path="/memberLog" element={<MemberLog />} />

            </Routes>
        </ThemeProvider>
    </>
  );
}

export default App;