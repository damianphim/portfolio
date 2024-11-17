// Footer component that is stickied to the bottom of the page

import React from 'react';
import styled from 'styled-components';
import { FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { DiGithubBadge } from 'react-icons/di';

// Styled component for the footer container
const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.background || '#f0f0f0'};
  color: ${(props) => props.theme.color || '#333'};
  padding: 10px 20px;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 -2px 4px ${(props) => props.theme.boxShadowColor || 'rgba(0, 0, 0, 0.1)'};
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Styled component for individual conact items
const ContactItem = styled.div`
  margin: 0 15px;

  a {
    color: ${(props) => props.theme.linkColor || '#0073b1'};
    display: flex;
    align-items: center;
    text-decoration: none;

    &:hover {
      color: ${(props) => props.theme.linkHoverColor || '#005582'};
    }

    svg {
      font-size: 36px;
    }
  }
`;

// React component for the Footer
const Footer = () => {
  return (
    <FooterContainer>
      <ContactItem>
        <a href="mailto:dphimister24@gmail.com"> {/* Wrapped icons inside of <a> tags to make the icons clickable */}
          <MdEmail />
        </a>
      </ContactItem>
      <ContactItem>
        <a href="https://github.com/damianphim" target="_blank" rel="noopener noreferrer">
          <DiGithubBadge />
        </a>
      </ContactItem>
      <ContactItem>
        <a href="https://www.linkedin.com/in/damian-phimister-414106302/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
      </ContactItem>
    </FooterContainer>
  );
};

export default Footer;
