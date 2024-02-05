import styled from "styled-components";

export const MemberInfoUpdateView = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -25%);
  height: 570px;
  width: 700px;
  border: 1px solid ${({theme}) => theme.textColor};
  border-radius: 15px;
  background-color: ${({theme}) => theme.bgColor};

  .mi-infoUpdate-view {
    position: relative;
  }
  
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
    background-color: ${({theme}) => theme.noticeBgColor};
    color: ${({theme}) => theme.textColor};

    font-size: 14px;
    line-height: 20px;
    letter-spacing: -.6px;
    word-break: keep-all;

    ul {
      padding-left: 10px;
    }
  }
  
  .mi-input-section {
    width: 405px;
    margin: 20px auto 0;
    
    .input-item {
      position: relative;
      height: 60px;
      
      .item-top {
        display: flex;
        align-items: center;
        width: 100%;
        margin: 0 auto;

        div {
          width: 100px;
        }
        
        .btn-update {
          box-sizing: border-box;
          display: inline-block;
          min-height: 27px;
          min-width: 47px;
          padding: 2px 9px 3px;
          margin-left: 5px;
          border: 2px solid ${({theme}) => theme.rgbaLight};
          border-radius: 4px;
          background-color: ${({theme}) => theme.boxBgColor};
          color: ${({theme}) => theme.textColor};
          text-align: center;
          cursor: pointer;
        }
        
        .btn-gender {
          box-sizing: border-box;
          min-height: 27px;
          min-width: 47px;
          padding: 2px 9px 3px;
          border: 1px solid ${({theme}) => theme.rgbaLight};
          border-radius: 4px;
          background-color: ${({theme}) => theme.boxBgColor};
          color: ${({theme}) => theme.textColor};
          text-align: center;
          cursor: pointer;
        }
      }
      
      .item-bot {
        width: 100%;
        margin: 0 auto 24px;
        
      }
    }
    
    input {
      box-sizing: border-box;
      height: 36px;
      width: 250px;
      padding: 0 10px 0 15px;
      margin-top: 3px;
      background-color: ${({theme}) => theme.boxBgColor};
      color: ${({theme}) => theme.textColor};
      border: 2px solid ${({theme}) => theme.textColor};
      border-radius: 10px;
      font-size: 20px;
      outline: none;
    }
    
    .mi-modal-section {
      position: absolute;
      top: 25%;
      left: 50%;
      transform: translate(-50%, -25%);
      
      .modal-view {
        position: relative;
        box-sizing: border-box;
        height: 300px;
        width: 450px;
        border: 2px solid ${({theme}) => theme.textColor};
        border-radius: 10px;
        background-color: ${({theme}) => theme.boxBgColor};
        
        .modal-title {
          padding: 15px;
          margin-bottom: 10px;
          text-align: center;
          font-size: 30px;
          background: rgba(216,201,201,0.5);
        }
        
        .modal-emailAuth-input {
          height: 140px;
          padding: 5px 15px 0 45px;
        }
        
        .modal-infoUpdate-input {
          position: relative;
          height: 120px;
          width: fit-content;
          margin: 40px auto 0;

          .input-password {
            position: relative;

            .icon-see {
              position: absolute;
              top: 12px;
              right: 12px;
              font-size: 18px;
              color: ${({theme}) => theme.textColor};
              z-index: 3;
              cursor: pointer;

              &:hover {
                opacity: 0.5;
              }
            }
          }

          .capsLock-section {
            position: absolute;
            top: 38px;
            right: -70px;
          }
        }
        
        .modal-btn {
          width: fit-content;
          margin: 0 auto;
          
          .btn-cancel {
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
      }
    }
  }

  .mi-button-section {
    position: relative;
    bottom: 30px;
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
    background-color: ${({theme}) => theme.noticeBgColor};
    color: ${({theme}) => theme.textColor};
    
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
      position: relative;
      height: 60px;
      width: 280px;
      margin: 0 auto 24px;
      
      .input-password {
        position: relative;

        .icon-see {
          position: absolute;
          top: 13px;
          right: 15px;
          font-size: 18px;
          color: ${({theme}) => theme.textColor};
          z-index: 3;
          cursor: pointer;

          &:hover {
            opacity: 0.5;
          }
        }
      }
      
      .capsLock-section {
        position: absolute;
        top: 5px;
        left: 95px;
      }
    }
    
    input {
      position: relative;
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
    background-color: ${({theme}) => theme.noticeBgColor};
    color: ${({theme}) => theme.textColor};

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
      position: relative;
      height: 60px;
      width: 280px;
      margin: 0 auto 22px;

      .input-password {
        position: relative;

        .icon-see {
          position: absolute;
          top: 13px;
          right: 15px;
          font-size: 18px;
          color: ${({theme}) => theme.textColor};
          z-index: 3;
          cursor: pointer;

          &:hover {
            opacity: 0.5;
          }
        }
      }

      .capsLock-section {
        position: absolute;
        top: 5px;
        left: 95px;
      }
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