import React, {useRef, useState} from "react";
import axios from "axios";

import useJoinProgressStore from "../../stores/useJoinProgressStore";

import * as Styled from "../SignUp.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye as passwordSeeIcon} from "@fortawesome/free-solid-svg-icons";

const EnterInfo = ():any => {
    const passwordRef:any = useRef<any>();
    const passwordChkRef:any = useRef<any>();

    // 회원가입 값
    const [memberId, setMemberId] = useState<string>("");
    const [memberName, setMemberName] = useState<string>("");
    const [memberPw, setMemberPw] = useState<string>("");
    const [memberGender, setMemberGender] = useState<string>("");
    const [memberBirth, setMemberBirth] = useState<string>("");
    const [memberPhone, setMemberPhone] = useState<string>("");

    // 경고 메시지
    const [memberIdMessage, setMemberIdMessage] = useState<string>("");
    const [memberNameMessage, setMemberNameMessage] = useState<string>("");
    const [memberPwMessage, setMemberPwMessage] = useState<string>("");
    const [memberPwChkMessage, setMemberPwChkMessage] = useState<string>("");
    const [memberGenderMessage, setMemberGenderMessage] = useState<string>("");
    const [memberBirthMessage, setMemberBirthMessage] = useState<string>("");
    const [memberPhoneMessage, setMemberPhoneMessage] = useState<string>("");

    // 유효성 검사
    const [isMemberIdEffect, setIsMemberIdEffect] = useState<boolean>(true);
    const [isMemberNameEffect, setIsMemberNameEffect] = useState<boolean>(true);
    const [isMemberPwEffect, setIsMemberPwEffect] = useState<boolean>(true);
    const [isMemberPwChkEffect, setIsMemberPwChkEffect] = useState<boolean>(true);
    const [isMemberGenderEffect, setIsMemberGenderEffect] = useState<boolean>(true);
    const [isMemberBirthEffect, setIsMemberBirthEffect] = useState<boolean>(true);
    const [isMemberPhoneEffect, setIsMemberPhoneEffect] = useState<boolean>(true);

    // 데이터 검사
    const [isMemberIdConfirm, setIsMemberIdConfirm] = useState<boolean>(false);
    const [isMemberNameConfirm, setIsMemberNameConfirm] = useState<boolean>(false);
    const [isMemberPwConfirm, setIsMemberPwConfirm] = useState<boolean>(false);
    const [isMemberGenderConfirm, setIsMemberGenderConfirm] = useState<boolean>(false);
    const [isMemberBirthConfirm, setIsMemberBirthConfirm] = useState<boolean>(false);
    const [isMemberPhoneConfirm, setIsMemberPhoneConfirm] = useState<boolean>(false);

    // 성별 버튼
    const [isMemberGenderM, setIsMemberGenderM] = useState<boolean>(false);
    const [isMemberGenderF, setIsMemberGenderF] = useState<boolean>(false);

    const {setActiveProgressTab, inputMemberEmail, inputTermsAgree} = useJoinProgressStore();

    const memberIdRegex = (data:string):void => {
        const regexChk:RegExp = /^[a-zA-Z]?[0-9a-zA-Z]{5,50}$/i;
        const currentData:string = data;

        setMemberId(currentData);

        if(!regexChk.test(currentData)) {
            setMemberIdMessage('아이디를 다시 확인해주세요.');
            setIsMemberIdEffect(false);
            setIsMemberIdConfirm(false);
        } else {
            setMemberIdMessage('');
            setIsMemberIdEffect(true);
            setIsMemberIdConfirm(true);
        }
    }

    const memberIdDuplicationHandler = ():void => {
        if(isMemberIdConfirm) {
            axios({
                method: "GET",
                url: "/member/memberIdDuplicationChk",
                params: {memberId: memberId}
            }).then((res) => {
                if(res.data) {
                    setIsMemberIdEffect(false);
                    setMemberIdMessage('이미 가입된 아이디입니다.');
                } else {
                    setIsMemberIdEffect(true);
                    setMemberIdMessage('');
                }
            }).catch((err):void => {
                console.log(err.message);
            })
        }
    }

    const memberNameRegex = (data:string):void => {
        const regexChk:RegExp = /^[ㄱ-ㅎ가-힣a-zA-Z]+$/i;
        const currentData:string = data;

        setMemberName(currentData);

        if(!regexChk.test(currentData)) {
            setMemberNameMessage('이름을 다시 확인해주세요.');
            setIsMemberNameEffect(false);
            setIsMemberNameConfirm(false);
        } else {
            setMemberNameMessage('');
            setIsMemberNameEffect(true);
            setIsMemberNameConfirm(true);
        }
    }

    const memberPwRegex = (data:string):void => {
        const regexChk:RegExp = /^(?=.*[a-zA-Z])(?=.*[!?@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
        const currentData:string = data;

        setMemberPw(currentData);

        if(!regexChk.test(currentData)) {
            setMemberPwMessage('8~16자 영문 대소문자, 숫자, 특수문자를 조합해주세요');
            setIsMemberPwEffect(false);
        } else {
            setMemberPwMessage('');
            setIsMemberPwEffect(true);
        }
    }

    const memberPwChkRegex = (data:string):void => {
        const currentData:string = data;

        if(memberPw !== currentData) {
            setMemberPwChkMessage('비밀번호를 다시 확인해주세요.');
            setIsMemberPwChkEffect(false);
            setIsMemberPwConfirm(false);
        } else {
            setMemberPwChkMessage('');
            setIsMemberPwChkEffect(true);
            setIsMemberPwConfirm(true);
        }
    }

    const memberGenderRegex = (data:string):void => {
        const currentData:string = data;

        if(currentData === 'M') {
            setIsMemberGenderM(true);
            setIsMemberGenderF(false);
        } else {
            setIsMemberGenderM(false);
            setIsMemberGenderF(true);
        }

        setMemberGender(currentData);
        setMemberGenderMessage('');
        setIsMemberGenderEffect(true);
        setIsMemberGenderConfirm(true);
    }

    const memberBirthRegex = (data:string):void => {
        const regexChk:RegExp = /^[0-9]{8}$/;
        const currentData:string = data;

        setMemberBirth(currentData);

        if(!regexChk.test(currentData)) {
            setMemberBirthMessage('생년월일을 다시 확인해주세요.');
            setIsMemberBirthEffect(false);
            setIsMemberBirthConfirm(false);
        } else {
            setMemberBirthMessage('');
            setIsMemberBirthEffect(true);
            setIsMemberBirthConfirm(true);
        }
    }

    const memberPhoneRegex = (data:string):void => {
        const regexChk:RegExp = /^[0-9]{11}$/;
        const currentData:string = data;

        setMemberPhone(currentData);

        if(!regexChk.test(currentData)) {
            setMemberPhoneMessage('전화번호를 다시 확인해주세요.');
            setIsMemberPhoneEffect(false);
            setIsMemberPhoneConfirm(false);
        } else {
            setMemberPhoneMessage('');
            setIsMemberPhoneEffect(true);
            setIsMemberPhoneConfirm(true);
        }
    }

    const passwordSeeHandler = (type:string):void => {
        if(type === 'chk') {
            const typeCheck = passwordChkRef.current.type;
            if(typeCheck === 'password') {
                passwordChkRef.current.type = 'text';
            } else {
                passwordChkRef.current.type = 'password';
            }
        } else {
            const typeCheck = passwordRef.current.type;
            if(typeCheck === 'password') {
                passwordRef.current.type = 'text';
            } else {
                passwordRef.current.type = 'password';
            }
        }
    }

    const signUpHandler = ():void => {

        const signUpData:object = {
            memberEmail: inputMemberEmail,
            memberId: memberId,
            memberName: memberName,
            memberPw: memberPw,
            memberGender: memberGender,
            memberBirth: memberBirth,
            memberPhone: memberPhone,
            memberTermsAgree: inputTermsAgree
        }

        if(!isMemberIdConfirm) { // memberId Check
            setMemberIdMessage('아이디를 다시 확인해주세요.');
            setIsMemberIdEffect(false);
            setIsMemberIdConfirm(false);
        } else if(!isMemberNameConfirm) { // memberName Check
            setMemberNameMessage('이름을 다시 확인해주세요.');
            setIsMemberNameEffect(false);
            setIsMemberNameConfirm(false);
        } else if(!isMemberPwConfirm) { // memberPw Check
            setMemberPwChkMessage('비밀번호를 다시 확인해주세요.');
            setIsMemberPwChkEffect(false);
            setIsMemberPwConfirm(false);
        } else if(!isMemberGenderConfirm) { // memberGender Check
            setMemberGenderMessage('성별을 선택해주세요.');
            setIsMemberGenderEffect(false);
            setIsMemberGenderConfirm(false);
        } else if(!isMemberBirthConfirm) { // memberBirth Check
            setMemberBirthMessage('생년월일을 다시 확인해주세요.');
            setIsMemberBirthEffect(false);
            setIsMemberBirthConfirm(false);
        } else if(!isMemberPhoneConfirm) { // memberPhone Check
            setMemberPhoneMessage('전화번호를 다시 확인해주세요.');
            setIsMemberPhoneEffect(false);
            setIsMemberPhoneConfirm(false);
        } else {
            axios({
                method: "POST",
                url: "/member/signUp",
                data: JSON.stringify(signUpData),
                headers: {'Content-type': 'application/json'}
            }).then((res) => {
                setActiveProgressTab("joinProgress4");
            }).catch((err):void => {
                console.log(err.message);
            })
        }
    }

    return (
        <Styled.EnterInfoView>
            <h1>정보 입력</h1>
            <div>
                <div className="input-box">
                    <span className="input-title">이메일</span>
                    <div className="input-text">
                        <Styled.EnterInfoInput type="text" value={inputMemberEmail} readOnly={true}/>
                    </div>
                </div>
                <div className="input-box">
                    <span className="input-title">아이디</span>
                    <div className="input-text">
                        <Styled.EnterInfoInput type="text" onChange={(data) => memberIdRegex(data.target.value)} placeholder="아이디"
                                               style={ isMemberIdEffect ? {} : {border: '3px solid red'} } onBlur={memberIdDuplicationHandler} />
                        <div style={  isMemberIdEffect ? {display:'none'} : {display:'block', color:'red', fontSize:'13px', marginLeft:'5px'} }>
                            {memberIdMessage}
                        </div>
                    </div>
                </div>
                <div className="input-box">
                    <span className="input-title">이름</span>
                    <div className="input-text">
                        <Styled.EnterInfoInput type="text" onChange={(data) => memberNameRegex(data.target.value)} placeholder="이름"
                                               style={ isMemberNameEffect ? {} : {border: '3px solid red'} } />
                        <div style={  isMemberNameEffect ? {display:'none'} : {display:'block', color:'red', fontSize:'13px', marginLeft:'5px'} }>
                            {memberNameMessage}
                        </div>
                    </div>
                </div>
                <div className="input-box">
                    <span className="input-title">비밀번호</span>
                    <div className="input-text">
                        <div className="input-password">
                            <Styled.EnterInfoInput type="password" onChange={(e) => memberPwRegex(e.target.value)} placeholder="비밀번호"
                                                   style={ isMemberPwEffect ? {} : {border: '3px solid red'} } ref={passwordRef}/>
                            <FontAwesomeIcon icon={passwordSeeIcon} className="icon-see"
                                             onClick={() => passwordSeeHandler("")}/>
                        </div>
                        <div style={  isMemberPwEffect ? {display:'none'} : {display:'block', color:'red', fontSize:'10px', marginLeft:'5px'} }>
                            {memberPwMessage}
                        </div>
                    </div>
                </div>
                <div className="input-box">
                    <span className="input-title">비밀번호 확인</span>
                    <div className="input-text">
                        <div className="input-password">
                            <Styled.EnterInfoInput type="password" onChange={(e) => memberPwChkRegex(e.target.value)} placeholder="비밀번호 확인"
                                                   style={ isMemberPwChkEffect ? {} : {border: '3px solid red'} } ref={passwordChkRef}/>
                            <FontAwesomeIcon icon={passwordSeeIcon} className="icon-see"
                                             onClick={() => passwordSeeHandler("chk")}/>
                        </div>
                        <div style={  isMemberPwChkEffect ? {display:'none'} : {display:'block', color:'red', fontSize:'11px', marginLeft:'5px'} }>
                            {memberPwChkMessage}
                        </div>
                    </div>
                </div>
                <div className="input-box">
                    <span className="input-title">성별</span>
                    <div className="input-text">
                        <div style={ isMemberGenderEffect ? {} : {border: '2px solid red'} } className="input-gender">
                            <Styled.EnterInfoButtonM onClick={() => memberGenderRegex("M")}
                                                    style={isMemberGenderM ? {backgroundColor: 'deepskyblue', fontWeight: 'bold'} : {}}>
                                남자
                            </Styled.EnterInfoButtonM>
                            <Styled.EnterInfoButtonF onClick={() => memberGenderRegex("F")}
                                                    style={isMemberGenderF ? {backgroundColor: 'deepskyblue', fontWeight: 'bold'} : {}}>
                                여자
                            </Styled.EnterInfoButtonF>
                        </div>
                        <div style={  isMemberGenderEffect ? {display:'none'} : {display:'block', color:'red', fontSize:'13px', marginLeft:'5px'} }>
                            {memberGenderMessage}
                        </div>
                    </div>
                </div>
                <div className="input-box">
                    <span className="input-title">생년월일</span>
                    <div className="input-text">
                        <Styled.EnterInfoInput type="text" onChange={(e) => memberBirthRegex(e.target.value)} placeholder="생년월일 8자리"
                                               onBlur={() => {memberBirth.length >= 8 ?
                                                   setMemberBirth(memberBirth.substring(0, 4) + "." + memberBirth.substring(4, 6) + "." + memberBirth.substring(6))
                                                   : setMemberBirth(memberBirth)}} value={memberBirth}
                                               style={ isMemberBirthEffect ? {} : {border: '3px solid red'} } />
                        <div style={  isMemberBirthEffect ? {display:'none'} : {display:'block', color:'red', fontSize:'13px', marginLeft:'5px'} }>
                            {memberBirthMessage}
                        </div>
                    </div>
                </div>
                <div className="input-box">
                    <span className="input-title">전화번호</span>
                    <div className="input-text">
                        <Styled.EnterInfoInput type="text" onChange={(e) => memberPhoneRegex(e.target.value)} placeholder="- 없이 입력해주세요."
                                               style={ isMemberPhoneEffect ? {} : {border: '3px solid red'} } />
                        <div style={  isMemberPhoneEffect ? {display:'none'} : {display:'block', color:'red', fontSize:'13px', marginLeft:'5px'} }>
                            {memberPhoneMessage}
                        </div>
                    </div>
                </div>
            </div>
            <div className="enterInfo-button">
                <Styled.SignUpButton onClick={() => signUpHandler()}>회원 가입</Styled.SignUpButton>
            </div>
        </Styled.EnterInfoView>
    )
}

export default EnterInfo;