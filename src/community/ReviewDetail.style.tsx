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
    padding: 60px 0 200px;
    margin: 0 auto;

    .ld-head {
      padding-bottom: 40px;
      border-bottom: 1px solid ${({theme}) => theme.rgbaMedium};

      .head-top {
        display: flex;
        align-items: center;
        font-size: 13px;
        line-height: 19px;
        opacity: 0.5;

        .head-item {
          position: relative;
          float: left;
          padding-right: 8px;
          margin-right: 8px;
          word-break: break-all;

          &:after {
            display: block;
            content: '';
            position: absolute;
            top: 5px;
            right: 0;
            width: 1px;
            height: 10px;
            background-color: #dfd9d5;
          }
        }

        .bd-institution {

        }

        .bd-date {

        }
      }

      .head-bottom {

        .ld-title {
          margin-top: 10px;
          font-size: 32px;
          font-weight: bold;
          line-height: 40px;
        }
        
        .ld-score {
          display: flex;
          justify-content: flex-end;
          visibility: visible;
          padding-right: 8px;
          margin-right: 8px;
        }
      }
    }

    .ld-body {

      .ld-content {
        padding: 80px 68px 100px;
        border-bottom: 1px solid ${({theme}) => theme.rgbaMedium};
        text-align: center;
      }
      
      .ld-lt-info {
        
        .info-head {
          
        }
        
        .info-body {
          display: flex;
          
          .ld-lt-left {
            
          }
          
          .ld-lt-right {
            
            .ld-lt-top {
              
              .ld-lt-state {
                
              }
              
              .ld-lt-mainCategory {
                
              }
              
              .ld-lt-subCategory {
                
              }
            }
            
            .ld-lt-mid {
              
              .ld-lt-title {
                
              }
            }
            
            .ld-lt-bot {
              
              .ld-lt-institution {
                
              }
              
              .ld-lt-teacher {
                
              }
              
              .ld-lt-period {
                
              }
            }
          }
        }
      }
    }

    .ld-foot {
      display: flex;
      justify-content: center;
      margin: 40px 0;

      button {
        display: inline-block;
        padding: 16px 10px 17px;
        min-height: 60px;
        min-width: 160px;
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