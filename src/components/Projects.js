// Project section

import React from 'react';
import styled from 'styled-components';

// Container for the projects section, using a responsive grid layout
const ProjectsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 50px 20px;
  background-color: transparent;
`;

// Styled component for individual project cards
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

// Styled title for the project card
const ProjectTitle = styled.h2`
  margin-top: 0;
`;

// Styled description for the project card
const ProjectDescription = styled.p`
  font-size: 1em;
  line-height: 1.4;
`;

// Tech tags for showing stack used
const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
`;

const Tag = styled.span`
  background-color: ${(props) => props.theme.boxShadowColor};
  color: ${(props) => props.theme.color};
  padding: 3px 9px;
  border-radius: 20px;
  font-size: 0.75em;
  border: 1px solid ${(props) => props.theme.color};
  opacity: 0.8;
`;

// Styled link for viewing the project
const ProjectLink = styled.a`
  pointer-events: auto;
  display: inline-block;
  margin-top: 10px;
  margin-right: 12px;
  color: ${(props) => props.theme.linkColor};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const SectionTitle = styled.h1`
  text-align: center;
  margin-bottom: 10px;
`;

const projects = [
  {
    title: 'AI Benchmarking Suite',
    description:
      'Production-ready benchmarking suite for comparing LLM performance across Anthropic Claude, Google Gemini, and Perplexity. Features real-time streaming metrics, cost tracking, RAG testing pipelines, citation quality analysis, and extended-thinking benchmarks.',
    liveLink: 'https://ai-benchmarks-eight.vercel.app',
    tags: ['React', 'Anthropic API', 'Gemini API', 'Perplexity', 'TypeScript'],
  },
  {
    title: 'Symbolos',
    description:
      'Full-stack AI-powered academic planning tool with course search, scraped RateMyProfessor ratings, a proactive, conversational AI advisor, degree progress tracker, and statistical grade prediction.',
    liveLink: 'https://ai-advisor-pi.vercel.app',
    tags: ['React', 'FastAPI', 'PostgreSQL', 'Anthropic API', 'Pandas', 'Vercel'],
  },
  {
    title: 'Inclusify',
    description:
      'Full-stack browser extension that identifies and analyzes linguistic bias in academic documents, suggesting inclusive alternatives.',
    githubLink: 'https://github.com/damianphim/bias-mirror',
    tags: ['OpenAI API', 'Supabase', 'JavaScript'],
  },
  {
    title: 'AccessPilot',
    description:
      'VS Code extension that promotes inclusive web design by auditing code against WCAG guidelines using axe-core and leveraging the OpenAI API to propose human-centered code improvements in a React-based WebView UI.',
    githubLink: 'https://github.com/damianphim/accesspilot',
    tags: ['VS Code API', 'React', 'OpenAI API', 'esbuild'],
  },
];

const Projects = () => {
  return (
    <div>
      <SectionTitle>Projects</SectionTitle>
    <ProjectsContainer>
      {projects.map((project, index) => (
        <ProjectCard key={index}>
          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectDescription>{project.description}</ProjectDescription>
          <TagsContainer>
            {project.tags.map((tag, i) => (
              <Tag key={i}>{tag}</Tag>
            ))}
          </TagsContainer>
          {project.liveLink && (
            <ProjectLink href={project.liveLink} target="_blank" rel="noopener noreferrer">
              Live Demo ↗
            </ProjectLink>
          )}
          {project.githubLink && (
            <ProjectLink href={project.githubLink} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </ProjectLink>
          )}
        </ProjectCard>
      ))}
    </ProjectsContainer>
    </div>
  );
};

export default Projects;