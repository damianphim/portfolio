import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { essays } from './essays';

const fadeIn = keyframes`from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); }`;

const Wrap = styled.div`
  min-height: 100vh;
  padding: 40px 24px 120px;
  max-width: 860px;
  margin: 0 auto;
  animation: ${fadeIn} 0.4s ease;
  font-family: 'Georgia', 'Times New Roman', serif;
`;

const PageTitle = styled.h1`
  font-size: 1.1rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.45;
  font-weight: 400;
  margin: 0 0 8px;
  font-family: 'Courier New', monospace;
`;

const Subtitle = styled.div`
  font-size: 0.85rem;
  opacity: 0.5;
  margin-bottom: 40px;
  font-family: 'Courier New', monospace;
`;

const EssayList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EssayCard = styled(Link)`
  display: block;
  padding: 24px 24px;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  background: ${(props) => props.theme.background};
  box-shadow: 0 0 30px ${(props) => props.theme.boxShadowColor};
  transition: box-shadow 0.15s, transform 0.15s;
  &:hover {
    box-shadow: 0 0 40px ${(props) => props.theme.boxShadowColor};
    transform: translateY(-2px);
  }
`;

const EssayTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 6px;
`;

const EssayMeta = styled.div`
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.4;
  font-family: 'Courier New', monospace;
  margin-bottom: 8px;
`;

const EssayDescription = styled.div`
  font-size: 0.92rem;
  line-height: 1.6;
  opacity: 0.7;
`;

export default function Writing() {
  return (
    <Wrap>
      <PageTitle>Writing</PageTitle>
      <Subtitle>Essays and notes</Subtitle>
      <EssayList>
        {essays.map(essay => (
          <EssayCard key={essay.slug} to={`/writing/${essay.slug}`}>
            <EssayTitle>{essay.title}</EssayTitle>
            <EssayMeta>{essay.date}</EssayMeta>
            <EssayDescription>{essay.description}</EssayDescription>
          </EssayCard>
        ))}
      </EssayList>
    </Wrap>
  );
}
