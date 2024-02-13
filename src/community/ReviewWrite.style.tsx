import styled from "styled-components";

export const ReviewWriteView = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -10%);
  height: 680px;
  width: 600px;
  padding: 30px;
  border: 1px solid ${({theme}) => theme.textColor};
  border-radius: 15px;
  background-color: ${({theme}) => theme.bgColor};
  z-index: 5;
  
  .item-title {
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .rw-view {
    
    .rw-view-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin: 15px auto 0;
      
      .rw-title {
        width: 60%;

        input {
          box-sizing: border-box;
          width: 100%;
          border: ${({theme}) => theme.borderColor};
          border-radius: 10px;
          padding: 10px;
          margin-top: 8px;
          font-size: 16px;
          font-weight: bold;
          background-color: ${({theme}) => theme.boxBgColor};
          color: ${({theme}) => theme.textColor};
        }
      }
      
      .rw-score {
        width: 35%;
        margin-left: 30px;
        
        .score-view {

          .score-item {
            display: inline-block;
            font-size: 35px;
            cursor: pointer;
          }
        }
      }
    }
    
    .rw-content {
      margin-top: 15px;
      
    }
    
    .rw-button {
      margin: 15px auto 0;
      text-align: center;

      .btn-cancel {
        display: inline-block;
        min-height: 30px;
        min-width: 60px;
        padding: 8px 5px 9px;
        border: 2px solid ${({theme}) => theme.rgbaMedium};
        border-radius: 8px;
        background-color: ${({theme}) => theme.bgColor};
        color: ${({theme}) => theme.textColor};
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        transition: all .4s ease;
        cursor: pointer;
      }

      .btn-submit {
        display: inline-block;
        min-height: 30px;
        min-width: 120px;
        padding: 8px 5px 9px;
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
  }

`;