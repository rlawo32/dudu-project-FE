import styled from "styled-components";

export const LectureSearchBox = styled.div<{ $showBox:boolean }>`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: ${({$showBox}) => $showBox ? 0 : "-410px"};
  height: 100%;
  width: 410px;
  @media screen and (max-width: 1024px) {
    width: 260px;
  }
  padding: 30px;
  border-left: 1px solid rgba(0,0,0,0.3);
  background-color: ${({theme}) => theme.boxBgColor};
  overflow: auto;
  
  z-index: 99;
  transition: all 0.4s ease-in;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: bisque; /* 스크롤바의 색상 */
    border-radius: 15px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 1);
  }
  
  .search-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 15px 0;
    font-size: 17px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .search-header {
    margin-bottom: 25px;
    border-bottom: 1px solid lightsteelblue;

    .search-title { 
      cursor: auto;
    }
    
    .search-text {
      position: relative;

      input {
        width: 100%;
        box-sizing: border-box;
        outline: none;
        margin: 35px auto 15px;
        padding: 12px 45px 11px 15px;
        border: none;
        border-radius: 15px;
        font-size: 16px;
      }

      .icon-custom {
        width: 15%;
        position: absolute;
        top: 44px;
        right: 0;
        color: black;
        font-size: 23px;
        cursor: pointer;
      }
    }
  }

  .search-body {
    box-sizing: border-box;
    position: relative;
    height: 65%;
    padding-right: 10px;
    overflow: auto;

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
    
    ul {
      box-sizing: border-box;
      position: relative;
      top: 105%;
      height: 0;
      width: 100%;
      padding: 0;
      margin: 0;
      border: none;
      border-radius: 15px;
      overflow: hidden;
      background: ${({theme}) => theme.boxBgColor};
      color: ${({theme}) => theme.textColor};
      text-align: center;
      cursor: pointer;
      z-index: 2;
      user-select: none;
      list-style:none;
      transition: all 0.3s ease-in;
    }
      
    ul li {
      float: left;
      padding: 5px 10px 5px 10px;
      margin: 7px 5px 0 0;
      border-radius: 7px;
      background-color: lightgray;
      color: black;
      font-size: 13px;
      line-height: 1.4em;
      transition: all 0.3s ease-in;
    }
    
    ul li.btn-active {
      background-color: springgreen;
      font-weight: bold;
    }
    
    ul li.btn-active {
      background-color: springgreen;
      font-weight: bold;
    }
    
    .search-item-section {
      position: relative;
      margin: 0 auto 25px;
      border-bottom: 1px solid lightsteelblue;
      outline: none;
      
      .item-arrow {
        display: inline-block;
        margin-left: 15px;
        transition: all .4s linear;
      }

      .item-arrow.show-list {
        transform: rotate(180deg);
      }
    }
    
    .search-division {

      .division-item-list.show-list {
        padding: 5px;
        height: 52px;
      }
    }

    .search-state {

      .state-item-list.show-list {
        padding: 5px;
        height: 92px;
        @media screen and (max-width: 1024px) {
          height: 127px;
        }
      }
    }

    .search-dow {

      .dow-item-list.show-list {
        padding: 5px;
        height: 92px;
        @media screen and (max-width: 1024px) {
          height: 127px;
        }
      }
    }

    .search-fee {

      ul li {
        font-size: 12px;
      }

      .fee-item-list.show-list {
        padding: 5px;
        height: 112px;
        @media screen and (max-width: 1024px) {
          height: 147px;
        }
      }
    }
    
    .count-view {
      display: inline-block;
      width: 17px;
      padding: 1px;
      margin-left: 5px;
      border: none;
      border-radius: 50%;
      background-color: ${({theme}) => theme.reverseBgColor};
      color: ${({theme}) => theme.reverseTextColor};
      text-align: center;
      font-size: 13px;
    }
  }
  
  .search-footer {
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    width: 100%;
    margin-top: 60px;
    z-index: 5;
    
    button {
      box-sizing: border-box;
      border: none;
      border-radius: 10px;
      padding: 10px 15px 10px 15px;
      cursor: pointer;
    }
    
    .reset-btn {
      margin-right: 12px;
      background: none;
      color: ${({theme}) => theme.textColor};
      font-size: 17px;
      @media screen and (max-width: 1024px) {
        font-size: 12px;
      }
      
      .icon-custom {
        margin-right: 5px;
        font-size: 21px;
      }
    }
    
    .search-btn {
      width: 57%;
      background-color: ${({theme}) => theme.reverseBgColor};
      color: ${({theme}) => theme.reverseTextColor};
      font-size: 21px;
      @media screen and (max-width: 1024px) {
        width: 42%;
        font-size: 16px;
      }
      font-weight: bold;
    }
  }
`;