// src/components/ThemeProvider.js
import React, { useState, createContext } from 'react';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';

const lightTheme = {
  background: '#fff',
  color: '#000',
  boxShadowColor: 'rgba(0, 0, 0, 0.1)'
};

const darkTheme = {
  background: '#000',
  color: '#fff',
  boxShadowColor: 'rgba(255, 255, 255, 0.2)'
};

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
      <StyledThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <Wrapper>{children}</Wrapper>
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

const Wrapper = styled.div`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  min-height: 100vh;
`;

export default ThemeProvider;
