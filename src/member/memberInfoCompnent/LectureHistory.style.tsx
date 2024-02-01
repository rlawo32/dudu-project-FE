import styled from "styled-components";

export const LectureHistoryView = styled.div`
  position: relative;

  .lh-sub {
    height: 100%;
    width: 100%;
    background: rgba(216,201,201,0.5);

    .lh-sub-view {
      width: 1160px;
      @media screen and (max-width: 1280px) {
        width: 100%;
        padding: 62px 0 80px;
      }
      padding: 82px 0 150px;
      margin: 0 auto;
      text-align: center;

      .lh-sub-title {
        margin: 7% auto 0;
        font-size: 48px;
        @media screen and (max-width: 1024px) {
          font-size: 32px;
        }
      }
    }
  }
  
  .lh-main {
    width: 1160px;
    margin: 30px auto 120px;

    .lh-main-notice {
      position: relative;
      padding: 32px;
      margin: 40px 0 30px 0;
      border-radius: 12px;
      background-color: ${({theme}) => theme.noticeBgColor};
      color: ${({theme}) => theme.textColor};

      ul {
        padding-left: 20px;

        li {
          line-height: 32px;
          opacity: 0.7;
        }
      }
    }
    
    .lh-main-list {
      
      .lh-list-category {
        display: flex;
        width: 100%;
        font-size: 20px;
        text-align: center;
        cursor: pointer;
        @media screen and (max-width: 1024px) {
          font-size: 16px;
        }

        .lh-category {
          width: 50%;
          padding: 20px 0;
          border-bottom: 1px solid ${({theme}) => theme.rgbaLight};
        }

        .lh-category.category-active {
          border-bottom: 2px solid ${({theme}) => theme.rgbaBold};
          font-weight: bold;
        }
      }
      
      .lh-list-search {
        position: relative;
        width: 600px;
        @media screen and (max-width: 1024px) {
          box-sizing: border-box;
          width: 100%;
          padding: 0 20px;
        }
        margin: 40px auto 0;

        input {
          box-sizing: border-box;
          height: 52px;
          width: 100%;
          padding: 0 80px 0 25px;
          background-color: ${({theme}) => theme.cardBgColor};
          color: ${({theme}) => theme.textColor};
          border: 1px solid ${({theme}) => theme.textColor};
          border-radius: 30px;
          font-size: 20px;
        }
        
        .icon-custom {
          position: absolute;
          top: 10px;
          right: 30px;
          font-size: 30px;
          cursor: pointer;
          @media screen and (max-width: 1024px) {
            right: 50px;
          }
        }
      }
      
      .lh-list-view {
        
        .lh-list-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 68px;
          
          .list-top-left {
            font-weight: bold;

            span {
              font-weight: normal;
              opacity: 0.7;
            }
          }
          
          .list-top-right {
            position: relative;

            button {
              border: none;
              background: none;
              color: ${({theme}) => theme.textColor};
              font-size: 16px;
              @media screen and (max-width: 1024px) {
                font-size: 13px;
              }
              font-weight: bold;
              cursor: pointer;
            }

            .sort-box {
              position: absolute;
              top: 105%;
              right: 0;
              height: 0;
              width: 0;
              padding: 0;
              margin: 5px auto 0;
              border: none;
              border-radius: 5px;
              background: ${({theme}) => theme.boxBgColor};
              text-align: center;
              z-index: 2;
              transition: all 0.3s ease-in;
            }

            ul.sort-list {
              height: 0;
              width: 0;
              padding: 0;
              margin: 5px auto 0;
              border: none;
              overflow: auto;
              background: ${({theme}) => theme.boxBgColor};
              color: ${({theme}) => theme.textColor};
              text-align: center;
              cursor: pointer;
              z-index: 3;
              user-select: none;
              list-style:none;
              transition: all 0.3s ease-in;

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

            ul.sort-list li {
              padding: 5px;
              font-size: 12px;
              line-height: 1.4em;
              opacity: 0.7;
              transition: all 0.3s ease-in;
            }

            .select-arrow {
              display: inline-block;
              margin-left: 7px;
              transition: all .4s linear;
            }

            .sort-box.show-list {
              border: 1px solid gray;
              padding: 5px;
              height: 100px;
              width: 70px;
            }

            .sort-list.show-list {
              border: none;
              padding: 5px;
              height: 85px;
              width: 60px;
            }

            ul.sort-list li.sort-active {
              opacity: 1;
              font-weight: bold;
            }

            .select-arrow.show-list {
              transform: rotate(180deg);
            }
          }
        }
        
        .lh-modal-section {
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translate(-50%, -20%);
        }
        
        .lh-list {
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
          margin-top: 20px;
          
          .lh-list-item {
            width: calc((100% - 225px) / 2);
            padding: 30px;
            margin: 0 25px 30px;
            border: 1px solid #ddcdc5;
            border-radius: 12px;
            background-color: ${({theme}) => theme.cardBgColor};
            
            .item-head {
              box-sizing: border-box;
              position: relative;
              top: -15px;
              left: -15px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              min-height: 56px;
              width: calc(100% + 30px);
              padding: 10px 15px;
              margin-bottom: 5px;
              border-radius: 12px;
              background-color: ${({theme}) => theme.boxBgColor};
              
              .head-value {
                display: flex;
                font-size: 14px;
                font-weight: 500;
                line-height: 22px;
                letter-spacing: -.35px;
                
                div {
                  width: 60px;
                }
              }
              
              .payment-cancel-btn {
                display: inline-block;
                min-height: 10px;
                min-width: 50px;
                padding: 8px 5px 9px;
                border: 2px solid ${({theme}) => theme.rgbaMedium};
                border-radius: 8px;
                background-color: ${({theme}) => theme.bgColor};
                color: ${({theme}) => theme.textColor};
                font-size: 12px;
                font-weight: bold;
                text-align: center;
                transition: all .4s ease;
                cursor: pointer;
              }
            }
            
            .item-body {
              padding-bottom: 20px;
              border-bottom: 1px solid ${({theme}) => theme.rgbaMedium};
              
              .body-value {
                font-size: 14px;
                line-height: 22px;
                word-break: break-all;
              }
              
              .body-top {
                width: 100%;
                
                .item-institution {
                  width: fit-content;
                  padding: 0 6px;
                  margin: 0 2px 2px 0;
                  border: 1px solid ${({theme}) => theme.rgbaMedium};
                  border-radius: 9px;
                  font-size: 11px;
                  line-height: 16px;
                  white-space: nowrap;
                }
                
                .item-title {
                  min-height: 65px;
                  margin-top: 4px;
                  font-size: 20px;
                  font-weight: bold;
                  line-height: 32px;
                  letter-spacing: -.6px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: normal;
                  word-break: keep-all;
                  cursor: pointer;
                }
              }
              
              .body-bot {
                margin-top: 16px;
                
                .item-period {
                  
                  span {
                    margin-left: 3px;
                  }
                }
                
                .item-fee {
                  font-weight: bold;
                  
                  span {
                    margin-right: 3px;
                    font-weight: normal;
                  }
                }
                
                .item-mote-btn {
                  width: 100%;
                  margin-top: 20px;
                  
                  button {
                    height: 44px;
                    width: 100%;
                    padding: 2px 8px 4px;
                    border: 1px solid ${({theme}) => theme.rgbaMedium};
                    border-radius: 8px;
                    background-color: #e0f55c;
                    color: black;
                    text-align: center;
                    font-size: 14px;
                    font-weight: bold;
                    line-height: 38px;
                    letter-spacing: -.75px;
                    cursor: pointer;
                  }
                }
              }
            }
            
            .item-foot {
              padding: 20px 0;
              
              .item-memberName {
                margin-bottom: 15px;
                font-size: 22px;
                font-weight: bold;
                line-height: 32px;
                letter-spacing: -.4px;
              }
              
              .foot-value {
                font-size: 16px;
                font-weight: bold;
                
                .item-paymentState {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-top: 7px;
                  
                }

                .item-paymentFee {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-top: 7px;

                }
                
                span {
                  font-weight: normal;
                }
              }
            }
          }
        }

        .lh-list-empty {
          margin: 60px auto;
          text-align: center;
          color: grey;
          font-size: 25px;

          .icon-custom {
            margin: 15px 0 15px 0;
            font-size: 70px;
          }

          .empty-text {

            .search-text {
              color: ${({theme}) => theme.textColor};
              font-weight: bold;
            }

            .icon-custom {
              margin: 8px 3px 8px 3px;
              color: ${({theme}) => theme.textColor};
              font-size: 20px;
            }
          }

        }

        .lh-more-btn {
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
      }
    }
  }
`;