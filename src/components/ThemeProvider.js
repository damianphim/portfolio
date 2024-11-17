// Handles dark and light mode

import React, { useState, createContext } from 'react';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';

// Light theme configuration
const lightTheme = {
  background: '#fff',
  color: '#000',
  boxShadowColor: 'rgba(0, 0, 0, 0.1)'
};

// Dark theme configuration
const darkTheme = {
  background: '#000',
  color: '#fff',
  boxShadowColor: 'rgba(255, 255, 255, 0.2)'
};

// Context to share theme-related functionality across the webpage
export const ThemeContext = createContext();

// ThemeProvider component to manage and apply themes
const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    // Providing theme context to the rest of the webpage
    <ThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
      {/* Applying the selected theme using styled-components' ThemeProvider */}
      <StyledThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <Wrapper>{children}</Wrapper> {/* Wrapper applies the theme styles */}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Styled component that acts as the main container with theme styles
const Wrapper = styled.div`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  min-height: 100vh;
`;

export default ThemeProvider;
