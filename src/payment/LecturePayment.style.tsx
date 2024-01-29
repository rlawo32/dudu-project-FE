import styled from "styled-components";

export const LecturePaymentView = styled.div<{$isModal:boolean}>`
  position: relative;
  
  .top-btn {
    position: fixed;
    bottom: 160px;
    right: 40px;
    height: 50px;
    width: 50px;
    border: 1px solid ${({theme}) => theme.boxBgColor};
    border-radius: 50%;
    background-color: ${({theme}) => theme.boxBgColor};
    color: ${({theme}) => theme.textColor};;
    text-align: center;
    z-index: 99;
    cursor: pointer;

    .icon-custom {
      position: relative;
      top: 12px;
      font-size: 25px;
    }
  }

  .lp-sub {
    height: 100%;
    width: 100%;
    background: rgba(216,201,201,0.5);
    opacity: ${({$isModal}) => $isModal ? 0.5 : 1};

    .lp-sub-view {
      width: 1160px;
      @media screen and (max-width: 1280px) {
        width: 100%;
        padding: 62px 0 80px;
      }
      padding: 82px 0 150px;
      margin: 0 auto;
      text-align: center;

      .lp-sub-title {
        margin: 7% auto 0;
        font-size: 48px;
        @media screen and (max-width: 1024px) {
          font-size: 32px;
        }
      }
    }
  }
  
  .lp-main {
    width: 1160px;
    margin: 100px auto 10%;
    @media screen and (max-width: 1280px) {
      box-sizing: border-box;
      width: 100%;
      padding: 0 20px;
    }
    opacity: ${({$isModal}) => $isModal ? 0.5 : 1};
    
    .lp-main-view {
      
      .lp-main-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        
        font-size: 24px;
        font-weight: bold;
        line-height: 32px;
        letter-spacing: -.6px;
      }
      
      .lp-main-content {
        padding: 40px;
        margin-top: 0;
        border: 1px solid #ddcdc5;
        border-radius: 12px;
        
        .lp-content-top {
          display: flex;
          padding-bottom: 40px;
          border-bottom: 1px solid ${({theme}) => theme.textColor};
          
          .lp-top-left {
            width: calc(50% - 60px);
            margin-right: 60px;
            
            .lp-institution {
              width: fit-content;
              padding: 0 6px;
              margin: 0 2px 2px 0;
              border: 1px solid ${({theme}) => theme.textColor};
              border-radius: 9px;
              font-size: 11px;
              line-height: 16px;
              white-space: nowrap;
            }
            
            .lp-title {
              margin-top: 4px;
              font-size: 24px;
              font-weight: bold;
              line-height: 32px;
              letter-spacing: -.6px;
            }
          }
          
          .lp-top-right {
            width: 50%;
            padding: 0 30px 0 20px;
            border-left: 1px solid ${({theme}) => theme.rgbaLight};
            font-size: 16px;
            line-height: 26px;
            letter-spacing: -.4px;

            .section-title {
              width: 120px;
              margin-right: 20px;
              font-size: 13px;
              line-height: 32px;
            }
            
            .lp-teacher {
              display: flex;
              width: calc(100% - 140px);
              font-size: 13px;
              line-height: 32px;
              word-break: break-all;
            }
            
            .lp-period {
              display: flex;
              width: calc(100% - 140px);
              font-size: 13px;
              line-height: 32px;
              word-break: break-all;
              
            }
            
            .lp-time {
              display: flex;
              width: calc(100% - 140px);
              font-size: 13px;
              line-height: 32px;
              word-break: break-all;
              
            }
            
            .lp-fee {
              display: flex;
              width: calc(100% - 140px);
              font-size: 13px;
              line-height: 32px;
              word-break: break-all;
              
            }
          }
        }
        
        .lp-content-bot {
          position: relative;
          display: flex;
          padding: 32px 0 0;
          
          .lp-bot-left {
            width: 50%;
            font-weight: bold;
            
            .lp-member {
              margin-bottom: 12px;
              font-size: 18px;
            }
          }

          .lp-bot-right {
            width: 50%;
            padding-left: 20px;

            .lp-paymentFee {
              display: flex;
              justify-content: space-between;
              margin-bottom: 12px;
              font-size: 18px;
              font-weight: bold;
              
              .section-title {
              }
            }
          }
        }
      }
      
      .lp-main-notice {
        position: relative;
        padding: 32px;
        margin-top: 80px;
        border-radius: 12px;
        background-color: #f7f2ef;
        color: black;

        .section-title {
          font-size: 16px;
          font-weight: bold;
          line-height: 26px;
          letter-spacing: -.4px;
        }
        
        ul {
          padding-left: 20px;
          
          li {
            line-height: 32px;
            opacity: 0.7;
          }
        }
      }
    }
  }
  
  .lp-button {
    position: sticky;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 24px 0;
    border-top: 2px solid ${({theme}) => theme.textColor};
    background-color: ${({theme}) =>theme.bgColor};
    opacity: ${({$isModal}) => $isModal ? 0.5 : 1};
    
    .section-button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 1160px;
      margin: 0 auto;
      
      .button-fee {
        
        span {
          line-height: 35px;
          opacity: 0.5;
        }
        
        div {
          display: inline-block;
          margin: 0 2px 0 20px;
          font-size: 32px;
          font-weight: bold;
          word-break: break-all;
        }
      }
      
      .btn-back {
        display: inline-block;
        min-height: 60px;
        min-width: 90px;
        padding: 16px 10px 17px;
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
      
      .btn-payment {
        display: inline-block;
        min-height: 60px;
        min-width: 250px;
        padding: 16px 10px 17px;
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
  
  .lp-modal {
    position: absolute;
    top: 10%;
    left: 38%;
    transform: translate(-38%, -15%);
  }
`;