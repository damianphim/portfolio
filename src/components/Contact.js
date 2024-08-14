// src/components/Contact.js
import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  padding: 50px 20px;
  background-color: transparent;
  text-align: center;
  pointer-events: auto;
`;

const ContactTitle = styled.h2`
  margin-top: 0;
`;

const ContactLink = styled.a`
  display: block;
  margin: 10px 0;
  color: ${(props) => props.theme.linkColor};
  text-decoration: none;
  font-size: 1.2em;
  &:hover {
    text-decoration: underline;
  }
`;

const Contact = () => {
  return (
    <ContactContainer>
      <ContactTitle>Contact Me</ContactTitle>
      <p>You can find me on LinkedIn:</p>
      <ContactLink href="https://www.linkedin.com/in/damian-phimister-414106302/" target="_blank" rel="noopener noreferrer">
        LinkedIn Profile
      </ContactLink>
      <p>Or you can reach out via email:</p>
      <ContactLink href="mailto:dphimister24@gmail.com">dphimister24@gmail.com</ContactLink>
    </ContactContainer>
  );
};

export default Contact;
