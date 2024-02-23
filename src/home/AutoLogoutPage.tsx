import styled from "styled-components";
import HeaderNavigation from "../navigation/HeaderNavigation";
import React from "react";
import FooterNavigation from "../navigation/FooterNavigation";
import {useNavigate} from "react-router-dom";

const AutoLogoutPageStyle = styled.div`
  
  .logout-view {
    width: 100%;
    padding-bottom: 200px;
    margin-top: 80px;
    background-image: url("https://react-project-bucket.s3.ap-northeast-2.amazonaws.com/defaultImage/logout-image.jpg");
    background-repeat: no-repeat;
    
    .lo-content {
      display: flex;
      justify-content: center;
      flex-direction: column;
      min-height: 438px;
      width: 1160px;
      padding-top: 100px;
      margin: 0 auto;
      @media screen and (max-width: 1280px) {
        width: 100%;
      }
    }
    
    .lo-main-text {
      color: #fff;
      text-align: center;
      font-size: 54px;
      line-height: 64px;
      letter-spacing: -4.05px;
      @media screen and (max-width: 1024px) {
        font-size: 34px;
      }
    }
    
    .lo-sub-text {
      margin-top: 40px;
      color: #fff;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      line-height: 26px;
      letter-spacing: -.4px;
      @media screen and (max-width: 1024px) {
        font-size: 14px;
      }
    }
    
    .lo-btn-section {
      margin: 80px auto 0;
      
      button {
        display: inline-block;
        min-height: 60px;
        min-width: 160px;
        padding: 16px 10px 17px;
        border: none;
        border-radius: 8px;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        transition: all .4s ease;
        cursor: pointer;
        @media screen and (max-width: 1024px) {
          min-height: 40px;
          min-width: 100px;
          padding: 7px 50px 8px;
          font-size: 14px;
        }
      }
      
      .btn-main {
        background-color: ${({theme}) => theme.bgColor};
        color: ${({theme}) => theme.textColor};
      }

      .btn-login {
        margin-left: 10px;
        background-color: ${({theme}) => theme.reverseBgColor};
        color: ${({theme}) => theme.reverseTextColor};
      }
    }
  }
`;

const AutoLogoutPage = () => {
    const navigate = useNavigate();

    return (
        <AutoLogoutPageStyle>
            <HeaderNavigation />

            <div className="logout-view">
                <div className="lo-content">
                    <div className="lo-main-text">
                        안전하게 로그아웃 되었습니다.
                    </div>
                    <div className="lo-sub-text">
                        DuDu 문화센터를 이용해주셔서 감사합니다. <br />
                        행복한 하루 도시기 바랍니다.
                    </div>
                    <div className="lo-btn-section">
                        <button onClick={() => navigate("/")} className="btn-main">메인으로</button>
                        <button onClick={() => navigate("/signIn")} className="btn-login">재로그인</button>
                    </div>
                </div>
            </div>

            <FooterNavigation />
        </AutoLogoutPageStyle>
    )
}

export default AutoLogoutPage;