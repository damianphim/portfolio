// src/components/Navbar.js
import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from './ThemeProvider';

const NavbarContainer = styled.nav`
  background-color: ${(props) => props.theme.navbarBg};
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  a {
    margin: 0 15px;
    color: ${(props) => props.theme.color};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
    pointer-events: auto;
  }
`;

const ToggleButton = styled.button`
  pointer-events: auto;
  padding: 10px;
  background-color: ${(props) => props.theme.buttonBg};
  color: ${(props) => props.theme.buttonColor};
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBg};
  }
`;

const Navbar = () => {
  const { toggleTheme, isDarkMode } = useContext(ThemeContext);

  return (
    <NavbarContainer>
      <NavLinks>
        <a href="#home">Home</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </NavLinks>
      <ToggleButton onClick={toggleTheme}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </ToggleButton>
    </NavbarContainer>
  );
};

export default Navbar;
