import React, {useRef, useState} from "react";
import {useDrag} from "react-use-gesture";
import styled from "styled-components";
import axios from "axios";

import * as Modal from "./Modal.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope as emailIcon} from "@fortawesome/free-solid-svg-icons";

interface Props {
    setIsFindIdModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface modalPosition {
    x: number;
    y: number;
}

const FindIdModalView = styled.div<modalPosition>`
  position: absolute;
  top: ${(props) => props.y + "px"};
  left: ${(props) => props.x + "px"};
  height: 500px;
  width: 500px;
  border: 1px solid ${({theme}) => theme.textColor};
  border-radius: 15px;
  background-color: ${({theme}) => theme.bgColor};
  overflow: hidden;
`;

const FindIdModal = (props: Props) => {
    const modalRef:any = useRef<any>();

    const [logoPos, setLogoPos] = useState({x:0, y:0})
    const bindLogoPos = useDrag((params)=>{
        setLogoPos({
            x: params.offset[0],
            y: params.offset[1]
        })
    });
    
    const [findIdMemberName, setFindIdMemberName] = useState<string>("");
    const [findIdMemberEmail, setFindIdMemberEmail] = useState<string>("");
    const [isFindIdModalSection, setIsFindIdModalSection] = useState<boolean>(true);
    const [findMemberId, setFindMemberId] = useState<string>("");
    const [isFindMemberId, setIsFindMemberId] = useState<boolean>(true);

    const [findIdMemberNameMessage, setFindIdMemberNameMessage] = useState<string>("");
    const [isFindIdMemberNameEffect, setIsFindIdMemberNameEffect] = useState<boolean>(true);
    const [isFindIdMemberNameConfirm, setIsFindIdMemberNameConfirm] = useState<boolean>(false);

    const [findIdMemberEmailMessage, setFindIdMemberEmailMessage] = useState<string>("");
    const [isFindIdMemberEmailEffect, setIsFindIdMemberEmailEffect] = useState<boolean>(true);
    const [isFindIdMemberEmailConfirm, setIsFindIdMemberEmailConfirm] = useState<boolean>(false);

    const findIdMemberNameRegex = (data:string):void => {
        const regexChk:RegExp = /^[ㄱ-ㅎ가-힣a-zA-Z]+$/i;
        const currentData:string = data;

        setFindIdMemberName(currentData);

        if(!regexChk.test(currentData)) {
            setFindIdMemberNameMessage('이름을 다시 확인해주세요.');
            setIsFindIdMemberNameEffect(false);
            setIsFindIdMemberNameConfirm(false);
        } else {
            setFindIdMemberNameMessage('');
            setIsFindIdMemberNameEffect(true);
            setIsFindIdMemberNameConfirm(true);
        }
    }

    const findIdMemberEmailRegex = (data:string):void => {
        // eslint-disable-next-line no-useless-escape
        const regexChk:RegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        const currentData:string = data;

        setFindIdMemberEmail(currentData);

        if(!regexChk.test(currentData)) {
            setFindIdMemberEmailMessage('이메일 주소를 다시 확인해주세요.');
            setIsFindIdMemberEmailEffect(false);
            setIsFindIdMemberEmailConfirm(false);
        } else {
            setFindIdMemberEmailMessage('');
            setIsFindIdMemberEmailEffect(true);
            setIsFindIdMemberEmailConfirm(true);
        }
    }

    const findIdHandler = ():void => {
        const findIdData:object = {
            memberName: findIdMemberName,
            memberEmail: findIdMemberEmail
        }
        if(isFindIdMemberNameConfirm && isFindIdMemberEmailConfirm) {
            axios({
                method: "POST",
                url: "/member/findMemberId",
                data: findIdData,
                headers: {'Content-type': 'application/json'}
            }).then((res) => {
                const responseData = res.data;
                console.log(responseData);
                if(responseData.result) {
                    let encodeId:string = "";
                    for(let i:number=0; i<responseData.data.length; i++) {
                        if(i < 2) {
                            encodeId += responseData.data.substring(i, i+1);
                        } else {
                            encodeId += "*";
                        }
                    }
                    setFindMemberId(encodeId);
                    setIsFindMemberId(true);
                } else {
                    setIsFindMemberId(false);
                }
                setIsFindIdModalSection(false);
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const entireIdHandler = ():void => {
        const entireIdData:object = {
            memberName: findIdMemberName,
            memberEmail: findIdMemberEmail
        }
        axios({
            method: "POST",
            url: "/member/entireMemberId",
            data: entireIdData,
            headers: {'Content-type': 'application/json'}
        }).then(() => {
            alert('입력하신 이메일로 전송되었습니다.');
            props.setIsFindIdModal(false);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <FindIdModalView ref={modalRef} x={logoPos.x} y={logoPos.y}>
            <Modal.ModalTabBar {...bindLogoPos()} className="chat-drag-design">
                <button onClick={() => props.setIsFindIdModal(false)}>X</button>
            </Modal.ModalTabBar>

            {
                isFindIdModalSection ?
                    <Modal.ModalFindView>
                        <div className="findView-title">
                            <p>
                                아이디 찾기
                            </p>
                            <p>
                                등록된 회원정보로 아이디를 찾으실 수 있습니다.
                            </p>
                        </div>
                        <span></span>
                        <div className="findView-box">
                            <div className="input-section">
                                <div className="section-title">이름</div>
                                <Modal.ModalInput type="text" placeholder="이름을 입력해주세요." style={ isFindIdMemberNameEffect ? {} : {border: "3px solid red"} }
                                                  onChange={(e) => findIdMemberNameRegex(e.target.value)} />
                                <div style={ isFindIdMemberNameEffect ? {display:'none'} : {display:'block', color:'red', fontSize:'12px', marginLeft:'5px'} }>
                                    {findIdMemberNameMessage}
                                </div>
                            </div>
                            <div className="input-section">
                                <div className="section-title">이메일</div>
                                <Modal.ModalInput type="text" placeholder="이메일을 입력해주세요." style={ isFindIdMemberEmailEffect ? {} : {border: "3px solid red"} }
                                                  onChange={(e) => findIdMemberEmailRegex(e.target.value)} />
                                <div style={ isFindIdMemberEmailEffect ? {display:'none'} : {display:'block', color:'red', fontSize:'12px', marginLeft:'5px'} }>
                                    {findIdMemberEmailMessage}
                                </div>
                            </div>

                            <div className="button-section">
                                <Modal.ModalButton onClick={() => props.setIsFindIdModal(false)}>취소</Modal.ModalButton>
                                <Modal.ModalButton onClick={() => findIdHandler()}>다음</Modal.ModalButton>
                            </div>
                        </div>
                    </Modal.ModalFindView>
                    :
                    isFindMemberId ?
                        <Modal.ModalFindView>
                            <div className="findView-title">
                                <p>
                                    아이디 찾기
                                </p>
                                <p>
                                    입력하신 정보와 일치하는 아이디 정보입니다.
                                </p>
                            </div>
                            <div className="findId-successView">
                                <div className="findView-box">
                                    <div className="findView-text">아이디 찾기 결과</div>
                                    <div className="findView-result" style={{marginTop: "45px"}}>
                                        {findMemberId}
                                    </div>
                                    <div style={{marginTop: "25px", fontSize: "13px", color: "gray"}}>
                                        -개인정보보호를 위해 아이디 뒷자리는 *로 표시됩니다.
                                    </div>
                                </div>
                                <div className="findView-box">
                                    <div className="findView-text">아이디 전체 확인</div>
                                    <div className="findView-result">
                                        <Modal.ModalButton onClick={() => entireIdHandler()} style={{marginTop: "15px"}}>
                                            <FontAwesomeIcon icon={emailIcon} />
                                        </Modal.ModalButton>
                                    </div>
                                </div>
                            </div>
                        </Modal.ModalFindView>
                        :
                        <Modal.ModalFindView>
                            <div className="findId-failedView">
                                <div className="findView-text">
                                    입력하신 정보와 일치하는 <br />아이디 정보가 없습니다.
                                    <div className="button-section">
                                        <button onClick={() => setIsFindIdModalSection(true)}>다시찾기</button>
                                    </div>
                                </div>
                            </div>
                        </Modal.ModalFindView>
            }
        </FindIdModalView>
    )
}

export default FindIdModal;