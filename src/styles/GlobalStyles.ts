import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle<{$isModal:boolean}>`
    body {
      background: ${({ theme }) => theme.bgColor};
      color: ${({ theme }) => theme.textColor};
      display: block;
      height: 100%;
      width: 100%;

      overflow: ${({$isModal}) => $isModal ? "hidden" : "auto"};
      
      #root {
        div:nth-child(2) > * {
          pointer-events: ${({$isModal}) => $isModal ? "none" : "auto"};
        }

        div:nth-child(2) > .header-navigation {
          opacity: ${({$isModal}) => $isModal ? 0.5 : ""};
        }
        
        div:nth-child(2) > div:nth-child(1) ~ div {
          opacity: ${({$isModal}) => $isModal ? 0.5 : 1};
        }
      }
    }
`;