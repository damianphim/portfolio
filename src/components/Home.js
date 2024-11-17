// Home page

import React from 'react';
import styled from 'styled-components';
import BackgroundAnimation from './GalaxyAnimation';
import Projects from './Projects';
import Skills from './Skills';

// Main container for the Home component
const HomeContainer = styled.div`
  text-align: center;
`;

// Section styles for reusable sections
const Section = styled.section`
  padding: 50px 20px;
  min-height: 100vh;
  background-color: transparent;
  color: ${(props) => props.theme.color}; // Color based on theme
`;

// Styled title for homepage
const HomeTitle = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
`;

// Styled text for below title
const HomeDescription = styled.p`
  font-size: 1.2em;
  color: ${(props) => props.theme.textSecondary};
`;

const Home = () => {
  return (
    <>
      <BackgroundAnimation /> {/* Fullscreen background animation */}
      <HomeContainer id="home">
        <Section>
          <HomeTitle>Damian Phimister</HomeTitle>
          <HomeDescription>An Aspiring Computer Scientist</HomeDescription>
        </Section>
        <Section id="projects">
          <Projects />
        </Section>
        <Section id="skills">
          <Skills />
        </Section>
      </HomeContainer>
    </>
  );
};

export default Home;
