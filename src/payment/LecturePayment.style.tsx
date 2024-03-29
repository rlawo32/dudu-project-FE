import styled from "styled-components";

export const LecturePaymentView = styled.div<{$isModal:boolean}>`
  position: relative;
  pointer-events: ${({$isModal}) => $isModal ? "none" : "auto"};

  .lp-sub {
    height: 100%;
    width: 100%;
    margin: 40px auto 0;
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
    margin: 100px auto 50px;
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
        margin-top: 20px;
        border: 1px solid #ddcdc5;
        border-radius: 12px;
        
        .lp-content-top {
          display: flex;
          padding-bottom: 40px;
          border-bottom: 1px solid ${({theme}) => theme.textColor};
          @media screen and (max-width: 1024px) {
            flex-direction: column;
            padding-bottom: 10px;
          }
          
          .lp-top-left {
            width: calc(50% - 60px);
            margin-right: 60px;
            @media screen and (max-width: 1024px) {
              width: 100%;
            }
            
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
            @media screen and (max-width: 1024px) {
              width: 100%;
              padding: 0;
              border: none;
            }

            .responsive-title {
              @media screen and (max-width: 1024px) {
                display: none;
              }
            }
            
            .section-title {
              width: 120px;
              margin-right: 20px;
              font-size: 13px;
              line-height: 32px;
              @media screen and (max-width: 1024px) {
                width: fit-content;
                line-height: 24px;
                margin-right: 10px;
              }
            }
            
            .lp-teacher {
              display: flex;
              width: calc(100% - 140px);
              font-size: 13px;
              line-height: 32px;
              word-break: break-all;
              @media screen and (max-width: 1024px) {
                margin-top: 15px;
                line-height: 24px;
              }
            }
            
            .lp-period {
              display: flex;
              width: calc(100% - 140px);
              font-size: 13px;
              line-height: 32px;
              word-break: break-all;
              @media screen and (max-width: 1024px) {
                width: 100%;
                line-height: 24px;
              }
              
              .responsive-period {
                display: none;
                @media screen and (max-width: 1024px) {
                  display: inline-block;
                  margin-left: 4px;
                  
                  div {
                    display: inline-block;
                    margin-left: 4px;
                  }
                }
              }
            }
            
            .lp-time {
              display: flex;
              width: calc(100% - 140px);
              font-size: 13px;
              line-height: 32px;
              word-break: break-all;
              @media screen and (max-width: 1024px) {
                display: none;
              }
              
              span {
                margin: 0 4px;
              }
            }
            
            .lp-fee {
              display: flex;
              width: calc(100% - 140px);
              font-size: 13px;
              line-height: 32px;
              word-break: break-all;
              @media screen and (max-width: 1024px) {
                line-height: 24px;
              }
              
            }
          }
        }
        
        .lp-content-bot {
          position: relative;
          display: flex;
          padding: 32px 0 0;
          @media screen and (max-width: 1024px) {
            flex-direction: column;
            padding: 0;
          }
          
          .lp-bot-left {
            width: 50%;
            font-weight: bold;
            @media screen and (max-width: 1024px) {
              width: 100%;
            }
            
            .lp-member {
              margin-bottom: 12px;
              font-size: 18px;
              @media screen and (max-width: 1024px) {
                margin: 20px 0;
              }
            }
          }

          .lp-bot-right {
            width: 50%;
            padding-left: 20px;
            @media screen and (max-width: 1024px) {
              width: 100%;
              padding: 0;
            }

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
        background-color: ${({theme}) => theme.noticeBgColor};
        color: ${({theme}) => theme.textColor};

        .section-title {
          font-size: 16px;
          font-weight: bold;
          line-height: 26px;
          letter-spacing: -.4px;
        }
        
        ul {
          padding-left: 20px;
          @media screen and (max-width: 1024px) {
            font-size: 12px;
          }
          
          li {
            line-height: 32px;
            opacity: 0.7;
          }
        }
      }
    }
  }
  
  .lp-button {
    box-sizing: border-box;
    position: sticky;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 24px 180px;
    margin: 0 auto;
    border-top: 2px solid ${({theme}) => theme.textColor};
    background-color: ${({theme}) => theme.bgColor};
    opacity: 1;
    @media screen and (max-width: 1280px) {
      width: 100%;
      padding: 24px 32px;
    }
    @media screen and (max-width: 1024px) {
      flex-direction: column;
      padding: 12px 0;
    }

    .button-fee {
      @media screen and (max-width: 1024px) {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0 52px;
        margin-bottom: 10px;
      }

      .fee-text {
        display: inline-block;
        width: fit-content;
        font-size: 18px;
        line-height: 35px;
        opacity: 0.5;
      }

      .fee-amount {
        display: inline-block;
        width: fit-content;
        margin: 0 2px 0 20px;
        font-size: 32px;
        font-weight: bold;
        word-break: break-all;
      }
    }

    .button-active {
      @media screen and (max-width: 1024px) {
        box-sizing: border-box;
        width: 100%;
        padding: 12px 8px;
      }
      text-align: center;

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
        @media screen and (max-width: 1024px) {
          min-height: 25px;
          width: 45%;
          min-width: 150px;
          padding: 7px 50px 8px;
          font-size: 14px;
        }
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
        @media screen and (max-width: 1024px) {
          min-height: 25px;
          width: 45%;
          min-width: 150px;
          padding: 7px 50px 8px;
          font-size: 14px;
        }
      }
    }
  }
  
  .lp-modal {
    position: absolute;
    top: 10%;
    left: 38%;
    transform: translate(-38%, -15%);
    pointer-events: ${({$isModal}) => $isModal ? "auto" : "none"};
  }
`;