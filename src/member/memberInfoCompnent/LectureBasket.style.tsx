import styled from "styled-components";

export const LectureBasketView = styled.div`
  position: relative;

  .lb-sub {
    height: 100%;
    width: 100%;
    background: rgba(216,201,201,0.5);

    .lb-sub-view {
      width: 1160px;
      @media screen and (max-width: 1280px) {
        width: 100%;
        padding: 62px 0 80px;
      }
      padding: 82px 0 150px;
      margin: 0 auto;
      text-align: center;

      .lb-sub-title {
        margin: 7% auto 0;
        font-size: 48px;
        @media screen and (max-width: 1024px) {
          font-size: 32px;
        }
      }
    }
  }

  .lb-main {
    width: 1160px;
    margin: 30px auto 120px;

    .lb-list-view {

      .lb-list-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .list-top-left {
          
        }
        
        .list-top-right {
          
        }
      }
      
      .lb-list-tool {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 40px 0 10px;
        
        .check-all {
          
          div {
            font-size: 16px;
            font-weight: bold;
          }
        }

        .check-delete {
          display: flex;
          align-items: center;
          cursor: pointer;

          div {
            margin-left: 7px;
            font-size: 16px;
            font-weight: bold;
          }
          
          .icon-custom {
            font-size: 18px;
          }
        }
      }

      .lb-list {

        .lb-list-item {
          box-sizing: border-box;
          display: flex;
          padding: 40px;
          margin-top: 20px;
          border: 1px solid #ddcdc5;
          border-radius: 12px;
          background-color: ${({theme}) => theme.cardBgColor};
          color: ${({theme}) => theme.textColor};
          
          .item-checkbox {
            margin-right: 10px;
          }
          
          .item-left {
            width: 40%;
            margin-right: 40px;
            
            .left-top{
              display: flex;
              
              .item-state {
                padding: 3px 7px 3px 7px;
                margin-right: 6px;
                border: none;
                border-radius: 10px;
                background-color: greenyellow;
                font-size: 11px;
                font-weight: bold;
              }
              
              .item-institution {
                padding: 3px 7px 3px 7px;
                border: none;
                border-radius: 10px;
                background-color: lightgray;
                color: black;
                font-size: 11px;
                font-weight: bold;
              }
            }
            
            .left-bot {
              margin-top: 7px;
              
              .item-title {
                font-size: 24px;
                font-weight: bold;
                line-height: 32px;
                letter-spacing: -.6px;
                word-break: keep-all;
                overflow-wrap: break-word;
              }
            }
          }
          
          .item-right {
            width: 50%;
            padding: 0 30px 0 20px;
            border-left: 1px solid ${({theme}) => theme.rgbaLight};
            
            .item-info {
              display: flex;
              align-items: center;
              margin-top: 8px;
              font-size: 13px;
              line-height: 22px;
              letter-spacing: -.3px;
              
              .info-title {
                width: 120px;
                margin-right: 20px;
              }
              
              .item-total {
                font-size: 15px;
                font-weight: bold;
              }
            }
          }
          
          .item-delete {
            
            .icon-custom {
              margin-top: 2px;
              font-size: 20px;
              cursor: pointer;
            }
          }
        }
      }

      .lb-list-empty {
        margin: 60px auto;
        text-align: center;
        color: grey;
        font-size: 25px;

        .icon-custom {
          margin: 15px 0 15px 0;
          font-size: 70px;
        }

      }
    }
  }
    .lb-button {
      position: sticky;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 24px 0;
      border-top: 2px solid ${({theme}) => theme.textColor};
      background-color: ${({theme}) =>theme.bgColor};
    
      .button-fee {
        display: flex;
      
        .fee-count {
          
        }
        
        .fee-text {
          
        }
        
        .fee-amount {
          
        }
        
        .fee-unit {
          
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
      }
    }
  
    .lb-button {
      position: sticky;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      padding: 24px 0;
      border-top: 2px solid ${({theme}) => theme.textColor};
      background-color: ${({theme}) =>theme.bgColor};
    
      .button-fee {
        display: flex;
        align-items: baseline;
        line-height: 35px;
      
        .fee-count {
          margin-right: 2px;
          font-weight: bold;
        }
        
        .fee-text {
          opacity: 0.7;
        }
        
        .fee-payment {
          max-width: 80%;
          margin-left: 20px;

          .fee-amount {
            display: inline-block;
            margin-right: 2px;
            font-size: 32px;
            font-weight: bold;
          }

          .fee-unit {
            display: inline-block;
            font-weight: bold;
          }
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
      }
    }
`;

export const CheckBoxInput = styled.input`
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
`;

export const CheckBoxLabel = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
`;

export const CheckBoxText = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  
  .icon-custom {
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 0.35rem;
  }
`;