import styled from "styled-components";

const LoaderStyle = styled.div`
  width: 150px;
  height: 150px;
  line-height: 150px;
  margin: 100px auto;
  position: relative;
  box-sizing: border-box;
  text-align: center;
  z-index: 0;

  &::before,
  &::after {
    opacity: 0;
    box-sizing: border-box;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 100px;
    border: 5px solid ${({theme}) => theme.textColor};
    box-shadow: 0 0 50px ${({theme}) => theme.textColor}, inset 0 0 50px ${({theme}) => theme.textColor};
  }

  &::after {
    z-index: 1;
    -webkit-animation: loader 2s infinite 1s;
  }

  &::before {
    z-index: 2;
    -webkit-animation: loader 2s infinite;
  }

  @-webkit-keyframes loader {
    0% {
      -webkit-transform: scale(0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1);
      opacity: 0;
    }
  }
`;

const Loader = () => {

    return (
        <LoaderStyle>
            Loading..
        </LoaderStyle>
    )
}

export default Loader;