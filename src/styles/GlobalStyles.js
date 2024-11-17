// Global styles for webpage

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    font-family: 'Arial', sans-serif;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
    margin: 0.5em 0;
  }

  p {
    line-height: 1.6;
    margin: 1em 0;
  }

  html {
    scroll-behavior: smooth;
    height: 100%;
  }

  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
  }

  .button {
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
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background-color: ${(props) => props.theme.navbarBg};
  }

  .navbar a {
    margin-right: 1rem;
    color: ${(props) => props.theme.color};
    text-decoration: none;
  }

  @media (max-width: 768px) {
    .navbar {
      flex-direction: column;
      align-items: center;
    }

    .navbar a {
      margin-bottom: 1rem;
    }
  }
`;
