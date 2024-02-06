import styled from "styled-components";

export const LectureBasketView = styled.div`
  position: relative;

  .lb-sub {
    height: 100%;
    width: 100%;
    margin: 40px auto 0;
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
    @media screen and (max-width: 1280px) {
      box-sizing: border-box;
      width: 100%;
      padding: 0 30px;
    }

    .lb-list-view {

      .lb-list-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .list-top-left {
          font-weight: bold;

          span {
            font-weight: normal;
            opacity: 0.7;
          }
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
          @media screen and (max-width: 1024px) {
            padding: 40px 40px 20px 40px;
          }
          
          .item-checkbox {
            margin-right: 10px;
          }
          
          .item-content {
            display: flex;
            width: 100%;
            @media screen and (max-width: 1024px) {
              flex-direction: column;
              padding-bottom: 10px;
            }
            
            .item-left {
              width: 40%;
              margin-right: 40px;
              @media screen and (max-width: 1024px) {
                width: 100%;
                padding-bottom: 10px;
              }

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
                  cursor: pointer;
                }
              }
            }

            .item-right {
              width: 50%;
              padding: 0 30px 0 20px;
              border-left: 1px solid ${({theme}) => theme.rgbaLight};
              @media screen and (max-width: 1024px) {
                width: 100%;
                padding: 0;
                border: none;
              }

              .item-info {
                display: flex;
                align-items: center;
                margin-top: 8px;
                font-size: 13px;
                line-height: 22px;
                letter-spacing: -.3px;

                .responsive-title {
                  @media screen and (max-width: 1024px) {
                    display: none;
                  }
                }
                
                .info-title {
                  width: 120px;
                  margin-right: 20px;
                }
                
                .item-teacher {
                  
                  @media screen and (max-width: 1024px) {
                    margin-top: 4px;
                    line-height: 16px;
                  }
                }
                
                .item-period {
                  
                  @media screen and (max-width: 1024px) {
                    margin-top: 4px;
                    line-height: 16px;
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
                
                .item-time {

                  @media screen and (max-width: 1024px) {
                    display: none;
                  }
                }
                
                .item-total {
                  font-size: 15px;
                  font-weight: bold;
                }
              }
              
              .item-amount {
                padding-top: 10px;
                margin-top: 15px;
                border-top: 1px solid ${({theme}) => theme.rgbaLight};

                .item-info {
                  
                  @media screen and (max-width: 1024px) {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 12px;
                  }
                }
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

  .lb-more-btn {
    width: 25%;
    margin: 40px auto 0;
    padding: 10px 15px 10px 15px;
    border: 1px solid ${({theme}) => theme.textColor};
    border-radius: 10px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
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
      @media screen and (max-width: 1024px) {
        box-sizing: border-box;
        justify-content: space-between;
        padding: 24px;
      }
    
      .button-fee {
        display: flex;
        align-items: baseline;
        line-height: 35px;
        @media screen and (max-width: 1024px) {
          flex-direction: column;
        }
        
        .fee-text {

          .fee-count {
            display: inline-block;
            margin-right: 2px;
            font-weight: bold;
          }
          
          .text-light {
            display: inline-block;
            opacity: 0.7;
          }
        }
        
        .fee-payment {
          max-width: 90%;
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
        @media screen and (max-width: 1024px) {
          min-height: 40px;
          min-width: 200px;
          padding: 13px 10px 14px;
          font-size: 16px;
        }
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