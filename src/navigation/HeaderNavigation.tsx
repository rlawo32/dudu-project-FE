import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {removeCookie} from "../Cookie";
import styled from "styled-components";
import axios from "axios";

import ThemeModeToggle from "./ThemeModeToggle";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket as loginIcon, faArrowRightFromBracket as logoutIcon,
    faUser as myPageIcon} from "@fortawesome/free-solid-svg-icons";

const StyledLink:any = styled(Link)`
  margin: 10px 0;
  color: ${({theme}) => theme.textColor};
  text-decoration: none;
  font-size: 35px;
  font-weight: normal;
  
  .icon-custom {
    font-size: 32px;
  }
  
  div {
    display: flex;
    align-items: center;
    height: 60px;
  }
  
  .child-btn {
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }
`;

const LinkBox = styled.div`
  color: ${({theme}) => theme.textColor};
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  
  div {
    display: flex;
    align-items: center;
    height: 60px;
  }
`;

const StyledHeaderNavigation = styled.div<{$getRole:string}>`
  position: relative;
  
  .header-parent {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 0;
    left: 0;
    width: 100%;
    height: 90px;
    background: ${({theme}) => theme.noticeBgColor};
    color: ${({theme}) => theme.textColor};
    z-index: 90;
    
    .header-left {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      height: 100%;
      width: fit-content;
      margin-left: 20px;

      img {
        margin-top: 5px;
        height: 80px;
        width: 190px;
        object-fit: cover;
      }
    }

    .header-center {
      @media screen and (max-width: 1024px) {
        display: none;
      }
      display: flex;
      align-items: center;
      font-size: 20px;
    }

    .header-right {
      display: flex;
      align-items: center;

      margin-right: 50px;
    }
  }
  
  .header-child {
    box-sizing: border-box;
    position: fixed;
    top: 70px;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 0;
    width: 100%;
    background: ${({theme}) => theme.noticeBgColor};
    font-size: 16px;
    overflow: hidden;
    z-index: 90;
    transition: height .5s ease, left .6s ease;
    cursor: default;
    
    .button-section {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: calc((100% - 120px) / 2);
      padding: 100px 0;
    }

    .image-section {
      height: 100%;
      @media screen and (max-width: 1180px) {
        width: calc((100% - 120px) / 2);
      }
      padding: 120px 40px 0 0;
    }
    
    img {
      object-fit: cover;
      transition: transform .4s ease;
    }
  }

  .header-child.active {
    height: 320px;
    
    img {
      height: 100%;
      width: 700px;
      transform: scale(1.1);
      transition: transform 1.5s ease;
    }
  }
`;

