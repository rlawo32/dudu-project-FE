import React from "react";
import {removeCookie} from "../Cookie";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

import useTokenExpiresStore from "../stores/useTokenExpiresStore";
import reissue from "../reissue";

interface Props {
    isModal:boolean;
    setIsModal:React.Dispatch<React.SetStateAction<boolean>>;
}

const StyledLoginExpiresNavigation = styled.div<{$isModal:boolean}>`
  box-sizing: border-box;
  position: fixed;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -25%);
  height: 370px;
  width: 370px;
  padding: 40px;
  border: 1px solid ${({theme}) => theme.textColor};
  border-radius: 15px;
  background-color: ${({theme}) => theme.bgColor};
  text-align: center;
  z-index: 50;
  opacity: ${({$isModal}) => $isModal ? 1 : 1};
  pointer-events: ${({$isModal}) => $isModal ? "auto" : "auto"};
  
  .len-modal-view {
    
    .len-time-box {
      font-size: 40px;
      font-weight: lighter;
      color: orangered;
    }
    
    .len-head-text {
      padding: 10px;
      margin: 20px 0;
      font-size: 20px;
      font-weight: bold;
      line-height: 32px;
      letter-spacing: -.4px;
    }
    
    .len-body-text {
      font-size: 16px;
      line-height: 26px;
      letter-spacing: -.4px;
    }
    
    .len-btn-section {
      display: flex;
      width: fit-content;
      margin: 50px auto 0;
      
      .btn-logout {
        display: inline-block;
        min-height: 10px;
        min-width: 120px;
        padding: 8px 5px 9px;
        border: 2px solid ${({theme}) => theme.rgbaMedium};
        border-radius: 8px;
        background-color: ${({theme}) => theme.bgColor};
        color: ${({theme}) => theme.textColor};
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        transition: all .4s ease;
        cursor: pointer;
      }

      .btn-extension {
        display: inline-block;
        min-height: 30px;
        min-width: 120px;
        padding: 8px 5px 9px;
        margin-left: 10px;
        border: 1px solid ${({theme}) => theme.rgbaLight};
        border-radius: 8px;
        background-color: ${({theme}) => theme.reverseBgColor};
        color: ${({theme}) => theme.reverseTextColor};
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        transition: all .4s ease;
        cursor: pointer;
      }
    }
  }
`;

const LoginExpiresNavigation = (props:Props) => {
    const navigate = useNavigate();

    const {tokenExpiresTime, setTokenExpiresTime} = useTokenExpiresStore();
    const second:string = String(Math.floor((tokenExpiresTime / 1000) % 61)).padStart(2, '0');

    const logout = ():void => {
        removeCookie("refreshToken");
        window.localStorage.removeItem("role");
        props.setIsModal(false);
        navigate("/");
        window.location.reload();
    }

    const extension = ():void => {
        reissue().then(
            (res:number):void => {setTokenExpiresTime(res)}
        )
        props.setIsModal(false);
        window.location.reload();
    }

    return (
        <StyledLoginExpiresNavigation $isModal={props.isModal}>

            <div className="len-modal-view">
                <div className="len-time-box">{second}초</div>
                <div className="len-head-text">자동 로그아웃 예정입니다.</div>
                <div className="len-body-text">계속하시려면 로그인 시간을 연장해 주세요.</div>
                <div className="len-btn-section">
                    <button onClick={() => logout()} className="btn-logout">로그아웃</button>
                    <button onClick={() => extension()} className="btn-extension">로그인연장</button>
                </div>
            </div>

        </StyledLoginExpiresNavigation>
    )
}

export default LoginExpiresNavigation;