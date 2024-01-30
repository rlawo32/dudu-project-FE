import React from "react";

import FooterNavigation from "../navigation/FooterNavigation";
import HeaderNavigation from "../navigation/HeaderNavigation";
import TopButtonNavigation from "../navigation/TopButtonNavigation";

import * as Styled from "./MemberInfo.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBasketShopping as basketIcon, faChalkboardUser as reviewIcon,
faClipboard as historyIcon, faClockRotateLeft as logIcon} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

const MemberInfo = () => {
    const navigate = useNavigate();

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
                                    김성재
                                </div>
                            </div>
                            <div className="content-item mi-birth">
                                <span>생년월일</span>
                                <div>
                                    1997.07.16
                                </div>
                            </div>
                            <div className="content-item mi-phone">
                                <span>휴대전화</span>
                                <div>
                                    010-2208-4803
                                </div>
                            </div>
                        </div>
                        <div className="content-right">
                            <div className="content-item mi-id">
                                <span>아이디</span>
                                <div>
                                    rlawo32
                                </div>
                            </div>
                            <div className="content-item mi-email">
                                <span>이메일</span>
                                <div>
                                    rlawo32@naver.com
                                </div>
                            </div>
                            <div className="content-item mi-gender">
                                <span>성별</span>
                                <div>
                                    남
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mi-info-update">
                    <div className="mi-button-section">
                        <button style={{borderColor: "red"}}>회원 탈퇴</button>
                        <button>비밀번호 변경</button>
                        <button>회원정보 변경</button>
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