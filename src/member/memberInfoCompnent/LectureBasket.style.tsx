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

    .lb-main-notice {
      position: relative;
      padding: 32px;
      margin: 40px 0 30px 0;
      border-radius: 12px;
      background-color: #f7f2ef;
      color: black;

      ul {
        padding-left: 20px;

        li {
          line-height: 32px;
          opacity: 0.7;
        }
      }
    }

    .lb-main-list {

      .lb-list-search {
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
          background-color: ${({theme}) => theme.boxBgColor};
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

      .lb-list-view {

        .lb-list-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .lb-list {

        }
      }
    }
  }
`;