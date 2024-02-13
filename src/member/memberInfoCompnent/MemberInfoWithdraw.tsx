import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {removeCookie} from "../../Cookie";
import axios from "axios";

import * as Styled from "./MemberInfoModal.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye as passwordSeeIcon} from "@fortawesome/free-solid-svg-icons";

interface Props {
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
    memberId:string;
}

const MemberInfoWithdraw = (props:Props) => {
    const navigate = useNavigate();
    const modalRef:any = useRef<any>();
    const passwordRef:any = useRef<any>();

    const [memberPresentPwChk, setMemberPresentPwChk] = useState<string>("");
    const [isPresentPwChkEffect, setIsPresentPwChkEffect] = useState<boolean>(true);
    const [presentPwChkMessage, setPresentPwChkMessage] = useState<string>("");

    const [isPreCapsLockEffect, setIsPreCapsLockEffect] = useState<boolean>(true);
    const [preCapsLockMessage, setPreCapsLockMessage] = useState<string>("");

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
            setPreCapsLockMessage('CapsLock 켜짐');
            setIsPreCapsLockEffect(false);
        } else {
            setPreCapsLockMessage('');
            setIsPreCapsLockEffect(true);
        }
    }

    const memberSecessionHandler = async ():Promise<boolean> => {
        const memberData = {
            memberId: props.memberId,
            memberPw: memberPresentPwChk
        }
        if(memberPresentPwChk.length < 1) {
            alert('비밀번호를 입력해주시길 바랍니다.');
            return false;
        } else {
            if(window.confirm('정말 회원탈퇴를 진행하시겠습니까?') === true) {
                await axios({
                    method: 'PUT',
                    url: 'member/memberWithdraw',
                    data: JSON.stringify(memberData),
                    headers: {'Content-type': 'application/json'}
                }).then((res) => {
                    const result = res.data.result;

                    if(result) {
                        alert('탈퇴가 완료되었습니다.\n계정에서 로그아웃이 됩니다.');

                        removeCookie('refreshToken');
                        window.localStorage.removeItem("role");
                        navigate("/");
                        window.location.reload();
                    } else {
                        alert('현재 비밀번호가 일치하지 않습니다.');
                    }
                })
                return true;
            } else {
                return false;
            }
        }
    }

    useEffect(()=>{
        const handleClickOutside = (e:MouseEvent)=> {
            if(modalRef.current && !modalRef.current.contains(e.target)) {
                props.setIsModal(false);
            }
        }
        window.addEventListener('mousedown',handleClickOutside)

        return()=>{
            window.removeEventListener('mousedown',handleClickOutside)
        }
    })

    return (
        <Styled.MemberInfoWithdrawView ref={modalRef}>

            <div className="mi-withdraw-view">
                <div className="mi-modal-title">
                    회원 탈퇴
                </div>
                <div className="mi-modal-notice">
                    <ul>
                        <li>현재 비밀번호를 정확히 입력해야 탈퇴가 진행됩니다.</li>
                        <li>탈퇴 후 일정기간 동안 동일한 아이디와 이메일로 재가입이 제한됩니다.</li>
                    </ul>
                </div>
                <div className="mi-input-section">
                    <div className="input-item">
                        <div>아이디</div>
                        <input type="text" value={props.memberId} readOnly={true}/>
                    </div>
                    <div className="input-item">
                        <div>현재 비밀번호</div>
                        <div className="input-password">
                            <input type="password" value={memberPresentPwChk} style={ isPresentPwChkEffect ? {} : {borderColor:'red'} }
                                   onChange={(e) => memberPresentPwCheckHandler(e.target.value)}
                                   onKeyPress={(e) => activeCapsLock(e)} ref={passwordRef}/>
                            <FontAwesomeIcon icon={passwordSeeIcon} className="icon-see"
                                             onClick={() => passwordSeeHandler()}/>
                        </div>
                        <div style={ isPresentPwChkEffect ? {} : {color:'red', fontSize:'12px', marginLeft: '7px', fontWeight: 'bold'} }>{presentPwChkMessage}</div>
                        <div style={ isPreCapsLockEffect ? {display:'none'} : {display:'block', color:'red', fontSize:'10px', marginLeft:'5px'} }
                             className="capsLock-section">
                            {preCapsLockMessage}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mi-button-section">
                <button onClick={() => props.setIsModal(false)} className="btn-cancel">취소</button>
                <button onClick={() => memberSecessionHandler()} className="btn-submit">탈퇴하기</button>
            </div>

        </Styled.MemberInfoWithdrawView>
    )
}

export default MemberInfoWithdraw;