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
      {/* Add more project cards as needed */}
    </ProjectsContainer>
  );
};

export default Projects;
