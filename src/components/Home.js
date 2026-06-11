// Home page

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Projects from './Projects';
import Skills from './Skills';
import VolunteerProjects from './VolunteerProjects';

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
  const location = useLocation();

  // When arriving from another page with a hash (e.g. /#projects),
  // scroll to that section once the page has rendered.
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash]);

  return (
    <>
      <HomeContainer id="home">
        <Section>
          <HomeTitle>Damian Phimister</HomeTitle>
          <HomeDescription>An Aspiring Computer Scientist</HomeDescription>
        </Section>
        <Section id="projects">
          <Projects />
        </Section>
        <Section id="volunteer">
          <VolunteerProjects />
        </Section>
        <Section id="skills">
          <Skills />
        </Section>
      </HomeContainer>
    </>
  );
};

export default Home;
