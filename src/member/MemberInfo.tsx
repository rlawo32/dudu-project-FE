import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import FooterNavigation from "../navigation/FooterNavigation";
import HeaderNavigation from "../navigation/HeaderNavigation";
import TopButtonNavigation from "../navigation/TopButtonNavigation";
import MemberInfoUpdate from "./memberInfoCompnent/MemberInfoUpdate";
import MemberInfoPwUpdate from "./memberInfoCompnent/MemberInfoPwUpdate";
import MemberInfoWithdraw from "./memberInfoCompnent/MemberInfoWithdraw";

import * as Styled from "./MemberInfo.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBasketShopping as basketIcon, faChalkboardUser as reviewIcon,
faClipboard as historyIcon, faClockRotateLeft as logIcon} from "@fortawesome/free-solid-svg-icons";

const MemberInfo = () => {
    const navigate = useNavigate();

    const [memberInfo, setMemberInfo] = useState<{
        memberNo:number;
        memberEmail:string;
        memberId:string;
        memberName:string;
        memberGender:string;
        memberBirth:string;
        memberPhone:string;
    }>({
        memberNo: 0,
        memberEmail: '',
        memberId: '',
        memberName: '',
        memberGender: '',
        memberBirth: '',
        memberPhone: ''
    });
    const [isInfoUpdateModal, setIsInfoUpdateModal] = useState<boolean>(false);
    const [isInfoPwUpdateModal, setIsInfoPwUpdateModal] = useState<boolean>(false);
    const [isInfoWithdrawModal, setIsInfoWithdrawModal] = useState<boolean>(false);

    useEffect(() => {
        const memberInfoData = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/member/findMemberInfo"
            }).then((res):void => {
                setMemberInfo(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        setTimeout(() => {memberInfoData().then();}, 200);
    }, [])

    return (
        <Styled.MemberInfoView>
            <HeaderNavigation />

            <div className="mi-sub">
                <div className="mi-sub-view">
                    <div className="mi-sub-title">
                        회원정보
                    </div>
                </div>
            </div>

            <div className="mi-main">

                <div className="mi-info-view">
                    <div className="mi-info-title">
                        회원정보
                    </div>
                    <div className="mi-info-content">
                        <div className="content-left">
                            <div className="content-item mi-name">
                                <span>이름</span>
                                <div>
                                    {memberInfo.memberName}
                                </div>
                            </div>
                            <div className="content-item mi-birth">
                                <span>생년월일</span>
                                <div>
                                    {memberInfo.memberBirth}
                                </div>
                            </div>
                            <div className="content-item mi-phone">
                                <span>휴대전화</span>
                                <div>
                                    {memberInfo?.memberPhone.substring(0, 3) + "-" +
                                        memberInfo?.memberPhone.substring(3, 7) + "-" +
                                        memberInfo?.memberPhone.substring(7)}
                                </div>
                            </div>
                        </div>
                        <div className="content-right">
                            <div className="content-item mi-id">
                                <span>아이디</span>
                                <div>
                                    {memberInfo.memberId}
                                </div>
                            </div>
                            <div className="content-item mi-email">
                                <span>이메일</span>
                                <div>
                                    {memberInfo.memberEmail}
                                </div>
                            </div>
                            <div className="content-item mi-gender">
                                <span>성별</span>
                                <div>
                                    {memberInfo?.memberGender === 'M' ? "남" : "여"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mi-modal-section">
                    {isInfoUpdateModal ? <MemberInfoUpdate setIsModal={setIsInfoUpdateModal} memberData={memberInfo}/> : <div/>}
                    {isInfoPwUpdateModal ? <MemberInfoPwUpdate setIsModal={setIsInfoPwUpdateModal} memberId={memberInfo.memberId}/> : <div/>}
                    {isInfoWithdrawModal ? <MemberInfoWithdraw setIsModal={setIsInfoWithdrawModal} memberId={memberInfo.memberId}/> : <div/>}
                </div>

                <div className="mi-info-update">
                    <div className="mi-button-section">
                        <button onClick={() => {window.scrollTo({ top: 50, behavior: "smooth" });
                            setIsInfoWithdrawModal(true);}} style={{borderColor: "red"}}>회원 탈퇴</button>
                        <button onClick={() => {window.scrollTo({ top: 50, behavior: "smooth" });
                            setIsInfoPwUpdateModal(true);}}>비밀번호 변경</button>
                        <button onClick={() => {window.scrollTo({ top: 50, behavior: "smooth" });
                            setIsInfoUpdateModal(true);}}>회원정보 변경</button>
                    </div>
                </div>

                <div className="mi-move-view">
                    <div className="move-item" onClick={() => navigate("/lectureBasket")}>
                        <FontAwesomeIcon icon={basketIcon} className="icon-custom" />
                        장바구니
                    </div>
                    <div className="move-item" onClick={() => navigate("/lectureHistory")}>
                        <FontAwesomeIcon icon={historyIcon} className="icon-custom" />
                        수강내역
                    </div>
                    <div className="move-item" onClick={() => navigate("/lectureReview")}>
                        <FontAwesomeIcon icon={reviewIcon} className="icon-custom" />
                        수강후기
                    </div>
                    <div className="move-item" onClick={() => navigate("/memberLog")}>
                        <FontAwesomeIcon icon={logIcon} className="icon-custom" />
                        로그인 기록
                    </div>
                </div>
            </div>

            <TopButtonNavigation />

            <FooterNavigation />
        </Styled.MemberInfoView>
    )
}

export default MemberInfo;