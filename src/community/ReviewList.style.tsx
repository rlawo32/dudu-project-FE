import styled from "styled-components";

export const ReviewListView = styled.div`
  position: relative;

  .rl-sub-view {
    height: 100%;
    width: 100%;
    margin: 40px auto 0;
    background: rgba(216,201,201,0.5);

    .rl-sub {
      width: 1160px;
      @media screen and (max-width: 1280px) {
        width: 100%;
      }
      padding: 60px 0 80px;
      margin: 0 auto;
      text-align: center;

      .rl-sub-title {
        margin: 7% auto 0;
        font-size: 48px;
        @media screen and (max-width: 1024px) {
          font-size: 32px;
        }
      }

      .rl-sub-input {
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
    }
  }
  
  .rl-main-view {
    padding: 40px 0 200px;
    @media screen and (max-width: 1024px) {
      padding: 0 0 100px;
    }
    
    .rl-main {
      width: 1160px;
      margin: 0 auto;
      @media screen and (max-width: 1280px) {
        box-sizing: border-box;
        width: 100%;
        padding: 30px;
      }
      
      .rl-main-head {
        box-sizing: border-box;
        position: relative;
        padding: 0 60px;

        .swiper-button-prev{
          position: absolute;
          top: 140px;
          left: 0;
          height: 40px;
          width: 40px;
          color: ${({theme}) => theme.textColor};
        }
        .swiper-button-next{
          position: absolute;
          top: 140px;
          right: 0;
          height: 40px;
          width: 40px;
          color: ${({theme}) => theme.textColor};
        }
        
        .rls-list {
          height: auto;
          padding-bottom: 40px;
          margin-top: 32px;

          .swiper-pagination {

            .swiper-pagination-bullet {
              background-color: ${({theme}) => theme.textColor};
            }
          }
          
          .rls-item {
            box-sizing: border-box;
            position: relative;
            height: 100%;
            width: calc(100% / 4);
            @media screen and (max-width: 1024px) {
              width: calc(100% / 2);
            }
            border-radius: 8px;
            background-color: ${({theme}) => theme.cardBgColor};
            color: ${({theme}) => theme.textColor};
            overflow: hidden;
            cursor: pointer;



            .rls-item-image {
              height: 250px;
              border-radius: 10px;
              overflow: hidden;

              img {
                height: 100%;
                width: 100%;
                border: none;
                border-radius: 10px;
                object-fit: cover;
                vertical-align: top;

                transition: transform .4s ease;
              }

              .rls-image-label {
                position: absolute;
                top: -14px;
                right: -40px;
                height: 48px;
                width: 98px;
                background-color: black;
                color: white;
                z-index: 2;
                transform: rotate(45deg);

                .label-text {
                  position: absolute;
                  bottom: 0;
                  right: 32px;
                  font-size: 15px;
                  font-weight: bold;
                }
              }
            }
            
            .rls-item-info {
              padding: 10px;
              
              .rls-info-head {
                display: flex;
                justify-content: space-between;
                
                .rls-lec-institution {
                  padding: 0 6px;
                  margin: 2px 2px 2px 0;
                  border: 1px solid ${({theme}) => theme.rgbaLight};
                  border-radius: 9px;
                  background: ${({theme}) => theme.boxBgColor};
                  font-size: 11px;
                  line-height: 16px;
                  white-space: nowrap;
                }
                
                .rls-rev-score {
                  font-size: 16px;
                  line-height: 16px;
                  
                }
              }
              
              .rls-info-body {
                
                .rls-rev-title {
                  margin-top: 3px;
                  font-size: 16px;
                  font-weight: bold;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                
                .rls-lec-title {
                  margin-top: 4px;
                  font-size: 13px;
                  line-height: 22px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
              
              .rls-info-foot {
                display: flex;
                margin-top: 10px;
                font-size: 13px;
                line-height: 19px;
                opacity: 0.5;
                
                .rls-rev-name {
                  float: left;
                  position: relative;
                  padding-right: 8px;
                  margin-right: 8px;
                  word-break: break-all;
                  
                  &::after {
                    display: block;
                    content: "";
                    position: absolute;
                    top: 5px;
                    right: 0;
                    height: 10px;
                    width: 1px;
                    background: ${({theme}) => theme.rgbaMedium};
                  }
                }
                
                .rls-rev-date {
                  float: left;
                  position: relative;
                  padding-right: 8px;
                  margin-right: 8px;
                  word-break: break-all;
                }
              }
            }

            &:hover img {
              transform: scale(1.1);
              transition: transform .4s ease;
            }
          }
        }
      }
      
      .rl-main-body {
        
        .rl-list {
          
          .rl-list-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 68px;
            margin-top: 40px;

            .rl-total {
              font-weight: bold;

              span {
                font-weight: normal;
                opacity: 0.7;
              }
            }

            .rl-sort {
              display: flex;
              align-items: center;
              
              .sort-sortType {
                position: relative;
                margin-right: 10px;

                .icon-custom {
                  margin-right: 5px;
                  rotate: 90deg;
                }
                
                button {
                  border: none;
                  background: none;
                  color: ${({theme}) => theme.textColor};
                  font-size: 14px;
                  font-weight: bold;
                  cursor: pointer;
                }

                .sort-box {
                  position: absolute;
                  top: 105%;
                  right: 0;
                  height: 0;
                  width: 85px;
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
                  width: 75px;
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

                .sort-box.show-list {
                  border: 1px solid gray;
                  padding: 5px;
                  height: 130px;
                  width: 85px;
                }

                .sort-list.show-list {
                  border: none;
                  padding: 5px;
                  height: 115px;
                  width: 75px;
                }

                ul.sort-list li.sort-active {
                  opacity: 1;
                  font-weight: bold;
                }
              }
              
              .sort-institution {
                position: relative;
                
                button {
                  border: none;
                  background: none;
                  color: ${({theme}) => theme.textColor};
                  font-size: 14px;
                  font-weight: bold;
                  cursor: pointer;
                }

                .sort-box {
                  position: absolute;
                  top: 105%;
                  right: 0;
                  height: 0;
                  width: 130px;
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
                  width: 120px;
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
                  height: 130px;
                  width: 130px;
                }

                .sort-list.show-list {
                  border: none;
                  padding: 5px;
                  height: 115px;
                  width: 120px;
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
          }
          
          .rl-list-body {
            
            .rl-list-item {
              position: relative;
              display: flex;
              align-items: center;
              width: 100%;
              padding: 20px 0 32px 0;
              border-bottom: 1px solid ${({theme}) => theme.rgbaLight};
              transition: border .3s ease;
              cursor: pointer;
              @media screen and (max-width: 1024px) {
                padding: 16px 0;
              }

              &:hover {
                border-bottom: 1px solid ${({theme}) => theme.rgbaMedium};
              }
              
              .rl-item-image {
                position: relative;
                height: 100px;
                width: 100px;
                border-radius: 0 4px 0 0;
                overflow: hidden;
                @media screen and (max-width: 1024px) {
                  height: 150px;
                  width: 150px;
                }
                
                img {
                  height: 100%;
                  width: auto;
                  border-radius: 4px;
                }
              }
              
              .rl-item-info {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: calc(100% - 110px);
                margin-left: 20px;
                @media screen and (max-width: 1024px) {
                  display: block;
                }
                
                .rl-item-left {
                  width: 75%;
                  @media screen and (max-width: 1024px) {
                    width: 100%;
                  }

                  .rl-lec-institution {
                    width: fit-content;
                    padding: 0 6px;
                    margin-bottom: 8px;
                    border: 1px solid ${({theme}) => theme.rgbaLight};
                    border-radius: 9px;
                    background: ${({theme}) => theme.boxBgColor};
                    font-size: 11px;
                    line-height: 16px;
                    white-space: nowrap;
                  }

                  .rl-rev-title {
                    font-size: 20px;
                    font-weight: bold;
                    line-height: 26px;
                    letter-spacing: -.4px;
                  }

                  .rl-lec-title {
                    margin-top: 10px;
                    font-size: 16px;
                    line-height: 26px;
                    letter-spacing: -.4px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                }
                
                .rl-item-right {
                  width: 25%;
                  @media screen and (max-width: 1024px) {
                    width: 100%;
                    margin-top: 10px;
                  }

                  .rl-rev-score {
                    display: flex;
                    justify-content: flex-end;
                    visibility: visible;
                    padding-right: 8px;
                    margin-right: 8px;
                    @media screen and (max-width: 1024px) {
                      justify-content: flex-start;
                    }
                  }

                  .rl-sub-info {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 8px;
                    font-size: 13px;
                    line-height: 19px;
                    opacity: 0.5;
                    @media screen and (max-width: 1024px) {
                      justify-content: flex-start;
                      margin-top: 4px;
                    }

                    .rl-rev-name {
                      position: relative;
                      padding-right: 8px;
                      margin-right: 8px;
                      word-break: break-all;

                      &::after {
                        display: block;
                        content: "";
                        position: absolute;
                        top: 5px;
                        right: 0;
                        height: 12px;
                        width: 1px;
                        background: ${({theme}) => theme.rgbaMedium};
                      }
                    }

                    .rl-rev-date {
                      position: relative;
                      padding-right: 8px;
                      margin-right: 8px;
                      word-break: break-all;
                    }
                  }
                }
              }
              
            }
          }
          
          .rl-list-empty {
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
          
          .rl-more-btn {
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
  }

`;