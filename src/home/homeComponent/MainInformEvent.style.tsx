import styled from "styled-components";

export const MainInformEventView = styled.div`
  position: relative;
  width: 1440px;
  margin: 150px auto;
  @media screen and (max-width: 1440px) {
    box-sizing: border-box;
    width: calc(100% - 30px);
    padding: 60px 10px 20px;
    margin: 250px 15px;
    border-radius: 10px;
    background: ${({theme}) => theme.boxBgColor};
  }
  @media screen and (max-width: 1024px) {
    padding: 40px 10px 30px;
  }
  
  .el-title {
    position: relative;
    padding-right: 40px;
    font-size: 24px;
    font-weight: bold;
    line-height: 32px;
    cursor: pointer;
    
    @media screen and (max-width: 1024px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: calc(100% - 20px);
      margin: 0 20px 40px 20px;
    }
    @media screen and (min-width: 1024px) {
      display: none;
    }
    .icon-custom {
      margin-right: 20px;
      font-size: 20px;
    }
  }
  
  .el-list {
    display: flex;
    @media screen and (max-width: 1024px) {
      flex-direction: column;
      width: 100%;
      margin: 0;
    }
    
    .el-list-item {
      box-sizing: border-box;
      position: relative;
      width: calc((100% - 96px) / 4);
      padding: 40px 40px 85px 40px;
      margin: 0 16px;
      background-color: ${({theme}) => theme.noticeBgColor};
      color: ${({theme}) => theme.textColor};
      cursor: pointer;
      @media screen and (max-width: 1024px) {
        min-height: 0;
        width: calc(100% - 32px);
        padding: 20px 5px 45px;
        border-bottom: 1px solid #d8c9c9;
        background: none;
      }
      @media screen and (min-width: 1024px) {
        min-height: 150px;
        border: 1px solid #d8c9c9;
        border-radius: 8px;
      }
      
      .el-list-title {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        padding: 0;
        margin-bottom: 8px;
        font-size: 20px;
        font-weight: bold;
        line-height: 32px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        @media screen and (max-width: 1024px) {
          margin-bottom: 2px;
        }
      }
      
      .el-list-content {
        @media screen and (max-width: 1024px) {
          display: none;
        }
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        padding: 0;
        margin: 0;
        font-size: 16px;
        font-weight: normal;
        line-height: 26px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
      }
      
      .el-list-date {
        position: absolute;
        bottom: 30px;
        left: 40px;
        padding: 0;
        margin: 0;
        font-size: 14px;
        line-height: 22px;
        @media screen and (max-width: 1024px) {
          bottom: 20px;
          left: 5px;
          line-height: 12px;
          opacity: 0.6;
        }
      }
    }
  }
  
  .el-more {
    position: relative;
    padding-right: 40px;
    margin: 40px 16px;
    font-size: 24px;
    font-weight: bold;
    line-height: 32px;
    cursor: pointer;
    @media screen and (min-width: 1024px) {
      display: block;
    }
    @media screen and (max-width: 1024px) {
      display: none;
      width: fit-content;
      margin: 0 0 0 5%;
    }
    
    .icon-custom {
      margin-left: 20px;
      font-size: 20px;
    }
  }
`;