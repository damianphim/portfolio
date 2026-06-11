import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useParams, Link, Navigate } from 'react-router-dom';
import { essays } from './essays';

const fadeIn = keyframes`from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); }`;

const Wrap = styled.div`
  padding: 48px 40px 64px;
  max-width: 70ch;
  margin: 40px auto 120px;
  animation: ${fadeIn} 0.4s ease;
  font-family: 'Georgia', 'Times New Roman', serif;
  background: ${(props) => props.theme.background};
  border-radius: 12px;
  box-shadow: 0 0 30px ${(props) => props.theme.boxShadowColor};

  @media (max-width: 768px) {
    padding: 32px 20px 48px;
    margin: 16px 12px 80px;
  }
`;

const BackLink = styled(Link)`
  display: inline-block;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.45;
  font-family: 'Courier New', monospace;
  text-decoration: none;
  color: inherit;
  margin-bottom: 32px;
  &:hover { opacity: 0.8; }
`;

const Title = styled.h1`
  font-size: 2rem;
  line-height: 1.25;
  margin: 0 0 12px;
  font-weight: 700;
`;

const Byline = styled.div`
  font-size: 0.85rem;
  opacity: 0.5;
  font-family: 'Courier New', monospace;
  margin-bottom: 40px;
`;

const Paragraph = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  margin: 0 0 1.4em;
`;

const EssayLink = styled.a`
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
  &:hover { opacity: 0.8; }
`;

function renderParagraph(paragraph) {
  if (typeof paragraph === 'string') {
    return paragraph;
  }
  return paragraph.map((segment, i) => {
    if (typeof segment === 'string') {
      return <React.Fragment key={i}>{segment}</React.Fragment>;
    }
    return (
      <EssayLink key={i} href={segment.href} target="_blank" rel="noopener noreferrer">
        {segment.text}
      </EssayLink>
    );
  });
}

export default function Essay() {
  const { slug } = useParams();
  const essay = essays.find(e => e.slug === slug);

  if (!essay) {
    return <Navigate to="/writing" replace />;
  }

  return (
    <Wrap>
      <BackLink to="/writing">&larr; Writing</BackLink>
      <Title>{essay.title}</Title>
      <Byline>Damian Phimister &middot; {essay.date}</Byline>
      {essay.content.map((paragraph, i) => (
        <Paragraph key={i}>{renderParagraph(paragraph)}</Paragraph>
      ))}
    </Wrap>
  );
}
