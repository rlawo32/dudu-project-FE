import React, {useRef, useState} from "react";
import {setCookie} from "../Cookie";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

import HeaderNavigation from "../navigation/HeaderNavigation";
import FooterNavigation from "../navigation/FooterNavigation";
import FindIdModal from "./signInComponent/FindIdModal";
import FindPwModal from "./signInComponent/FindPwModal";
import useJoinProgressStore from "../stores/useJoinProgressStore";
import useTokenExpiresStore from "../stores/useTokenExpiresStore";

import * as Styled from "./SignIn.style";
import * as Modal from "./signInComponent/Modal.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser as idIcon, faLock as pwIcon, faChevronRight as arrowIcon,
    faEye as passwordSeeIcon, faComment as kakaoIcon} from "@fortawesome/free-solid-svg-icons";

const SignIn = ():any => {
    const navigate = useNavigate();
    const passwordRef:any = useRef<any>();

    const [loginMemberId, setLoginMemberId] = useState<string>("");
    const [loginMemberPw, setLoginMemberPw] = useState<string>("");
    const [isFindIdModal, setIsFindIdModal] = useState<boolean>(false);
    const [isFindPwModal, setIsFindPwModal] = useState<boolean>(false);

    const [loginPwMessage, setLoginPwMessage] = useState<string>("");
    const [isLoginPwEffect, setIsLoginPwEffect] = useState<boolean>(true);

    const {setActiveProgressTab} = useJoinProgressStore();
    const {tokenExpiresTime, setTokenExpiresTime} = useTokenExpiresStore();

    const passwordSeeHandler = ():void => {
        const typeCheck = passwordRef.current.type;
        if(typeCheck === 'password') {
            passwordRef.current.type = 'text';
        } else {
            passwordRef.current.type = 'password';
        }
    }

    const activeEnter = (e:any):void => {
        if(e.key === "Enter") {
            signInHandler();
        }
    }

    const activeCapsLock = (e:any):void => {
        if(e.getModifierState("CapsLock")) {
            setLoginPwMessage('CapsLock 켜짐');
            setIsLoginPwEffect(false);
        } else {
            setLoginPwMessage('');
            setIsLoginPwEffect(true);
        }
    }

    const signInHandler = ():void => {
        const signInData:object = {
            memberId: loginMemberId,
            memberPw: loginMemberPw
        }

        if(loginMemberId.length < 1) {
            alert('아이디를 입력해주세요.');
        } else if(loginMemberPw.length < 1) {
            alert('비밀번호를 입력해주세요.');
        } else {
            axios({
                method: "POST",
                url: "/member/signIn",
                data: JSON.stringify(signInData),
                headers: {'Content-type': 'application/json'}
            }).then((res) => {
                const responseData = res.data;
                if(responseData.data) {
                    const { grantType, accessToken, refreshToken, accessTokenExpires, accessTokenExpiresDate} = responseData.data;
                    const expires:number = accessTokenExpires;
                    setTokenExpiresTime(expires);
                    const expiresDate:Date = new Date(accessTokenExpiresDate);

                    axios.defaults.headers.common['Authorization'] = `${grantType} ${accessToken}`;

                    setCookie('refreshToken', refreshToken, {
                        path: '/',
                        // httpOnly: true,
                        secure: true,
                        expires: expiresDate
                    });
                    axios({
                        method: "GET",
                        url: "/member/getRole"
                    }).then((res) => {
                        window.localStorage.setItem("role", res.data);
                        navigate("/");
                    }).catch((err) => {
                        console.log(err.message);
                    })
                } else {
                    alert(responseData.message);
                }
            }).catch((err) => {
                const errCode:string = err.message.substring(err.message.length-3);

                if(errCode === '401' || errCode === '403') { // 대부분 access token 만료로 인한 오류
                    alert('새로고침을 한번 해주세요');
                }
            })
        }
    }

    return (
        <Styled.SignInMain>
            <HeaderNavigation />

            <div className="login-view">
                <div className="signUp-view">
                    <div className="signUp-box">
                        <p>
                            첫 방문이신가요?
                        </p>
                        <p>
                            수강신청 관련 서비스를 이용하시려면 회원가입을 해주세요.
                        </p>
                        <Link to="/signUp" onClick={() => setActiveProgressTab("joinProgress1")} className="link-custom">
                            회원가입 <FontAwesomeIcon icon={arrowIcon} className="icon-custom" />
                        </Link>
                    </div>
                </div>
                <div className="signIn-view">
                    <div className="signIn-box">
                        <h1>로그인</h1>
                        <Styled.InputBox>
                            <FontAwesomeIcon icon={idIcon} className="icon-custom" />
                            <Styled.SignInInput type="text" onChange={(e) => setLoginMemberId(e.target.value)}
                                                onKeyDown={(e) => activeEnter(e)} placeholder="아이디를 입력해주세요."/>
                        </Styled.InputBox>
                        <div className="section-password">
                            <Styled.InputBox>
                                <FontAwesomeIcon icon={pwIcon} className="icon-custom" />
                                <Styled.SignInInput type="password" onChange={(e) => setLoginMemberPw(e.target.value)}
                                                    onKeyPress={(e) => activeCapsLock(e)}
                                                    onKeyDown={(e) => activeEnter(e)} placeholder="비밀번호를 입력해주세요."
                                                    ref={passwordRef}/>
                                <FontAwesomeIcon icon={passwordSeeIcon} className="icon-see"
                                                 onClick={() => passwordSeeHandler()}/>
                            </Styled.InputBox>
                            <div style={  isLoginPwEffect ? {display:'none'} : {display:'block', color:'red', fontSize:'14px', marginLeft:'35px'} }>
                                {loginPwMessage}
                            </div>
                        </div>

                        <Styled.SignInButton onClick={() => signInHandler()}>로그인</Styled.SignInButton>

                        <Styled.FindButton>
                            <button onClick={() => setIsFindIdModal(true)}>아이디 찾기</button>
                            <span></span>
                            <button onClick={() => setIsFindPwModal(true)}>비밀번호 찾기</button>
                        </Styled.FindButton>

                        <Styled.LoginKakaoButton onClick={() => window.location.href=process.env.REACT_APP_BASE_URL + "/oauth2/authorization/kakao"}>
                            <FontAwesomeIcon icon={kakaoIcon} className="icon-custom"/>
                            <span>카카오</span>
                        </Styled.LoginKakaoButton>
                        <Styled.LoginNaverButton onClick={() => window.location.href=process.env.REACT_APP_BASE_URL + "/oauth2/authorization/naver"}>
                            <span className="icon-custom">N</span>
                            <span>네이버</span>
                        </Styled.LoginNaverButton>
                    </div>
                    {isFindIdModal ?
                        <Modal.ModalView>
                            <FindIdModal setIsFindIdModal={setIsFindIdModal} />
                        </Modal.ModalView>
                        : <div />}
                    {isFindPwModal ?
                        <Modal.ModalView>
                            <FindPwModal setIsFindPwModal={setIsFindPwModal} />
                        </Modal.ModalView>
                        : <div />}
                </div>
            </div>

            <FooterNavigation />
        </Styled.SignInMain>
    )

}

export default SignIn;