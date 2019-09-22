import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
    font-family: inherit;
    color: inherit;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    font-family:'Fira Sans', sans-serif !important;
    overflow: hidden;
  }
`;

export const AppLayout = ({ children }) => (
  <React.Fragment>
    <GlobalStyle />
    {children}
  </React.Fragment>
);

export const MainViewLayout = ({ children }) => (
  <div style={{ width: "100%", height: "100%" }}>{children}</div>
);

// const StyledUnauthedLayout = styled.div`
//   height: 100%;
//   display: grid;
//   grid-template-rows: 1fr auto;
//   overflow-y: auto;
// `;

// export const UnauthLayout = ({ children }) => (
//   <StyledUnauthedLayout>
//     <div
//       style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
//     >
//       {children}
//     </div>
//   </StyledUnauthedLayout>
// );
