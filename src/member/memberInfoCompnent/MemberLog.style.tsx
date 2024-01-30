import styled from "styled-components";

export const MemberLogView = styled.div`
  position: relative;

  .mi-sub {
    height: 100%;
    width: 100%;
    background: rgba(216,201,201,0.5);

    .mi-sub-view {
      width: 1160px;
      @media screen and (max-width: 1280px) {
        width: 100%;
        padding: 62px 0 80px;
      }
      padding: 82px 0 150px;
      margin: 0 auto;
      text-align: center;

      .mi-sub-title {
        margin: 7% auto 0;
        font-size: 48px;
        @media screen and (max-width: 1024px) {
          font-size: 32px;
        }
      }
    }
  }
  
  
`;