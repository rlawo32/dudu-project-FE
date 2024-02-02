import React, {useEffect, useRef, useState} from "react";
import axios from "axios";

import * as Styled from "./MemberInfoModal.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye as passwordSeeIcon} from "@fortawesome/free-solid-svg-icons";

interface Props {
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
    memberId:string;
}

const MemberInfoPwUpdate = (props:Props) => {
    const modalRef:any = useRef<any>();
    const passwordPreRef:any = useRef<any>();
    const passwordRef:any = useRef<any>();
    const passwordChkRef:any = useRef<any>();

    const passwordRegex:RegExp = /^(?=.*[a-zA-Z])(?=.*[!?@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

    const [memberPresentPwChk, setMemberPresentPwChk] = useState<string>("");
    const [memberChangePw, setMemberChangePw] = useState<string>("");
    const [memberChangePwChk, setMemberChangePwChk] = useState<string>("");

    const [isPresentPwChkEffect, setIsPresentPwChkEffect] = useState<boolean>(true);
    const [isChangePwEffect, setIsChangePwEffect] = useState<boolean>(true);
    const [isChangePwChkEffect, setIsChangePwChkEffect] = useState<boolean>(true);

    const [presentPwChkMessage, setPresentPwChkMessage] = useState<string>("");
    const [changePwMessage, setChangePwMessage] = useState<string>("");
    const [changePwChkMessage, setChangePwChkMessage] = useState<string>("");

    const [isChangePwProgress, setIsChangePwProgress] = useState<boolean>(false);

    const passwordDuplicationChk = async():Promise<void> => {
        await axios({
            method: "GET",
            url: "/member/memberPwDuplicationChk",
            params: {passwordCheck: memberPresentPwChk}
        }).then((res):void => {
            if(res.data) {
                alert("비밀번호 확인 성공");
                setPresentPwChkMessage('');
                setIsPresentPwChkEffect(true);
                setIsChangePwProgress(true);
            } else {
                alert("현재 비밀번호와 다릅니다.");
                setPresentPwChkMessage('현재 비밀번호와 다릅니다.');
                setIsPresentPwChkEffect(false);
                setIsChangePwProgress(false);
            }
        })
    }

    const memberPresentPwCheckHandler = (data:string):void => {
        const presentPwChk:string = data;

        if (!passwordRegex.test(presentPwChk)) {
            setPresentPwChkMessage('비밀번호를 다시 확인해주세요.');
            setIsPresentPwChkEffect(false);
        } else {
            setPresentPwChkMessage('');
            setIsPresentPwChkEffect(true);
        }
        setMemberPresentPwChk(presentPwChk);
    }

    const memberChangePwHandler = (data:string):void => {
        const changePw:string = data;

        if (!passwordRegex.test(changePw)) {
            setChangePwMessage('8~16자 영문 대 소문자, 숫자, 특수문자를 조합해주세요.');
            setIsChangePwEffect(false);
        } else {
            if(memberPresentPwChk === changePw) {
                setChangePwMessage('현재 비밀번호와 다르게 입력해주세요.');
                setIsChangePwEffect(false);
            } else {
                setChangePwMessage('');
                setIsChangePwEffect(true);
            }
        }
        setMemberChangePw(changePw);
    }

    const memberChangePwCheckHandler = (data:string):void => {
        const changePwChk:string = data;

        if (!passwordRegex.test(changePwChk)) {
            setChangePwChkMessage('8~16자 영문 대 소문자, 숫자, 특수문자를 조합해주세요.');
            setIsChangePwChkEffect(false);
        } else {
            if(memberChangePw !== changePwChk) {
                setChangePwChkMessage('비밀번호가 다릅니다.');
                setIsChangePwChkEffect(false);
            } else {
                setChangePwChkMessage('');
                setIsChangePwChkEffect(true);
            }
        }
        setMemberChangePwChk(changePwChk);
    }

    const passwordSeeHandler = (type:string):void => {
        if(type === 'chk') {
            const typeCheck = passwordChkRef.current.type;
            if(typeCheck === 'password') {
                passwordChkRef.current.type = 'text';
            } else {
                passwordChkRef.current.type = 'password';
            }
        } else if(type === 'pre') {
            const typeCheck = passwordPreRef.current.type;
            if(typeCheck === 'password') {
                passwordPreRef.current.type = 'text';
            } else {
                passwordPreRef.current.type = 'password';
            }
        } else {
            const typeCheck = passwordRef.current.type
            if(typeCheck === 'password') {
                passwordRef.current.type = 'text';
            } else {
                passwordRef.current.type = 'password';
            }
        }
    }

    const changeMemberPasswordHandler = async():Promise<boolean> => {
        if(isPresentPwChkEffect && isChangePwEffect && isChangePwChkEffect) {
            if(window.confirm('정말 비밀번호 변경을 하시겠습니까?') === true) {
                await axios({
                    method: "PUT",
                    url: "member/passwordUpdate",
                    params: {changePassword: memberChangePw}
                }).then((res) => {
                    const result = res.data.result;
                    if(result) {
                        window.alert("변경이 완료되었습니다.");
                        props.setIsModal(false);
                    } else {
                        window.alert("비밀번호 변경에 실패하였습니다.");
                        setIsChangePwProgress(false);
                    }
                })
                return true;
            } else {
                return false;
            }
        } else {
            if(!isPresentPwChkEffect) {
                alert("현재 비밀번호를 입력해주세요.");
                setPresentPwChkMessage('현재 비밀번호를 입력해주세요.');
                setIsPresentPwChkEffect(false);
            }
            if(!isChangePwEffect) {
                alert("변경할 비밀번호를 입력해주세요.");
                setChangePwMessage('변경할 비밀번호를 입력해주세요.');
                setIsChangePwEffect(false);
            }
            if(!isChangePwChkEffect) {
                alert("비밀번호가 동일하지 않습니다.");
                setChangePwChkMessage('비밀번호가 동일하지 않습니다.');
                setIsChangePwChkEffect(false);
            }
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
        <Styled.MemberInfoPwUpdateView ref={modalRef}>

            <div className="mi-pwUpdate-view">
                <div className="mi-modal-title">
                    비밀번호 변경
                </div>
                <div className="mi-modal-notice">
                    <ul>
                        <li>비밀번호는 8~16자이내로 영문 대 소문자, 숫자, 특수문자를 조합하여 등록하셔야 합니다.</li>
                        <li>변경된 비밀번호는 바로 반영되어 사용하실 수 있습니다.</li>
                    </ul>
                </div>
                <div className="mi-input-section">
                    {
                        isChangePwProgress ?
                            <div className="pwUpdate-step2">
                                <div className="input-item">
                                    <div>신규 비밀번호</div>
                                    <div className="input-password">
                                        <input type="password" value={memberChangePw} onChange={(e) => memberChangePwHandler(e.target.value)}
                                               style={ isChangePwEffect ? {} : {borderColor:'red'} } ref={passwordRef}/>
                                        <FontAwesomeIcon icon={passwordSeeIcon} className="icon-see"
                                                         onClick={() => passwordSeeHandler("")}/>
                                    </div>
                                    <span style={ isChangePwEffect ? {} : {color:'red', fontSize:'11px', marginLeft: '7px', fontWeight: 'bold'} }>{changePwMessage}</span>
                                </div>
                                <div className="input-item">
                                    <div>비밀번호 확인</div>
                                    <div className="input-password">
                                        <input type="password" value={memberChangePwChk} onChange={(e) => memberChangePwCheckHandler(e.target.value)}
                                               style={ isChangePwChkEffect ? {} : {borderColor:'red'} } ref={passwordChkRef}/>
                                        <FontAwesomeIcon icon={passwordSeeIcon} className="icon-see"
                                                         onClick={() => passwordSeeHandler("chk")}/>
                                    </div>
                                    <span style={ isChangePwChkEffect ? {} : {color:'red', fontSize:'11px', marginLeft: '7px', fontWeight: 'bold'} }>{changePwChkMessage}</span>
                                </div>
                            </div>
                            :
                            <div className="pwUpdate-step1">
                                <div className="input-item">
                                    <div>아이디</div>
                                    <input type="text" value={props.memberId} readOnly={true}/>
                                </div>
                                <div className="input-item">
                                    <div>현재 비밀번호</div>
                                    <div className="input-password">
                                        <input type="password" value={memberPresentPwChk} onChange={(e) => memberPresentPwCheckHandler(e.target.value)}
                                               style={ isPresentPwChkEffect ? {} : {borderColor:'red'} } ref={passwordPreRef}/>
                                        <FontAwesomeIcon icon={passwordSeeIcon} className="icon-see"
                                                         onClick={() => passwordSeeHandler("pre")}/>
                                    </div>
                                    <span style={ isPresentPwChkEffect ? {} : {color:'red', fontSize:'12px', marginLeft: '7px', fontWeight: 'bold'} }>{presentPwChkMessage}</span>
                                </div>
                            </div>
                    }
                </div>
            </div>
            <div className="mi-button-section">
                <button onClick={() => props.setIsModal(false)} className="btn-cancel">취소</button>
                {
                    isChangePwProgress ?
                        <button onClick={() => changeMemberPasswordHandler()} className="btn-submit">변경하기</button>
                        :
                        <button onClick={() => passwordDuplicationChk()} className="btn-submit">확인</button>
                }
            </div>

        </Styled.MemberInfoPwUpdateView>
    )
}

export default MemberInfoPwUpdate;