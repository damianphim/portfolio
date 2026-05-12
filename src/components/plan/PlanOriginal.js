import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;

const Wrap = styled.div`animation: ${fadeIn} 0.25s ease;`;

const SectionLabel = styled.div`
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.4;
  font-family: 'Courier New', monospace;
  margin: 28px 0 10px;
  &:first-child { margin-top: 0; }
`;

const Block = styled.div`
  font-size: 0.88rem;
  line-height: 1.7;
  opacity: 0.75;
  padding: 14px 18px;
  background: rgba(255,255,255,0.03);
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.06);
  margin-bottom: 10px;
`;

const Phase = styled.div`
  border-left: 2px solid rgba(255,255,255,0.12);
  padding: 12px 18px;
  margin-bottom: 10px;
  font-size: 0.88rem;
  line-height: 1.65;
  opacity: 0.75;
`;

const PhaseTitle = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  opacity: 0.6;
  margin-bottom: 6px;
`;

const AccordionHead = styled.button`
  width: 100%;
  text-align: left;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  color: inherit;
  padding: 12px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.88rem;
  font-family: 'Georgia', serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  opacity: 0.8;
  &:hover { background: rgba(255,255,255,0.07); }
`;

const AccordionBody = styled.div`
  display: ${p => p.$open ? 'block' : 'none'};
  padding: 4px 0 12px;
`;

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AccordionHead onClick={() => setOpen(o => !o)}>
        {title}
        <span style={{ fontFamily: 'Courier New', fontSize: '0.7rem', opacity: 0.5 }}>{open ? '▲' : '▼'}</span>
      </AccordionHead>
      <AccordionBody $open={open}>{children}</AccordionBody>
    </>
  );
}

export default function PlanOriginal() {
  return (
    <Wrap>
      <SectionLabel>Research Project — Track A</SectionLabel>
      <Block>
        <strong>Topic:</strong> Bias in student evaluations of teaching (SET) — specifically whether LLM-powered academic tools (like RateMyProfessor summaries) amplify gender/racial bias present in the underlying rating data.<br/><br/>
        <strong>Goal:</strong> 1,500–2,500 word literature summary posted publicly as Blog Post #2 by end of Week 3 (early June). Eventually: a paper publishable under your name.
      </Block>

      <SectionLabel>Phase Structure</SectionLabel>
      <Phase>
        <PhaseTitle>PHASE A · Weeks 1–3 · Literature Review</PhaseTitle>
        Key sources: Boring, Ottoboni & Stark (2016) · Centra & Gaubatz · Felton, Mitchell & Stinson · FAccT papers on LLM bias amplification · "Stochastic parrots" lineage<br/>
        Output: Blog Post #2
      </Phase>
      <Phase>
        <PhaseTitle>PHASE B · Weeks 4–8 · Data Collection</PhaseTitle>
        Scrape or obtain RateMyProfessor data · Design study methodology · IRB considerations if human subjects involved
      </Phase>
      <Phase>
        <PhaseTitle>PHASE C · Weeks 9–12 · Analysis</PhaseTitle>
        Run bias analysis · LLM summarization tests · Draft findings
      </Phase>
      <Phase>
        <PhaseTitle>PHASE D · Weeks 13–14 · Write-up</PhaseTitle>
        Full paper draft · Peer review ask · Submission target TBD
      </Phase>

      <SectionLabel>Track B — Symbolos</SectionLabel>
      <Block>
        6–10 hours/week of continued co-building. Bug fixes, small feature improvements, eventually implementing warnings based on research findings from Track A. Do not let Track A crowd this out.
      </Block>

      <SectionLabel>Track C — Reading & Writing</SectionLabel>
      <Block>
        <strong>Tier 1 Books:</strong><br/>
        • Cyd Harrell — Civic Technologist's Practice Guide (→ Blog Post #1)<br/>
        • Bracy — [digital rights/privacy)<br/>
        • McGuinness & Schank<br/>
        • Schaake — The Tech Coup<br/><br/>
        <strong>Blog Posts:</strong> 5 total across the summer. Post #1 on Harrell. Post #2 is the lit review.
      </Block>

      <SectionLabel>Relationship Map</SectionLabel>
      <Block>
        Key people to build relationships with naturally (do not cold-extract value):<br/><br/>
        • <strong>Ethan Zuckerman</strong> — Walk into PUBPOL 208 having read his AIxDemocracy post and 3–4 blog pieces. Let the relationship develop through the class.<br/>
        • Carolina Rossini, Emily Nutwell, Charlie Schweik, Casey Maloney — PIT-adjacent faculty. Same approach: do the work first.<br/><br/>
        Two faculty for strong letters by senior year. Letters &gt; another SPP course.
      </Block>

      <SectionLabel>Key References</SectionLabel>
      <Accordion title="Boring, Ottoboni & Stark (2016)">
        <Block>"Student Evaluations of Teaching (Mostly) Do Not Measure Teaching Effectiveness" — main claim, method, and entry point for the whole lit review. Find via Google Scholar.</Block>
      </Accordion>
      <Accordion title="Niching-Down Reading Sampler">
        <Block>
          One piece from each: AI governance (Toner/GovAI) · Algorithmic accountability (Eubanks, O'Neil) · Digital privacy (EFF/Schneier) · Platform power (Lina Khan) · Content moderation (Evelyn Douek) · Election security (DiResta) · Broadband/digital divide · Civic tech (Jen Pahlka — Recoding America) · Algorithmic harm (Ruha Benjamin) · Tech worker/gig work (Veena Dubal).<br/><br/>
          Take one note per piece: did this make me want to read more?
        </Block>
      </Accordion>
      <Accordion title="SPP 208 Prep Reading">
        <Block>
          Priority order:<br/>
          1. Habermas — public sphere Wikipedia entry + Ch.1 of Structural Transformation<br/>
          2. Zuckerman's blog — ethanzuckerman.com (AIxDemocracy post is key)<br/>
          3. Schneier — Rewiring Democracy (already on Tier 1 list)<br/>
          4. Eli Pariser — The Filter Bubble<br/>
          5. Cass Sunstein — #Republic or Republic.com (intro)<br/>
          6. Robert Darnton — "An Early Information Society" (AHR 2000, free online)
        </Block>
      </Accordion>

      <SectionLabel>If Things Go Sideways</SectionLabel>
      <Block>
        If Benoit doesn't respond AND Quirk doesn't respond: pivot to county IT as Plan C in late June.<br/>
        If lit review stalls: narrow scope to just RMP data + one LLM bias paper. Ship something smaller.<br/>
        If summer feels unstructured: the Sunday check-in ritual is the recovery mechanism. Open the plan, write three sentences in the log, reset the week.
      </Block>
    </Wrap>
  );
}
