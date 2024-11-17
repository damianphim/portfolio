// Skills section

import React from 'react';
import styled from 'styled-components';
import { FaReact } from 'react-icons/fa';
import { FaNodeJs } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { IoLogoPython } from "react-icons/io";
import { DiCss3 } from "react-icons/di";
import { SiCplusplus } from "react-icons/si";
import { FaJava } from "react-icons/fa6";

// Styled container for the skills section
const SkillsContainer = styled.div`
  padding: 50px 20px;
  background-color: transparent;
`;

// Grid layout for arranging skill items
const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  pointer-events: auto;
`;

// Individual skill item card
const SkillItem = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 6px ${(props) => props.theme.boxShadowColor};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px ${(props) => props.theme.boxShadowColor};
  }
`;

// Icon styling for skills
const SkillIcon = styled.div`
  font-size: 2em;
  margin-bottom: 10px;
`;

// Skill name styling
const SkillName = styled.h3`
  margin: 0;
  font-size: 1.2em;
  color: ${(props) => props.theme.color};
`;

const Skills = () => {
  return (
    <SkillsContainer>
      <h1>Skills</h1>
      <SkillsGrid>
        <SkillItem>
          <SkillIcon><IoLogoJavascript /></SkillIcon>
          <SkillName>JavaScript</SkillName>
        </SkillItem>
        <SkillItem>
          <SkillIcon><FaReact /></SkillIcon>
          <SkillName>React</SkillName>
        </SkillItem>
        <SkillItem>
          <SkillIcon><FaNodeJs /></SkillIcon>
          <SkillName>Node.js</SkillName>
        </SkillItem>
        <SkillItem>
          <SkillIcon><IoLogoPython /></SkillIcon>
          <SkillName>Python</SkillName>
        </SkillItem>
        <SkillItem>
          <SkillIcon><DiCss3 /></SkillIcon>
          <SkillName>CSS</SkillName>
        </SkillItem>
        <SkillItem>
          <SkillIcon><SiCplusplus /></SkillIcon>
          <SkillName>C++</SkillName>
        </SkillItem>
        <SkillItem>
          <SkillIcon><FaJava /></SkillIcon>
          <SkillName>Java</SkillName>
        </SkillItem>
      </SkillsGrid>
    </SkillsContainer>
  );
};

export default Skills;
