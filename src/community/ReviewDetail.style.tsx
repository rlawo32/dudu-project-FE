import styled from "styled-components";

export const ReviewDetailView = styled.div`
  position: relative;
  padding-top: 80px;
  margin: 70px auto 0;

  .ld-main-view {
    width: 1160px;
    @media screen and (max-width: 1280px) {
      box-sizing: border-box;
      width: 100%;
      padding: 20px;
    }
    padding: 60px 0;
    margin: 0 auto;

    .ld-head {
      padding-bottom: 20px;
      border-bottom: 1px solid ${({theme}) => theme.rgbaMedium};

      .head-top {
        display: flex;
        align-items: center;
        font-size: 13px;
        line-height: 19px;
        opacity: 0.6;

        .head-item {
          position: relative;
          float: left;
          padding-right: 8px;
          margin-right: 8px;
          word-break: break-all;
        }

        .ld-author {
          
          &:after {
            display: block;
            content: '';
            position: absolute;
            top: 5px;
            right: 0;
            width: 1px;
            height: 11px;
            background-color: #dfd9d5;
          }
        }

        .ld-date {

        }
      }

      .head-bottom {

        .ld-title {
          margin-top: 10px;
          font-size: 35px;
          font-weight: bold;
          line-height: 40px;
        }
        
        .ld-score {
          display: flex;
          margin-top: 5px;
          font-size: 20px;
        }
      }
    }

    .ld-body {
      padding: 80px 68px 60px;
      border-bottom: 1px solid ${({theme}) => theme.rgbaMedium};

      .ld-content {
        padding: 80px 68px 100px;
        border-bottom: 1px solid ${({theme}) => theme.rgbaLight};
        text-align: center;
      }
      
      .ld-lt-info {
        
        .info-head {
          margin-top: 20px;
          font-size: 24px;
          font-weight: bold;
          line-height: 32px;
          letter-spacing: -.6px;
        }
        
        .info-body {
          display: flex;
          padding: 18px 0 0;
          border: 0;
          cursor: pointer;
          
          .ld-lt-left {
            height: 100px;
            width: 100px;
            border-radius: 10px;

            img {
              height: 100%;
              width: 100%;
              border: none;
              border-radius: 10px;
              object-fit: cover;
              vertical-align: top;

              transition: transform .4s ease;
            }
          }
          
          .ld-lt-right {
            width: calc(100% - 100px);
            margin-left: 20px;
            
            .ld-lt-top {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              
              .ld-lt-state {
                box-sizing: border-box;
                width: fit-content;
                border: none;
                border-radius: 10px;
                margin-right: 2px;
                padding: 1px 6px;
                font-size: 11px;
                font-weight: bold;
              }
              
              .ld-lt-mainCategory {
                box-sizing: border-box;
                width: fit-content;
                border: 1px solid ${({theme}) => theme.textColor};
                border-radius: 10px;
                margin-right: 2px;
                padding: 1px 6px;
                font-size: 11px;
                font-weight: bold;
                color: ${({theme}) => theme.textColor};
              }
              
              .ld-lt-subCategory {
                box-sizing: border-box;
                width: fit-content;
                border: 1px solid ${({theme}) => theme.textColor};
                border-radius: 10px;
                margin-right: 2px;
                padding: 1px 6px;
                font-size: 11px;
                font-weight: bold;
                color: ${({theme}) => theme.textColor};
              }
            }
            
            .ld-lt-mid {
              margin-top: 5px;
              
              .ld-lt-title {
                font-size: 16px;
                font-weight: bold;
                line-height: 22px;
                letter-spacing: -.4px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: normal;
              }
            }
            
            .ld-lt-bot {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              flex-wrap: wrap;
              margin-top: 10px;
              font-size: 13px;
              line-height: 19px;
              opacity: 0.5;
              
              .ld-lt-institution {
                position: relative;
                float: left;
                padding-right: 8px;
                margin-right: 8px;
                word-break: break-all;
                
                &::after {
                  display: block;
                  content: '';
                  position: absolute;
                  top: 5px;
                  right: 0;
                  height: 11px;
                  width: 1px;
                  background: ${({theme}) => theme.rgbaMedium};
                }
              }
              
              .ld-lt-teacher {
                position: relative;
                float: left;
                padding-right: 8px;
                margin-right: 8px;
                word-break: break-all;

                &::after {
                  display: block;
                  content: '';
                  position: absolute;
                  top: 5px;
                  right: 0;
                  height: 11px;
                  width: 1px;
                  background: ${({theme}) => theme.rgbaMedium};
                }
              }
              
              .ld-lt-period {
                position: relative;
                float: left;
                padding-right: 8px;
                margin-right: 8px;
                word-break: break-all;
              }
            }
          }
        }
      }
    }

    .ld-foot {
      display: flex;
      justify-content: center;
      margin: 60px 0;

      button {
        display: inline-block;
        padding: 16px 10px 17px;
        min-height: 60px;
        min-width: 160px;
        border: none;
        border-radius: 8px;
        background-color: ${({theme}) => theme.reverseBgColor};
        color: ${({theme}) => theme.reverseTextColor};
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        line-height: 24px;
        letter-spacing: -.75px;
        cursor: pointer;
      }
    }
  }
`;