const HeaderNavigation = ():any => {
    const navigate = useNavigate();

    const [memberRole, setMemberRole] = useState<string>("");

    const [isLectureSubHovering, setIsLectureSubHovering] = useState<boolean>(false);
    const [isInformationUseHovering, setIsInformationUseHovering] = useState<boolean>(false);
    const [isCommunityHovering, setIsCommunityHovering] = useState<boolean>(false);
    const [isAdminPageHovering, setIsAdminPageHovering] = useState<boolean>(false);

    useEffect(() => {
        const localRole:string|null = window.localStorage.getItem("role");

        if(localRole) {
            setMemberRole(localRole);
        }
    }, [])

    const logout = ():boolean => {
        if(window.confirm('로그아웃 하시겠습니까?') === true) {
            axios({
                method: "POST",
                url: "/member/logout"
            }).then((res) => {
                if(res.data.result) {
                    removeCookie("refreshToken");
                }
            }).catch((err) => {
                console.log(err.message)
            })
            window.localStorage.removeItem("role");
            navigate("/");
            window.location.reload();
            return true;
        } else {
            return false;
        }
        // axios({
        //     method: "POST",
        //     url: "/logout"
        // }).then((res) => {
        // }).catch((err) => {
        //     console.log(err.message)
        // })
    }

    return (
        <div style={{height: "fit-content"}} onMouseOut={() => {
            setIsLectureSubHovering(false); setIsInformationUseHovering(false);
            setIsCommunityHovering(false); setIsAdminPageHovering(false);
        }} className="header-navigation">
            <StyledHeaderNavigation $getRole={memberRole}>
                <div className="header-parent">
                    <div className="header-left">
                        <StyledLink to="/">
                            <img src={"https://pub-168f9e8bdf754ff79c1313481784f5dd.r2.dev/defaultImage/main_logo.png"} alt={"메인로고"}/>
                        </StyledLink>
                    </div>
                    <div className="header-center">
                        <LinkBox style={{marginLeft: '30px'}}>
                            <div className="parent-lectureSub"
                                 onMouseOver={() => setIsLectureSubHovering(true)}>
                                수강신청
                            </div>
                            <div className={isLectureSubHovering ? "header-child active" : "header-child"}
                                 onMouseOver={() => setIsLectureSubHovering(true)}>
                                <div className="button-section">
                                    <StyledLink to="/lectureList" style={{marginLeft: '30px'}}>
                                        <div className="child-btn">
                                            수강신청
                                        </div>
                                    </StyledLink>
                                </div>
                                <div className="image-section">
                                    <img src={"https://pub-168f9e8bdf754ff79c1313481784f5dd.r2.dev/defaultImage/header_01.jpg"} alt={"header-image1"}/>
                                </div>
                            </div>
                        </LinkBox>
                        <LinkBox style={{marginLeft: '30px'}}>
                            <div className="parent-informationUse"
                                 onMouseOver={() => setIsInformationUseHovering(true)}>
                                이용안내
                            </div>
                            <div className={isInformationUseHovering ? "header-child active" : "header-child"}
                                 onMouseOver={() => setIsInformationUseHovering(true)}>
                                <div className="button-section">
                                    <StyledLink to="/branchInfoList" style={{marginLeft: '30px'}}>
                                        <div className="child-btn">
                                            지점안내
                                        </div>
                                    </StyledLink>
                                    <StyledLink to="/faqList" style={{marginLeft: '30px'}}>
                                        <div className="child-btn">
                                            자주하는 문의
                                        </div>
                                    </StyledLink>
                                </div>
                                <div className="image-section">
                                    <img src={"https://pub-168f9e8bdf754ff79c1313481784f5dd.r2.dev/defaultImage/header_02.jpg"} alt={"header-image1"}/>
                                </div>
                            </div>
                        </LinkBox>
                        <LinkBox style={{marginLeft: '30px'}}>
                            <div className="parent-community"
                                 onMouseOver={() => setIsCommunityHovering(true)}>
                                커뮤니티
                            </div>
                            <div className={isCommunityHovering ? "header-child active" : "header-child"}
                                 onMouseOver={() => setIsCommunityHovering(true)}>
                                <div className="button-section">
                                    <StyledLink to="/boardList" style={{marginLeft: '30px'}}>
                                        <div className="child-btn">
                                            공지사항/이벤트
                                        </div>
                                    </StyledLink>
                                    <StyledLink to="/reviewList" style={{marginLeft: '30px'}}>
                                        <div className="child-btn">
                                            수강후기
                                        </div>
                                    </StyledLink>
                                </div>
                                <div className="image-section">
                                    <img src={"https://pub-168f9e8bdf754ff79c1313481784f5dd.r2.dev/defaultImage/header_03.jpg"} alt={"header-image2"}/>
                                </div>
                            </div>
                        </LinkBox>
                        {
                            memberRole === 'ROLE_ADMIN' ?
                                <LinkBox style={{marginLeft: '30px'}}>
                                    <div className="parent-adminPage"
                                         onMouseOver={() => setIsAdminPageHovering(true)}>
                                        관리자페이지
                                    </div>
                                    <div className={isAdminPageHovering ? "header-child active" : "header-child"}
                                         onMouseOver={() => setIsAdminPageHovering(true)}>
                                        <StyledLink to="/lectureWrite" style={{marginLeft: '30px'}}>
                                            강좌개설
                                        </StyledLink>
                                        <StyledLink to="/lectureEventWrite" style={{marginLeft: '30px'}}>
                                            강좌관리
                                        </StyledLink>
                                        <StyledLink to="/boardWrite" style={{marginLeft: '30px'}}>
                                            게시글작성
                                        </StyledLink>
                                        <StyledLink to="/faqWrite" style={{marginLeft: '30px'}}>
                                            FAQ 작성
                                        </StyledLink>
                                        <StyledLink to="/branchInfoWrite" style={{marginLeft: '30px'}}>
                                            지점 등록
                                        </StyledLink>
                                    </div>
                                </LinkBox>: <></>
                        }
                    </div>
                    <div className="header-right">
                        <ThemeModeToggle />
                        {
                            memberRole.length > 0 ?
                                <>
                                    <StyledLink to="/memberInfo" style={{marginLeft: '20px'}}>
                                        <FontAwesomeIcon icon={myPageIcon} className="icon-custom"/>
                                    </StyledLink>
                                    <StyledLink to="/" style={{marginLeft: '20px'}}>
                                        <FontAwesomeIcon icon={logoutIcon} onClick={() => logout()}
                                                         className="icon-custom"/>
                                    </StyledLink>
                                </>
                                :
                                <>
                                    <StyledLink to="/signIn" style={{marginLeft: '20px'}}>
                                        <FontAwesomeIcon icon={loginIcon} className="icon-custom"/>
                                    </StyledLink>
                                </>
                        }
                    </div>
                </div>
            </StyledHeaderNavigation>
        </div>
    )
}

export default HeaderNavigation;