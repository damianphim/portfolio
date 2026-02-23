// Skills section

import React from 'react';
import styled from 'styled-components';
import { FaReact, FaNodeJs, FaJava, FaDocker, FaGitAlt } from 'react-icons/fa';
import { IoLogoJavascript, IoLogoPython } from 'react-icons/io';
import { DiCss3, DiGithubBadge } from 'react-icons/di';
import { SiCplusplus, SiTypescript, SiPostgresql, SiSupabase, SiVercel, SiFastapi } from 'react-icons/si';
import { MdApi } from 'react-icons/md';

const SkillsContainer = styled.div`
  padding: 50px 20px;
  background-color: transparent;
`;

const CategoryTitle = styled.h2`
  margin: 30px 0 15px;
  font-size: 1.2em;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  pointer-events: auto;
`;

const SkillItem = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  padding: 16px 10px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 6px ${(props) => props.theme.boxShadowColor};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px ${(props) => props.theme.boxShadowColor};
  }
`;

const SkillIcon = styled.div`
  font-size: 2em;
  margin-bottom: 8px;
`;

const SkillName = styled.h3`
  margin: 0;
  font-size: 0.9em;
  color: ${(props) => props.theme.color};
`;

// For skills without a dedicated icon, render a text badge
const TextBadge = styled.div`
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 8px;
`;

const skillCategories = [
  {
    label: 'Languages',
    skills: [
      { name: 'JavaScript', icon: <IoLogoJavascript /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Python', icon: <IoLogoPython /> },
      { name: 'C++', icon: <SiCplusplus /> },
      { name: 'Java', icon: <FaJava /> },
      { name: 'SQL', icon: <TextBadge>SQL</TextBadge> },
      { name: 'C', icon: <TextBadge>C</TextBadge> },
    ],
  },
  {
    label: 'Frameworks & Libraries',
    skills: [
      { name: 'React', icon: <FaReact /> },
      { name: 'Node.js', icon: <FaNodeJs /> },
      { name: 'FastAPI', icon: <SiFastapi /> },
      { name: 'CSS', icon: <DiCss3 /> },
      { name: 'Pandas', icon: <TextBadge>pd</TextBadge> },
      { name: 'NumPy', icon: <TextBadge>np</TextBadge> },
    ],
  },
  {
    label: 'Developer Tools',
    skills: [
      { name: 'Git', icon: <FaGitAlt /> },
      { name: 'GitHub', icon: <DiGithubBadge /> },
      { name: 'Docker', icon: <FaDocker /> },
      { name: 'Vercel', icon: <SiVercel /> },
      { name: 'CI/CD', icon: <TextBadge>CI/CD</TextBadge> },
      { name: 'Linux', icon: <TextBadge>🐧</TextBadge> },
    ],
  },
  {
    label: 'Databases & APIs',
    skills: [
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'Supabase', icon: <SiSupabase /> },
      { name: 'Anthropic API', icon: <MdApi /> },
      { name: 'OpenAI API', icon: <MdApi /> },
      { name: 'Gemini API', icon: <MdApi /> },
      { name: 'REST APIs', icon: <MdApi /> },
    ],
  },
];

const Skills = () => {
  return (
    <SkillsContainer>
      <h1>Skills</h1>
      {skillCategories.map((category) => (
        <div key={category.label}>
          <CategoryTitle>{category.label}</CategoryTitle>
          <SkillsGrid>
            {category.skills.map((skill) => (
              <SkillItem key={skill.name}>
                <SkillIcon>{skill.icon}</SkillIcon>
                <SkillName>{skill.name}</SkillName>
              </SkillItem>
            ))}
          </SkillsGrid>
        </div>
      ))}
    </SkillsContainer>
  );
};

export default Skills;