// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    font-family: 'Arial', sans-serif;
    pointer-events: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
    margin: 0.5em 0;
    pointer-events: auto;
  }

  p {
    line-height: 1.6;
    margin: 1em 0;
  }

  /* src/styles/global.css or add to GlobalStyles.js */
  html {
    scroll-behavior: smooth;
    height: 100%;
    pointer-events: none;
  }


  a {
    color: ${(props) => props.theme.linkColor};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
    pointer-events: auto;
  }

  .button {
    pointer-events: auto
    padding: 10px 20px;
    background-color: ${(props) => props.theme.buttonBg};
    color: ${(props) => props.theme.buttonColor};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      background-color: ${(props) => props.theme.buttonHoverBg};
    }
    #root {
      display: flex;
      flex-direction: column;
      min-height: 100%;
    }
  }
`;
