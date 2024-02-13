import styled from "styled-components";

export const LectureReviewView = styled.div<{$isModal:boolean}>`
  position: relative;
  pointer-events: ${({$isModal}) => $isModal ? "none" : "auto"};

  .lr-sub {
    height: 100%;
    width: 100%;
    margin: 40px auto 0;
    background: rgba(216,201,201,0.5);

    .lr-sub-view {
      width: 1160px;
      @media screen and (max-width: 1280px) {
        width: 100%;
        padding: 62px 0 80px;
      }
      padding: 82px 0 150px;
      margin: 0 auto;
      text-align: center;

      .lr-sub-title {
        margin: 7% auto 0;
        font-size: 48px;
        @media screen and (max-width: 1024px) {
          font-size: 32px;
        }
      }
    }
  }

  .lr-main {
    width: 1160px;
    margin: 70px auto 120px;
    
    .lr-modal-section {
      pointer-events: ${({$isModal}) => $isModal ? "auto" : "none"};
    }

    .lr-main-list {

      .lr-list-view {

        .lr-list-top {
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
              width: 70px;
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
              width: 60px;
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

        .lr-list {
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
          margin-top: 20px;
          @media screen and (max-width: 1024px) {
            flex-direction: column;
            padding: 0 10px;
          }
          
          .lr-list-item {
            width: calc((100% - 225px) / 2);
            padding: 30px;
            margin: 0 25px 30px;
            border: 1px solid #ddcdc5;
            border-radius: 12px;
            background-color: ${({theme}) => theme.cardBgColor};
            @media screen and (max-width: 1024px) {
              box-sizing: border-box;
              width: 100%;
              margin: 20px 0;
            }
            
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
              }
            }
            
            .item-foot {
              
              .review-detail-btn {
                height: 44px;
                width: 100%;
                padding: 2px 8px 4px;
                margin-top: 20px;
                border: 1px solid ${({theme}) => theme.rgbaMedium};
                border-radius: 8px;
                background-color: #777777;
                color: white;
                text-align: center;
                font-size: 14px;
                font-weight: bold;
                line-height: 38px;
                letter-spacing: -.75px;
                cursor: pointer;
              }

              .review-write-btn {
                height: 44px;
                width: 100%;
                padding: 2px 8px 4px;
                margin-top: 20px;
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