import styled from "styled-components";

export const MemberInfoView = styled.div`
  position: relative;
  
  .mi-sub {
    height: 100%;
    width: 100%;
    margin: 40px auto 0;
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

  .mi-main {
    width: 1160px;
    margin: 60px auto 70px;
    
    .mi-info-view {
      margin-top: 40px;
      
      .mi-info-title {
        margin-bottom: 30px;
        font-size: 24px;
        font-weight: bold;
        line-height: 32px;
        letter-spacing: -.6px;
      }
      
      .mi-info-content {
        display: flex;
        padding-bottom: 30px;
        border-bottom: 1px solid ${({theme}) => theme.rgbaMedium};
        
        .content-left {
          width: 100%;
          
        }
        
        .content-right {
          width: 100%;
          
        }
        
        .content-item {
          display: flex;
          align-items: center;
          height: 26px;
          margin-bottom: 20px;
          
          
          span {
            width: 120px;
            font-weight: normal;
          }
          
          div {
            width: calc(100% - 120px);
            font-size: 16px;
            font-weight: bold;
            line-height: 26px;
            letter-spacing: -.4px;
          }
        }
      }
    }
    
    .mi-modal-section {
      position: absolute;
      top: 25%;
      left: 50%;
      transform: translate(-50%, -25%);
    }
    
    .mi-info-update {
      margin-top: 30px;
      text-align: right;
      
      .mi-button-section {
        
        button {
          display: inline-block;
          height: 44px;
          min-height: auto;
          min-width: 160px;
          padding: 6px 10px;
          margin-left: 8px;
          border: 2px solid ${({theme}) => theme.rgbaMedium};
          border-radius: 9px;
          background-color: ${({theme}) => theme.bgColor};
          color: ${({theme}) => theme.textColor};
          text-align: center;
          font-size: 15px;
          font-weight: bold;
          letter-spacing: -.75px;
          transition: all .4s ease;
          cursor: pointer;
        }
      }
    }
    
    .mi-move-view {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 140px auto 0;
      
      .move-item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 150px;
        padding: 20px;
        border-radius: 15px;
        background: ${({theme}) => theme.rgbaLight};
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        transition: all .4s ease;
        cursor: pointer;
        
        .icon-custom {
          display: block;
          margin-bottom: 15px;
          font-size: 50px;
        }
      }
    }
  }
  
`;