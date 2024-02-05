import styled from "styled-components";


export const TermsAgreeView = styled.div`
  position: relative;
  height: fit-content;
  width: fit-content;
  margin: auto;
  
  h1 {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .terms-box {
    margin-bottom: 40px;
    
    .terms-text {
      box-sizing: border-box;
      height: 150px;
      width: 400px;
      @media screen and (max-width: 750px) {
        width: 300px;
      }
      padding: 15px 10px;
      border: 1px solid #ddcdc5;
      border-radius: 10px;
      background: ${({theme}) => theme.cardBgColor};
      
    }
  }
  
  .terms-title {
    margin-bottom: 10px;
    font-size: 20px;
  }
  
  .terms-input {
    
    label {
      display: flex;
      align-items: center;
    }
  }
  
  input {
    margin-right: 7px;
  }
  
  textarea {
    box-sizing: border-box;
    height: 120px;
    width: 370px;
    @media screen and (max-width: 750px) {
      width: 270px;
    }
    padding: 0 10px;
    border: none;
    border-radius: 10px;
    background: ${({theme}) => theme.cardBgColor};
    overflow: auto;
    resize: none;
    
    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background: gray; /* 스크롤바의 색상 */
      border-radius: 15px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(200, 200, 200, .1);
    }
  }
  
  span {
    font-size: 12px;
  }
  
  .input-custom {
    color: orangered;
  }
  
  .terms-button {
    width: fit-content;
    margin: auto;
  }
`;

export const EmailAuthView = styled.div`
  position: relative;
  height: fit-content;
  width: fit-content;
  margin: auto;
  
  h1 {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .emailAuth-button {
    width: fit-content;
    margin: auto;
  }
`;

export const EmailAuthInput = styled.input`
  display: inline-block;
  border: ${({theme}) => theme.borderColor};
  border-radius: 7px;
  width: 200px;
  padding: 7px 10px 5px 10px;
  margin: 0 2px 2px 0;
  font-size: 18px;
  color: ${({theme}) => theme.textColor};
  background-color: ${({theme}) => theme.inputBgColor};
`;

export const EmailAuthButton = styled.button`
  display: inline-block;
  border: none;
  border-radius: 7px;
  width: 100px;
  padding: 8px 10px 7px 10px;
  margin-left: 2px;
  font-size: 15px;
  font-weight: bold;
  color: ${({theme}) => theme.headerTextColor};
  background-color: ${({theme}) => theme.reverseBgColor};
  cursor: pointer;
`;

export const EnterInfoView = styled.div`
  position: relative;
  height: fit-content;
  width: fit-content;
  margin: auto;
  
  h1 {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .input-box {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: fit-content;
    margin-bottom: 22px;
    word-break: keep-all;
    
    .input-title {
      height: 30px;
      width: 100px;
      margin-right: 30px;
      font-size: 17px;
      font-weight: bold;
    }
    
    .input-text {
      position: relative;
      height: 40px;
      
      .input-password {
        position: relative;
        
        .icon-see {
          position: absolute;
          top: 10px;
          right: 12px;
          font-size: 17px;
          color: ${({theme}) => theme.textColor};
          z-index: 3;
          cursor: pointer;

          &:hover {
            opacity: 0.5;
          }
        }
      }
    }
    
    .capsLock-section {
      position: absolute;
      top: 10px;
      right: -70px;

      @media screen and (max-width: 800px) {
        top: 2px;
        right: -62px;
        width: 60px;
      }
    }
    
    .input-gender {
      border: ${({theme}) => theme.borderColor};
      border-radius: 7px;
      margin-right: 62px;
    }
  }
  
  .enterInfo-button {
    width: fit-content;
    margin: auto;
  }
`;

export const EnterInfoInput = styled.input`
  position: relative;
  display: inline-block;
  border: ${({theme}) => theme.borderColor};
  border-radius: 7px;
  width: 200px;
  padding: 7px 10px 6px 10px;
  margin: 0 2px 2px 0;
  font-size: 15px;
  color: ${({theme}) => theme.textColor};
  background-color: ${({theme}) => theme.inputBgColor};
  outline: none;
`;

export const EnterInfoButtonM = styled.button`
  border: none;
  border-right: 1px solid ${({theme}) => theme.textColor};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  width: 80px;
  padding: 5px 10px 5px 10px;
  font-size: 15px;
  cursor: pointer;
  color: ${({theme}) => theme.textColor};
  background-color: ${({theme}) => theme.bgColor};
`;

export const EnterInfoButtonF = styled.button`
  border: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  width: 80px;
  padding: 5px 10px 5px 10px;
  font-size: 15px;
  cursor: pointer;
  color: ${({theme}) => theme.textColor};
  background-color: ${({theme}) => theme.bgColor};
`;

export const JoinCompleteView = styled.div`
  position: relative;
  height: 500px;
  width: 700px;
  @media screen and (max-width: 1024px) {
    width: 500px;
  }
  @media screen and (max-width: 750px) {
    width: 300px;
  }
  margin: auto;
  
  h1 {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .jc-title {
    position: relative;
    top: 180px;
    
  }

  .jc-button-section {
    position: relative;
    top: 370px;
    width: fit-content;
    margin: auto;
    
    .btn-home {
        display: inline-block;
        min-height: 40px;
        min-width: 120px;
        padding: 12px 10px 13px;
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
      
      .btn-login {
        display: inline-block;
        min-height: 40px;
        min-width: 120px;
        padding: 12px 10px 13px;
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

export const SignUpButton = styled.button`
  border: none;
  border-radius: 7px;
  width: 150px;
  padding: 5px 10px 5px 10px;
  margin: 15px 5px 0 5px;
  font-size: 20px;
  font-weight: bold;
  color: ${({theme}) => theme.headerTextColor};
  background-color: ${({theme}) => theme.reverseBgColor};
  cursor: pointer;
`;