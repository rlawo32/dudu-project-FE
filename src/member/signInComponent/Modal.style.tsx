import styled from "styled-components";

export const ModalView = styled.div`
  position: absolute;
  top: 25%;
  left: 35%;
  transform: translate(-40%, -30%);
`;

export const ModalTabBar = styled.div`
  height: 25px;
  width: 100%;
  border: none;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: ${({theme}) => theme.reverseBgColor};
  cursor: move;
  text-align: right;
  
  button {
    height: 25px;
    width: 25px;
    border: none;
    border-top-right-radius: 15px;
    color: ${({theme}) => theme.headerTextColor};
    background: none;
    margin: auto 1px;
    cursor: pointer;
    
    &:hover {
      background-color: darkgray;
    }
  }
`;

export const ModalFindView = styled.div`
  display: flex;
  flex-direction: column;
  
  .findView-title {
    border-bottom: 1px solid ${({theme}) => theme.textColor};
    background: rgba(216,201,201,0.5);
    
    p:nth-child(1) {
      font-size: 35px;
      font-weight: bold;
    }
    
    p {
      width: fit-content;
      margin: 30px auto;
    }
  }
  
  .findView-box {
    height: 170px;
    width: fit-content;
    margin: auto;

    .input-section {
      position: relative;
      height: 90px;
      margin-top: 20px;
      
      .section-title {
        
      }

      .section-password {
        position: relative;

        .icon-see {
          position: absolute;
          top: 15px;
          right: 12px;
          font-size: 19px;
          color: ${({theme}) => theme.textColor};
          z-index: 3;
          cursor: pointer;

          &:hover {
            opacity: 0.5;
          }
        }
      }
    }
    
    .button-section {
      width: fit-content;
      margin: 30px auto 0;
    }
  }
  
  .capsLock-section {
    position: absolute;
    top: 45px;
    right: -70px;

    @media screen and (max-width: 800px) {
      top: 2px;
      right: -62px;
      width: 60px;
    }
  }
  
  .findId-failedView {
    display: flex;
    align-items: center;
    height: 475px;
    width: 100%;
    background: rgba(216,201,201,0.5);

    .findView-text {
      width: fit-content;
      margin: auto;
      font-size: 26px;
      text-align: center;

      button {
        display: block;
        min-height: 40px;
        min-width: 90px;
        padding: 12px 10px 13px;
        margin: 30px auto 0;
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
    }
  }

  .findId-successView {
    
    .findView-box {
      width: 300px;
    }
    
    .findView-text {
      margin-top: 10px;
      font-size: 17px;

      button {
        display: block;
        min-height: 40px;
        min-width: 90px;
        padding: 12px 10px 13px;
        margin: 30px auto 0;
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
    }
    
    .findView-result {
      width: fit-content;
      margin: 20px auto 0;
    }
  }
`;

export const ModalInput = styled.input`
  position: relative;
  display: block;
  height: 30px;
  width: 250px;
  border: ${({theme}) => theme.borderColor};
  border-radius: 10px;
  padding: 8px 10px 5px 10px;
  margin: 5px auto;
  font-size: 18px;
  color: ${({theme}) => theme.textColor};
  background-color: ${({theme}) => theme.inputBgColor};
  outline: none;
`;

export const ModalButton = styled.button`
  display: inline;
  width: 100px;
  border: none;
  border-radius: 10px;
  padding: 5px 10px 5px 10px;
  margin: 0 5px;
  font-size: 20px;
  color: ${({theme}) => theme.headerTextColor};
  background-color: ${({theme}) => theme.reverseBgColor};
  cursor: pointer;
`;