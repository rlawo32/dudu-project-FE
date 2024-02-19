import styled from "styled-components";

const ErrorStyle = styled.div`
  display: table-cell;
  vertical-align: middle;

  h1 {
    font-size: 50px;
    display: inline-block;
    padding-right: 12px;
    animation: type .5s alternate infinite;
  }

  @keyframes type {
    from {
      box-shadow: inset -3px 0px 0px #888;
    }
    to {
      box-shadow: inset -3px 0px 0px transparent;
    }
  }
`;

const Error = () => {

    return (
        <ErrorStyle>
            <h1>Error 404</h1>
        </ErrorStyle>
    )
}

export default Error;