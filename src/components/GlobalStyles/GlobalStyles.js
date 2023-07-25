'use client';
import { createGlobalStyle } from "styled-components";

function GlobalStyles() {
  return <GlobalStyle />;
}

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  details {
    width: 600px;
  }

  h3 {
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
  }

`


export default GlobalStyles;
