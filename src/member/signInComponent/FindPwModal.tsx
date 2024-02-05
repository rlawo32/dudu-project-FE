import {useRef, useState} from "react";
import {useDrag} from "react-use-gesture";
import React from "react";
import styled from "styled-components";
import axios from "axios";

import MemberAuth from "../MemberAuth";
import useJoinProgressStore from "../../stores/useJoinProgressStore";

import * as Modal from "./Modal.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye as passwordSeeIcon} from "@fortawesome/free-solid-svg-icons";

interface Props {
    setIsFindPwModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface modalPosition {
    x: number;
    y: number;
}

const FindPwModalView = styled.div<modalPosition>`
  position: absolute;
  top: ${(props) => props.y + "px"};
  left: ${(props) => props.x + "px"};
  height: 500px;
  width: 500px;
  border: 1px solid ${({theme}) => theme.textColor};
  border-radius: 15px;
  background-color: ${({theme}) => theme.bgColor};
`;

const FindPwModal = (props: Props) => {
    const modalRef:any = useRef<any>();
    const passwordRef:any = useRef<any>();
    const passwordChkRef:any = useRef<any>();

    const [logoPos, setLogoPos] = useState({x:0, y:0})
    const bindLogoPos = useDrag((params)=>{
        setLogoPos({
            x: params.offset[0],
            y: params.offset[1]
        })
    });

    const [isMemberEmailCheck, setIsMemberEmailCheck] = useState<boolean>(false);
    const [changePw, setChangePw] = useState<string>("");

    const [changePwMessage, setChangePwMessage] = useState<string>("");
    const [changeChkPwMessage, setChangeChkPwMessage] = useState<string>("");
    const [capsLockMessage, setCapsLockMessage] = useState<string>("");
    const [chkCapsLockMessage, setChkCapsLockMessage] = useState<string>("");

    const [isChangePwEffect, setIsChangePwEffect] = useState<boolean>(true);
    const [isChangeChkPwEffect, setIsChangeChkPwEffect] = useState<boolean>(true);
    const [isCapsLockEffect, setIsCapsLockEffect] = useState<boolean>(true);
    const [isChkCapsLockEffect, setIsChkCapsLockEffect] = useState<boolean>(true);

    const [isChangePwConfirm, setIsChangePwConfirm] = useState<boolean>(false);
    const [isChangeChkPwConfirm, setIsChangeChkPwConfirm] = useState<boolean>(false);

    const {inputMemberEmail} = useJoinProgressStore();

    const changePwRegex = (data:string):void => {
        const regexChk:RegExp = /^(?=.*[a-zA-Z])(?=.*[!?@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
        const currentData:string = data;

        setChangePw(currentData);

        if(!regexChk.test(currentData)) {
            setChangePwMessage('8~16자 영문 대 소문자, 숫자, 특수문자를 조합해주세요.');
            setIsChangePwEffect(false);
            setIsChangePwConfirm(false);
        } else {
            setChangePwMessage('');
            setIsChangePwEffect(true);
            setIsChangePwConfirm(true);
        }
    }

    const changePwChkRegex = (data:string):void => {
        const currentData:string = data;

        if(changePw !== currentData) {
            setChangeChkPwMessage('비밀번호를 다시 확인해주세요.');
            setIsChangeChkPwEffect(false);
            setIsChangeChkPwConfirm(false);
        } else {
            setChangeChkPwMessage('');
            setIsChangeChkPwEffect(true);
            setIsChangeChkPwConfirm(true);
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

    const activeCapsLock = (e:any, type:string):void => {
        if(type === 'chk') {
            if(e.getModifierState("CapsLock")) {
                setChkCapsLockMessage('CapsLock 켜짐');
                setIsChkCapsLockEffect(false);
            } else {
                setChkCapsLockMessage('');
                setIsChkCapsLockEffect(true);
            }
        } else {
            if(e.getModifierState("CapsLock")) {
                setCapsLockMessage('CapsLock 켜짐');
                setIsCapsLockEffect(false);
            } else {
                setCapsLockMessage('');
                setIsCapsLockEffect(true);
            }
        }
    }

    const changePwHandler = ():void => {
        const changePwData:object = {
            memberEmail: inputMemberEmail,
            memberPw: changePw
        }
        if(isChangePwConfirm && isChangeChkPwConfirm) {
            axios({
                method: "POST",
                url: "/member/findMemberPw",
                data: changePwData,
                headers: {'Content-type': 'application/json'}
            }).then((res) => {
                alert('변경완료');
                window.location.reload();
            }).catch((err) => {
                console.log(err);
            })
        } else {
            alert('비밀번호를 다시 확인해주세요.');
        }
    }

    return (
        <FindPwModalView ref={modalRef} x={logoPos.x} y={logoPos.y}>
            <Modal.ModalTabBar {...bindLogoPos()} className="chat-drag-design">
                <button onClick={() => props.setIsFindPwModal(false)}>X</button>
            </Modal.ModalTabBar>

            {
                isMemberEmailCheck ?
                    <Modal.ModalFindView>
                        <div className="findView-title">
                            <p>
                                비밀번호 찾기
                            </p>
                            <p>
                                비밀번호를 새롭게 설정하실 수 있습니다.
                            </p>
                        </div>
                        <div className="findView-box">
                            <div className="input-section">
                                <div className="section-title">비밀번호 입력</div>
                                <div className="section-password">
                                    <Modal.ModalInput type="password" style={ isChangePwEffect ? {} : {border: "3px solid red"} }
                                                      onChange={(e) => changePwRegex(e.target.value)}
                                                      onKeyPress={(e) => activeCapsLock(e, "")}
                                                      placeholder="비밀번호를 입력해주세요." ref={passwordRef}/>
                                    <FontAwesomeIcon icon={passwordSeeIcon} className="icon-see"
                                                     onClick={() => passwordSeeHandler("")}/>
                                </div>
                                <div style={ isChangePwEffect ? {display:'none'} : {display:'block', color:'red', fontSize:'12px', marginLeft:'5px'} }>
                                    {changePwMessage}
                                </div>
                                <div style={ isCapsLockEffect ? {display:'none'} : {display:'block', color:'red', fontSize:'10px', marginLeft:'5px'} }
                                     className="capsLock-section">
                                    {capsLockMessage}
                                </div>
                            </div>
                            <div className="input-section">
                                <div className="section-title">비밀번호 확인</div>
                                <div className="section-password">
                                    <Modal.ModalInput type="password" style={ isChangeChkPwEffect ? {} : {border: "3px solid red"} }
                                                      onChange={(e) => changePwChkRegex(e.target.value)}
                                                      onKeyPress={(e) => activeCapsLock(e, "chk")}
                                                      placeholder="비밀번호 확인을 해주세요." ref={passwordChkRef}/>
                                    <FontAwesomeIcon icon={passwordSeeIcon} className="icon-see"
                                                     onClick={() => passwordSeeHandler("chk")}/>
                                </div>
                                <div style={ isChangeChkPwEffect ? {display:'none'} : {display:'block', color:'red', fontSize:'12px', marginLeft:'5px'} }>
                                    {changeChkPwMessage}
                                </div>
                                <div style={ isChkCapsLockEffect ? {display:'none'} : {display:'block', color:'red', fontSize:'10px', marginLeft:'5px'} }
                                     className="capsLock-section">
                                    {chkCapsLockMessage}
                                </div>
                            </div>
                            <div className="button-section">
                                <Modal.ModalButton onClick={() => props.setIsFindPwModal(false)}>취소</Modal.ModalButton>
                                <Modal.ModalButton onClick={() => changePwHandler()}>변경</Modal.ModalButton>
                            </div>
                        </div>
                    </Modal.ModalFindView>
                    :
                    <Modal.ModalFindView>
                        <div className="findView-title">
                            <p>
                                비밀번호 찾기
                            </p>
                            <p>
                                이메일 인증 후 비밀번호를 다시 설정하실 수 있습니다.
                            </p>
                        </div>
                        <div className="findView-box" style={{marginTop: "25px"}}>
                            <h3>이메일 인증</h3>
                            <MemberAuth setIsMemberEmailCheck={setIsMemberEmailCheck} duplicationChk={false}/>
                        </div>
                    </Modal.ModalFindView>
            }

        </FindPwModalView>
    )
}

export default FindPwModal;