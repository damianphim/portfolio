// src/components/Projects.js
import React from 'react';
import styled from 'styled-components';

const ProjectsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 50px 20px;
  background-color: transparent;
`;

const ProjectCard = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px ${(props) => props.theme.boxShadowColor};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px ${(props) => props.theme.boxShadowColor};
  pointer-events: auto;
  }
`;

const ProjectTitle = styled.h2`
  margin-top: 0;
`;

const ProjectDescription = styled.p`
  font-size: 1em;
  line-height: 1.4;
`;

const ProjectLink = styled.a`
  pointer-events: auto;
  display: inline-block;
  margin-top: 10px;
  color: ${(props) => props.theme.linkColor};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Projects = () => {
  return (
    <ProjectsContainer>
      <ProjectCard>
        <ProjectTitle>BeADoctor</ProjectTitle>
        <ProjectDescription>Web Development Intern</ProjectDescription>
        <ProjectLink href="https://beadoctor.org" target="_blank" rel="noopener noreferrer">View Project</ProjectLink>
      </ProjectCard>
      <ProjectCard>
        <ProjectTitle>Belmontian Club</ProjectTitle>
        <ProjectDescription>Website for my school club</ProjectDescription>
        <ProjectLink href="https://github.com/damianphim/belmontian-club" target="_blank" rel="noopener noreferrer">View Project</ProjectLink>
      </ProjectCard>
      <ProjectCard>
        <ProjectTitle>GiftSprint</ProjectTitle>
        <ProjectDescription>AI finds you a last minute gift using your prompt, and then recommends the nearest store to buy it.</ProjectDescription>
        <ProjectLink href="https://github.com/damianphim/giftsprint" target="_blank" rel="noopener noreferrer">View Project</ProjectLink>
      </ProjectCard>
      <ProjectCard>
        <ProjectTitle>YouTime</ProjectTitle>
        <ProjectDescription>Gives you daily affirmations and tasks to start your day.</ProjectDescription>
        <ProjectLink href="https://github.com/kimannle/AppleHacks2024" target="_blank" rel="noopener noreferrer">View Project</ProjectLink>
      </ProjectCard>
      <ProjectCard>
        <ProjectTitle>Chore Competitors</ProjectTitle>
        <ProjectDescription>Compete with members of your household to see who can complete the most chores.</ProjectDescription>
        <ProjectLink href="https://github.com/damianphim/ChoreCompetitors" target="_blank" rel="noopener noreferrer">View Project</ProjectLink>
      </ProjectCard>
    </ProjectsContainer>
  );
};

export default Projects;
