import styled from "styled-components";

export const MemberInfoUpdateView = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -25%);
  height: 500px;
  width: 700px;
  border: 1px solid ${({theme}) => theme.textColor};
  border-radius: 15px;
  background-color: ${({theme}) => theme.bgColor};
  
  
`;

export const MemberInfoPwUpdateView = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -25%);
  height: 520px;
  width: 350px;
  border: 1px solid ${({theme}) => theme.textColor};
  border-radius: 15px;
  background-color: ${({theme}) => theme.bgColor};

  .mi-modal-title {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding: 35px;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    background: rgba(216,201,201,0.5);
    text-align: center;
    font-size: 25px;
    line-height: 32px;
    letter-spacing: -.4px;
  }
  
  .mi-modal-notice {
    width: 70%;
    padding: 5px 20px;
    margin: 20px auto 10px;
    border-radius: 9px;
    background-color: #f7f2ef;
    color: rgba(0,0,0,.6);
    
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -.6px;
    word-break: keep-all;
    
    ul {
      padding-left: 10px;
    }
  }
  
  .mi-input-section {
    width: fit-content;
    margin: 0 auto;
    
    .input-item {
      height: 60px;
      width: 280px;
      margin: 0 auto 24px;
    }
    
    input {
      box-sizing: border-box;
      height: 36px;
      width: 100%;
      padding: 0 10px 0 15px;
      margin-top: 3px;
      background-color: ${({theme}) => theme.boxBgColor};
      color: ${({theme}) => theme.textColor};
      border: 2px solid ${({theme}) => theme.textColor};
      border-radius: 30px;
      font-size: 20px;
      outline: none;
    }
  }

  .mi-button-section {
    position: relative;
    bottom: -20px;
    width: fit-content;
    margin: 20px auto;
    
    .btn-cancel {
      display: inline-block;
      min-height: 30px;
      min-width: 60px;
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
    
    .btn-submit {
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
`;

export const MemberInfoWithdrawView = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -25%);
  height: 500px;
  width: 350px;
  border: 1px solid ${({theme}) => theme.textColor};
  border-radius: 15px;
  background-color: ${({theme}) => theme.bgColor};

  .mi-modal-title {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding: 35px;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    background: rgba(216,201,201,0.5);
    text-align: center;
    font-size: 25px;
    line-height: 32px;
    letter-spacing: -.4px;
  }

  .mi-modal-notice {
    width: 70%;
    padding: 5px 20px;
    margin: 20px auto 10px;
    border: 1px solid red;
    border-radius: 9px;
    background-color: #f7f2ef;
    color: rgba(0,0,0,.6);

    font-size: 14px;
    line-height: 20px;
    letter-spacing: -.6px;
    word-break: keep-all;

    ul {
      padding-left: 10px;
    }
  }
  
  .mi-input-section {
    width: fit-content;
    margin: 0 auto;
    
    .input-item {
      height: 60px;
      width: 280px;
      margin: 0 auto 22px;
    }
    
    input {
      box-sizing: border-box;
      height: 36px;
      width: 100%;
      padding: 0 10px 0 15px;
      margin-top: 3px;
      background-color: ${({theme}) => theme.boxBgColor};
      color: ${({theme}) => theme.textColor};
      border: 2px solid ${({theme}) => theme.textColor};
      border-radius: 30px;
      font-size: 20px;
      outline: none;
    }
  }

  .mi-button-section {
    position: relative;
    bottom: -20px;
    width: fit-content;
    margin: 20px auto;
    
    .btn-cancel {
      display: inline-block;
      min-height: 30px;
      min-width: 60px;
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
    
    .btn-submit {
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
`;