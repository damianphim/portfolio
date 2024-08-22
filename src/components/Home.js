// src/components/Home.js
import React from 'react';
import styled from 'styled-components';
import BackgroundAnimation from './GalaxyAnimation';
import Projects from './Projects';
import Skills from './Skills';

const HomeContainer = styled.div`
  text-align: center;
`;

const Section = styled.section`
  padding: 50px 20px;
  min-height: 100vh;
  background-color: transparent;
  color: ${(props) => props.theme.color};
`;

const HomeTitle = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
`;

const HomeDescription = styled.p`
  font-size: 1.2em;
  color: ${(props) => props.theme.textSecondary};
`;

const Home = () => {
  return (
    <>
      <BackgroundAnimation />
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
