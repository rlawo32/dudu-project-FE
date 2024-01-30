import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpLong as topIcon} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const TopButtonNavigationView = styled.div`
  position: sticky;
  bottom: 50px;
  left: 90%;
  height: 50px;
  width: 50px;
  margin-bottom: 5%;
  border: 1px solid ${({theme}) => theme.boxBgColor};
  border-radius: 50%;
  background-color: ${({theme}) => theme.boxBgColor};
  color: ${({theme}) => theme.textColor};;
  text-align: center;
  z-index: 99;
  cursor: pointer;

  .icon-custom {
    position: relative;
    top: 12px;
    font-size: 25px;
  }
`;

const TopButtonNavigation = () => {

    return (
        <TopButtonNavigationView onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <FontAwesomeIcon icon={topIcon} className="icon-custom" />
        </TopButtonNavigationView>
    )
}

export default TopButtonNavigation