// src/components/Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  padding: 10px 20px;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 -2px 4px ${(props) => props.theme.boxShadowColor};
  display: flex;
  justify-content: center; /* Center the content horizontally */
  align-items: center;
  font-size: 0.9em;
`;

const ContactItem = styled.div`
  margin: 0 15px; /* Reduce the space between items */
  a {
    color: ${(props) => props.theme.linkColor};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <ContactItem>
        <p>Email: <a href="mailto:dphimister24@gmail.com">dphimister24@gmail.com</a></p>
      </ContactItem>
      <ContactItem>
        <p>Phone: +1 617-999-6362</p>
      </ContactItem>
      <ContactItem>
        <p>
          LinkedIn: <a href="https://www.linkedin.com/in/damian-phimister-414106302/" target="_blank" rel="noopener noreferrer">Damian Phimister</a>
        </p>
      </ContactItem>
    </FooterContainer>
  );
};

export default Footer;
