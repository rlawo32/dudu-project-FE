import styled from "styled-components";

export const MemberLogView = styled.div`
  position: relative;

  .ml-sub {
    height: 100%;
    width: 100%;
    background: rgba(216,201,201,0.5);

    .ml-sub-view {
      width: 1160px;
      @media screen and (max-width: 1280px) {
        width: 100%;
        padding: 62px 0 80px;
      }
      padding: 82px 0 150px;
      margin: 0 auto;
      text-align: center;

      .ml-sub-title {
        margin: 7% auto 0;
        font-size: 48px;
        @media screen and (max-width: 1024px) {
          font-size: 32px;
        }
      }
    }
  }
  
  .ml-main {
    width: 1160px;
    margin: 30px auto 120px;
    
    .ml-main-list {
      
      .ml-list-view {
        
        .ml-list-top {
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
              margin: 0;
              height: 65px;
              width: 70px;
            }

            .sort-list.show-list {
              border: none;
              padding: 5px;
              margin: 0;
              height: 55px;
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
        
        .ml-list {
          
          .ml-list-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding: 32px 0;
            border-bottom: 1px solid ${({theme}) => theme.rgbaLight};
            transition: border .3s ease;
            @media screen and (max-width: 1024px) {
              display: block;
              padding: 16px 0;
            }

            &:hover {
              border-bottom: 1px solid ${({theme}) => theme.rgbaMedium};
            }
            
            .item-info {
              display: flex;
              align-items: center;
              
              .item-successYn {
                padding: 2px 4px;
                margin-right: 5px;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
              }
              
              .item-reason {
                font-size: 18px;
                font-weight: bold;
              }
            }
            
            .item-date {
              font-size: 16px;
              opacity: 0.7;
            }
          }
        }
        
        .ml-more-btn {
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