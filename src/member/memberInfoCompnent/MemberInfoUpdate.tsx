import React, {useEffect, useRef, useState} from "react";
import axios from "axios";

import MemberAuth from "../MemberAuth";
import useJoinProgressStore from "../../stores/useJoinProgressStore";

import * as Styled from "./MemberInfoModal.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye as passwordSeeIcon} from "@fortawesome/free-solid-svg-icons";

interface Props {
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
    memberData: {
        memberNo:number;
        memberEmail:string;
        memberId:string;
        memberName:string;
        memberGender:string;
        memberBirth:string;
        memberPhone:string;
    };
}

const MemberInfoUpdate = (props:Props) => {
    const modalRef:any = useRef<any>();
    const passwordRef:any = useRef<any>();

    const {inputMemberEmail} = useJoinProgressStore();

    const [memberName, setMemberName] = useState<string>(props.memberData.memberName);
    const [memberBirth, setMemberBirth] = useState<string>(props.memberData.memberBirth);
    const [memberPhone, setMemberPhone] = useState<string>(props.memberData.memberPhone);
    const [memberGender, setMemberGender] = useState<string>(props.memberData.memberGender);

    const [memberNameMessage, setMemberNameMessage] = useState<string>("");
    const [memberBirthMessage, setMemberBirthMessage] = useState<string>("");
    const [memberPhoneMessage, setMemberPhoneMessage] = useState<string>("");
    const [memberGenderMessage, setMemberGenderMessage] = useState<string>("");

    const [isMemberNameEffect, setIsMemberNameEffect] = useState<boolean>(true);
    const [isMemberBirthEffect, setIsMemberBirthEffect] = useState<boolean>(true);
    const [isMemberPhoneEffect, setIsMemberPhoneEffect] = useState<boolean>(true);
    const [isMemberGenderEffect, setIsMemberGenderEffect] = useState<boolean>(true);

    const [isEmailAuthModal, setIsEmailAuthModal] = useState<boolean>(true);
    const [isInfoUpdateModal, setIsInfoUpdateModal] = useState<boolean>(true);

    const [memberPresentPwChk, setMemberPresentPwChk] = useState<string>("");
    const [isPresentPwChkEffect, setIsPresentPwChkEffect] = useState<boolean>(true);
    const [presentPwChkMessage, setPresentPwChkMessage] = useState<string>("");

    const [isCapsLockEffect, setIsCapsLockEffect] = useState<boolean>(true);
    const [capsLockMessage, setCapsLockMessage] = useState<string>("");

    const memberNameRegex = (data:string):void => {
        const regexChk:RegExp = /^[ㄱ-ㅎ가-힣a-zA-Z]+$/i;
        const currentData:string = data;

        setMemberName(currentData);

        if(!regexChk.test(currentData)) {
            setMemberNameMessage('이름을 다시 확인해주세요.');
            setIsMemberNameEffect(false);
        } else {
            setMemberNameMessage('');
            setIsMemberNameEffect(true);
        }
    }

    const memberBirthRegex = (data:string):void => {
        const regexChk:RegExp = /^[0-9]{8}$/;
        const currentData:string = data;

        setMemberBirth(currentData);

        if(!regexChk.test(currentData)) {
            setMemberBirthMessage('생년월일을 다시 확인해주세요.');
            setIsMemberBirthEffect(false);
        } else {
            setMemberBirthMessage('');
            setIsMemberBirthEffect(true);
        }
    }

    const memberPhoneRegex = (data:string):void => {
        const regexChk:RegExp = /^[0-9]{11}$/;
        const currentData:string = data;

        setMemberPhone(currentData);

        if(!regexChk.test(currentData)) {
            setMemberPhoneMessage('전화번호를 다시 확인해주세요.');
            setIsMemberPhoneEffect(false);
        } else {
            setMemberPhoneMessage('');
            setIsMemberPhoneEffect(true);
        }
    }

    const memberGenderRegex = (data:string):void => {
        const currentData:string = data;

        setMemberGender(currentData);
        setMemberGenderMessage('');
        setIsMemberGenderEffect(true);
    }

    const memberPresentPwCheckHandler = (data:string):void => {
        const passwordRegex:RegExp = /^(?=.*[a-zA-Z])(?=.*[!?@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
        const presentPwChk:string = data;

        if (!passwordRegex.test(presentPwChk)) {
            setPresentPwChkMessage('8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.');
            setIsPresentPwChkEffect(false);
        } else {
            setPresentPwChkMessage('');
            setIsPresentPwChkEffect(true);
        }
        setMemberPresentPwChk(presentPwChk);
    }

    const updateMemberInfoChk = async():Promise<void> => {
        if(isMemberNameEffect && isMemberBirthEffect && isMemberPhoneEffect) {
            setIsInfoUpdateModal(false);
        } else {
            if(!isMemberNameEffect) {
                alert("이름이 잘못 입력되었습니다.");
                setMemberNameMessage('이름을 다시 확인해주세요.');
                setIsMemberNameEffect(false);
            } else if(!isMemberBirthEffect) {
                alert("생년월일이 잘못 입력되었습니다.");
                setMemberBirthMessage('생년월일을 다시 확인해주세요.');
                setIsMemberBirthEffect(false);
            } else if(!isMemberPhoneEffect) {
                alert("전화번호가 잘못 입력되었습니다.");
                setMemberPhoneMessage('전화번호를 다시 확인해주세요.');
                setIsMemberPhoneEffect(false);
            }
        }
    }

    const passwordSeeHandler = ():void => {
        const typeCheck = passwordRef.current.type;
        if(typeCheck === 'password') {
            passwordRef.current.type = 'text';
        } else {
            passwordRef.current.type = 'password';
        }
    }

    const activeCapsLock = (e:any):void => {
        if(e.getModifierState("CapsLock")) {
            setCapsLockMessage('CapsLock 켜짐');
            setIsCapsLockEffect(false);
        } else {
            setCapsLockMessage('');
            setIsCapsLockEffect(true);
        }
    }

    const updateMemberInfoHandler = async():Promise<boolean> => {
        const memberInfoData = {
            memberName: memberName,
            memberEmail: inputMemberEmail,
            memberBirth: memberBirth,
            memberPhone: memberPhone,
            memberGender: memberGender
        }
        if(window.confirm('정말 회원정보를 수정하시겠습니까?') === true) {
            await axios({
                method: "GET",
                url: "/member/memberPwDuplicationChk",
                params: {passwordCheck: memberPresentPwChk}
            }).then((res):void => {
                if(res.data) {
                    setPresentPwChkMessage('');
                    setIsPresentPwChkEffect(true);
                    axios({
                        method: "PUT",
                        url: "member/memberInfoUpdate",
                        data: JSON.stringify(memberInfoData),
                        headers: {'Content-type': 'application/json'}
                    }).then((res):void => {
                        window.alert("수정이 완료되었습니다.");
                        window.location.reload();
                        props.setIsModal(false);
                    })
                } else {
                    alert("현재 비밀번호와 다릅니다.");
                    setPresentPwChkMessage('현재 비밀번호와 다릅니다.');
                    setIsPresentPwChkEffect(false);
                }
            })
            return true;
        } else {
            return false;
        }
    }

    useEffect(()=>{
        const handleClickOutside = (e:MouseEvent)=> {
            if(modalRef.current && !modalRef.current.contains(e.target)) {
                props.setIsModal(false)
            }
        }
        window.addEventListener('mousedown',handleClickOutside)

        return()=>{
            window.removeEventListener('mousedown',handleClickOutside)
        }
    })

    return (
        <Styled.MemberInfoUpdateView ref={modalRef}>

            <div className="mi-infoUpdate-view">
                <div className="mi-modal-title">
                    회원정보 수정
                </div>
                <div className="mi-modal-notice">
                    <ul>
                        <li>회원정보 수정 시 현재 비밀번호를 입력해야 수정이 완료됩니다.</li>
                        <li>이메일은 이메일 인증을 통해 수정이 가능합니다.</li>
                    </ul>
                </div>
                <div className="mi-input-section">
                    <div className="input-item">
                        <div className="item-top">
                            <div>이름</div>
                            <input type="text" value={memberName} onChange={(data) => memberNameRegex(data.target.value)} placeholder="이름"
                                   style={ isMemberNameEffect ? {} : {border: '2px solid red'} } />
                        </div>
                        <div className="item-bot" style={ isMemberNameEffect ? {display:'none'} :
                            {display:'block', color:'red', fontSize:'13px', marginLeft:'115px'} }>
                            {memberNameMessage}
                        </div>
                    </div>
                    <div className="input-item">
                        <div className="item-top">
                            <div>이메일</div>
                            <input type="text" value={inputMemberEmail} readOnly={true}/>
                            <button className="btn-update" onClick={() => setIsEmailAuthModal(false)}>인증</button>
                        </div>
                    </div>
                    <div className="input-item">
                        <div className="item-top">
                            <div>생년월일</div>
                            <input type="text" value={memberBirth} onChange={(e) => memberBirthRegex(e.target.value)}
                                   placeholder="생년월일 8자리"
                                   onFocus={() => setMemberBirth(memberBirth.replaceAll(".", ""))}
                                   onBlur={() => {memberBirth.length >= 8 ?
                                       setMemberBirth(memberBirth.substring(0, 4) + "." + memberBirth.substring(4, 6) + "." + memberBirth.substring(6))
                                       : setMemberBirth(memberBirth)}} style={ isMemberBirthEffect ? {} : {border: '2px solid red'} } />
                        </div>
                        <div className="item-bot"
                             style={ isMemberBirthEffect ? {display:'none'} :
                                 {display:'block', color:'red', fontSize:'13px', marginLeft:'115px'} }>
                            {memberBirthMessage}
                        </div>
                    </div>
                    <div className="input-item">
                        <div className="item-top">
                            <div>휴대전화</div>
                            <input type="text" value={memberPhone} onChange={(e) => memberPhoneRegex(e.target.value)} placeholder="- 없이 입력해주세요."
                                   style={ isMemberPhoneEffect ? {} : {border: '2px solid red'} } />
                        </div>
                        <div className="item-bot"
                             style={ isMemberPhoneEffect ? {display:'none'} :
                                 {display:'block', color:'red', fontSize:'13px', marginLeft:'115px'} }>
                            {memberPhoneMessage}
                        </div>
                    </div>
                    <div className="input-item">
                        <div className="item-top">
                            <div>성별</div>
                            <div style={ isMemberGenderEffect ? {} : {border: '2px solid red'} } className="input-gender">
                                <button onClick={() => memberGenderRegex("M")} className="btn-gender"
                                        style={memberGender === 'M' ? {backgroundColor: 'deepskyblue', fontWeight: 'bold'} : {}}>
                                    남자
                                </button>
                                <button onClick={() => memberGenderRegex("F")} className="btn-gender"
                                        style={memberGender === 'F' ? {backgroundColor: 'deepskyblue', fontWeight: 'bold'} : {}}>
                                    여자
                                </button>
                            </div>
                        </div>
                        <div className="item-bot"
                             style={ isMemberGenderEffect ? {display:'none'} :
                                 {display:'block', color:'red', fontSize:'13px', marginLeft:'115px'} }>
                            {memberGenderMessage}
                        </div>
                    </div>
                    <div className="mi-modal-section">
                        {isEmailAuthModal ? <div/> :
                            <div className="modal-view">
                                <div className="modal-title">
                                    이메일 인증
                                </div>
                                <div className="modal-emailAuth-input">
                                    <MemberAuth setIsMemberEmailCheck={setIsEmailAuthModal} duplicationChk={true} />
                                </div>
                                <div className="btn-cancel">
                                    <button onClick={() => setIsEmailAuthModal(true)}>닫기</button>
                                </div>
                            </div>}
                        {isInfoUpdateModal ? <div/> :
                            <div className="modal-view">
                                <div className="modal-title">
                                    비밀번호 확인
                                </div>
                                <div className="modal-infoUpdate-input">
                                    <div>현재 비밀번호 입력</div>
                                    <div className="input-password">
                                        <input type="password" value={memberPresentPwChk} style={ isPresentPwChkEffect ? {} : {borderColor:'red'} }
                                               onChange={(e) => memberPresentPwCheckHandler(e.target.value)}
                                               onKeyPress={(e) => activeCapsLock(e)} ref={passwordRef}/>
                                        <FontAwesomeIcon icon={passwordSeeIcon} className="icon-see"
                                                         onClick={() => passwordSeeHandler()}/>
                                    </div>
                                    <div style={ isPresentPwChkEffect ? {} : {color:'red', fontSize:'11px', marginLeft: '5px', fontWeight: 'bold'} }>{presentPwChkMessage}</div>
                                    <div style={ isCapsLockEffect ? {display:'none'} : {display:'block', color:'red', fontSize:'10px', marginLeft:'5px'} }
                                         className="capsLock-section">
                                        {capsLockMessage}
                                    </div>
                                </div>
                                <div className="modal-btn">
                                    <button onClick={() => setIsInfoUpdateModal(true)} className="btn-cancel">닫기</button>
                                    <button onClick={() => updateMemberInfoHandler()} className="btn-submit">확인</button>
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
            <div className="mi-button-section">
                <button onClick={() => props.setIsModal(false)} className="btn-cancel">취소</button>
                <button onClick={() => updateMemberInfoChk()} className="btn-submit">수정하기</button>
            </div>

        </Styled.MemberInfoUpdateView>
    )
}

export default MemberInfoUpdate;