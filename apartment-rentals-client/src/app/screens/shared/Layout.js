import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

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
`

export const AppLayout = ({ children }) => (
  <React.Fragment>
    <GlobalStyle />
    {children}
  </React.Fragment>
)

export const MainViewLayout = styled.div`
  width: 100%;
  height: 100%;
`
