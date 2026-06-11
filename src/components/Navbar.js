// Header/Navbar at top of page

import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ThemeContext } from './ThemeProvider';

// Styled component for the navbar container
const NavbarContainer = styled.nav`
  background-color: ${(props) => props.theme.navbarBg};
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Styled component for navigation links
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

const NavLink = styled(Link)`
  margin: 0 15px;
  color: ${(props) => props.theme.color};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  pointer-events: auto;
`;

// Styled component for the theme toggle button
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
  const { toggleTheme, isDarkMode } = useContext(ThemeContext); // Access theme toggle function and mode
  const navigate = useNavigate();
  const location = useLocation();

  // On the homepage: smooth-scroll to the section.
  // On any other page: navigate home with the hash; Home scrolls on mount.
  const goToSection = (e, id) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <NavbarContainer>
      <NavLinks>
        <a href="/#home" onClick={(e) => goToSection(e, 'home')}>Home</a>
        <a href="/#projects" onClick={(e) => goToSection(e, 'projects')}>Projects</a>
        <a href="/#skills" onClick={(e) => goToSection(e, 'skills')}>Skills</a>
        <NavLink to="/writing">Writing</NavLink>
      </NavLinks>
      <ToggleButton onClick={toggleTheme}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </ToggleButton>
    </NavbarContainer>
  );
};

export default Navbar;
