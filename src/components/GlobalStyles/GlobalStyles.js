'use client';
import { createGlobalStyle } from "styled-components";
import { QUERIES } from "@/constants";

function GlobalStyles() {
  return <GlobalStyle />;
}

const GlobalStyle = createGlobalStyle`

  html {
    /* text sizes */
    --font-small: 0.8rem;
    --font-normal: 1rem;
    --font-large: 1.4rem;

    /* main colors */
    --color-primary-white: hsl(0deg, 0%, 95%);
    --color-primary-white-hover: hsl(0deg, 0%, 80%);
    --color-gray-80: hsl(0deg, 0%, 80%);
    --color-gray-60: hsl(0deg, 0%, 60%);
    --color-gray-40: hsl(0deg, 0%, 40%);
    --color-gray-20: hsl(0deg, 0%, 20%);

    --color-background: white;
    --color-purple-light: hsl(252deg, 30%, 75%);
    --color-purple-faded: hsl(252deg, 30%, 75%, 0.55);
    --color-header-shadow: hsl(252deg, 30%, 40%, 0.65);
    --color-white-faded: hsl(0deg, 0%, 95%, 0.9);


    /* cmp result colors */
    --color-win: hsl(115deg, 100%, 42%);
    --color-loss: hsl(0deg, 65%, 50%);
    --color-tie: var(--color-gray-80);

    --color-win-hover: hsl(115deg, 100%, 55%);

    /* spacing */
    --header-height: 48px;

    /* main */
    --color-primary: var(--color-purple-light);
    --color-secondary: var(--color-primary-white);

    --color-header: var(--color-purple-light);
    --backdrop: hsl(0deg, 0%, 8%, 0.64);
    --color-island: hsl(277deg, 34%, 87%, 0.64);


    background-color: var(--color-background);
    font-weight: 400;
    font-size: 1rem;
  }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  details > p {
    max-width: 600px;

    @media ${QUERIES.phoneAndSmaller} {
      max-width: min(360px, 95%);
    }
  }

  h3 {
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
  }


`;

export default GlobalStyles;
