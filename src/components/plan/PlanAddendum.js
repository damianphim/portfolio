import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;

const Wrap = styled.div`animation: ${fadeIn} 0.25s ease;`;


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

const CalloutBox = styled.div`
  font-size: 0.85rem;
  line-height: 1.65;
  padding: 14px 18px;
  background: rgba(255,220,100,0.05);
  border: 1px solid rgba(255,220,100,0.18);
  border-radius: 6px;
  margin-bottom: 12px;
  color: rgba(255,220,100,0.85);
  font-family: 'Courier New', monospace;
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

const CheckItem = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 10px 14px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 4px;
  background: rgba(255,255,255,${p => p.$done ? '0.02' : '0.04'});
  border: 1px solid rgba(255,255,255,${p => p.$done ? '0.04' : '0.08'});
  &:hover { background: rgba(255,255,255,0.07); }
`;

const Box = styled.div`
  width: 16px;
  height: 16px;
  border: 1.5px solid ${p => p.$done ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.45)'};
  border-radius: 3px;
  flex-shrink: 0;
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${p => p.$done ? 'rgba(255,255,255,0.1)' : 'transparent'};
`;

const CheckText = styled.div`
  font-size: 0.88rem;
  line-height: 1.4;
  opacity: ${p => p.$done ? 0.35 : 0.8};
  text-decoration: ${p => p.$done ? 'line-through' : 'none'};
  text-decoration-color: rgba(255,255,255,0.2);
`;

const CheckNote = styled.div`
  font-size: 0.72rem;
  opacity: 0.4;
  margin-top: 2px;
  font-family: 'Courier New', monospace;
`;

function Accordion({ title, children, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
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

function Check({ done }) {
  return (
    <Box $done={done}>
      {done && <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path d="M1 3.5L3.5 6.5L9 1" stroke="rgba(255,255,255,0.65)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>}
    </Box>
  );
}

export default function PlanAddendum({ state, toggleCheck }) {
  const phoneItems = [
    { key: 'phone_friction_setup', label: 'Social/entertainment apps off home screen', note: 'Move to folder on last page' },
  ];

  const spp208Items = [
    { key: 'habermas_wiki', label: 'Habermas public sphere (Wikipedia + Ch.1)', note: '~2 hours. Master concept of the whole course.' },
    { key: 'zuckerman_aixdemo', label: 'Zuckerman AIxDemocracy post', note: 'ethanzuckerman.com — ~25 min. Read 3–4 other blog posts too.' },
    { key: 'boring_ottoboni', label: 'Boring/Ottoboni/Stark 2016', note: 'Not SPP 208 specifically, but Track A and your policy analysis overlap here.' },
  ];

  return (
    <Wrap>
      <CalloutBox>
        ↑ This addendum supplements the Original Plan. It is not a replacement. The original's Phase structure is canonical. This document handles execution infrastructure.
      </CalloutBox>

      <Accordion title="Morning Block Protocol" defaultOpen>
        <Block>
          <strong>The rule:</strong> Research work (Track A) happens between 9am–noon, every weekday. Phone is in a different room. No email, no Symbolos, no social until noon.<br/><br/>
          <strong>The recovery rule:</strong> If I miss a morning, don't try to make it up in the afternoon. Just start fresh the next morning. Guilt about missed sessions is more damaging than the missed session.
        </Block>
      </Accordion>

      <Accordion title="Phone Friction System">
        <Block>
          This is an environment problem, not a willpower problem. Make the phone physically annoying to use during work hours.<br/><br/>
          <strong>Setup list:</strong><br/>
          1. Move social/entertainment apps off home screen → folder on last page<br/>
          2. Set Screen Time limits with a passcode someone else knows<br/>
          3. Phone charges overnight in a different room (kills the morning scroll)<br/>
          4. During morning block: phone goes to another room, not your desk drawer<br/><br/>
          <strong>Optional (recommended):</strong> 30-day phone fast. Delete every non-essential app. Only re-add after 30 days, and only ones you actively miss.
        </Block>
        {phoneItems.map(item => (
          <CheckItem key={item.key} $done={state.checklist[item.key]} onClick={() => toggleCheck('checklist', item.key)}>
            <Check done={state.checklist[item.key]} />
            <div>
              <CheckText $done={state.checklist[item.key]}>{item.label}</CheckText>
              {item.note && <CheckNote>{item.note}</CheckNote>}
            </div>
          </CheckItem>
        ))}
      </Accordion>

      <Accordion title="Sunday Check-In Ritual (30 min)">
        <Block>
          Open this page. Every Sunday by 7pm.<br/><br/>
          1. <strong>Phase check (5 min)</strong> — look at Original Plan phases. Where are you? Is Phase A done? Are you behind?<br/>
          2. <strong>Dashboard sweep (10 min)</strong> — tick off anything completed this week. Update Barnstable tracker.<br/>
          3. <strong>Log entry (5 min)</strong> — write the week in one sentence in the Log tab.<br/>
          4. <strong>Next week's one thing (5 min)</strong> — what is the single most important thing to do before next Sunday?<br/>
          5. <strong>Reset (5 min)</strong> — close the laptop. The plan is alive.
        </Block>
      </Accordion>

      <Accordion title="Niching-Down Reading Sampler">
        <Block>
          Breadth first, then depth. Read one piece (not one book — one article or essay) from each niche below. Set a 45-minute timer. Take a single note: did this make me want to read more?<br/><br/>
          <strong>The list:</strong><br/>
          • <strong>AI governance</strong> — Helen Toner's AI Policy Primer or anything from Lawfare's AI section<br/>
          • <strong>Algorithmic accountability (public sector)</strong> — Virginia Eubanks intro to Automating Inequality, or Cathy O'Neil Ch.1<br/>
          • <strong>Digital privacy / surveillance</strong> — EFF Deeplinks blog or Schneier's blog<br/>
          • <strong>Platform power / antitrust</strong> — Lina Khan's "Amazon's Antitrust Paradox" (Yale Law Journal note)<br/>
          • <strong>Content moderation / online speech</strong> — Daphne Keller at Stanford CIS, or Evelyn Douek on Lawfare<br/>
          • <strong>Election security / disinfo</strong> — Renee DiResta recent writing<br/>
          • <strong>Broadband / digital divide</strong> — Christopher Mitchell at ILSR<br/>
          • <strong>Civic tech / gov services</strong> — Jen Pahlka Recoding America introduction (free excerpt online)<br/>
          • <strong>Algorithmic harm / abolitionist</strong> — Ruha Benjamin Race After Technology introduction<br/>
          • <strong>Tech worker / gig labor</strong> — Veena Dubal on gig work
        </Block>
      </Accordion>

      <Accordion title="SPP 208 Prep (Zuckerman's class)" defaultOpen>
        <Block>
          <strong>What the class actually is:</strong> Zuckerman describes it as "a history class — specifically, a history of how democracies have shaped and been shaped by waves of communication technologies." The master concept is Habermas's public sphere. The assignments are short reaction papers + a final paper applying public sphere theory to online spaces.<br/><br/>
          <strong>The highest-leverage move:</strong> Walk in having read Zuckerman's own blog. He thinks out loud constantly. You'll know his framework before Day 1. Students who can have substantive conversations from the start are the ones who get strong letters.
        </Block>
        {spp208Items.map(item => (
          <CheckItem key={item.key} $done={state.reading[item.key]} onClick={() => toggleCheck('reading', item.key)}>
            <Check done={state.reading[item.key]} />
            <div>
              <CheckText $done={state.reading[item.key]}>{item.label}</CheckText>
              {item.note && <CheckNote>{item.note}</CheckNote>}
            </div>
          </CheckItem>
        ))}
        <Block style={{ marginTop: 12 }}>
          <strong>Secondary prep:</strong><br/>
          • Eli Pariser — The Filter Bubble (older but foundational for the algorithmic curation angle)<br/>
          • Cass Sunstein — #Republic or Republic.com intro ("echo chambers harm democracy")<br/>
          • Robert Darnton — "An Early Information Society" (AHR 2000) — gives you the historical comparison lens Zuckerman uses<br/><br/>
          <strong>Tier 1 prep (30 min, do before anything else):</strong> Read "What is the Matter with Policy Analysis" by Teles & Saldin. Short essay, free online. Sets up the limits of the technocratic policy mindset — you'll sound thoughtful in any seminar.
        </Block>
      </Accordion>

      <Accordion title="HKS / Long-Term Strategy Notes">
        <Block>
          <strong>What HKS actually looks for:</strong> Evidence of quantitative proficiency (calc, stats, econ) + a bachelor's with strong performance + a coherent public-service story. No specific major required. Their median student has 2–3 years of work experience after undergrad.<br/><br/>
          <strong>Your current profile already clears the quant bar:</strong> Calc I/II, Lin Alg, Stats 315, Micro/Macro, a full CS major with algorithms and probability. You are over-qualified on that dimension.<br/><br/>
          <strong>What moves the needle toward HKS:</strong><br/>
          1. A meaningful policy internship or two (not this summer — Summer 2027 is the high-stakes one)<br/>
          2. Undergraduate research (Track A is this)<br/>
          3. The PIT angle — CS + PIT + targeted tech policy work is more distinctive than another policy double major<br/>
          4. Two faculty who can write specifically about your analytical ability and public-service motivation<br/><br/>
          <strong>The minor vs. major distinction is invisible on grad applications.</strong> The courses show up either way. "Public Policy minor" vs "major" is one line. The eight SPP courses you'd take show up identically. The credential label doesn't matter; the story does.
        </Block>
      </Accordion>

      <Accordion title="Parking Lot (Open Questions)">
        <Block>
          • What is Damian's specific policy niche? (To be discovered through Track A, the reading sampler, and PUBPOL 208 — not before)<br/>
          • UMass 4+1 MPP: worth exploring? Cheaper than HKS, doable from here, could complement the CS degree. Not instead of HKS — just as an option.<br/>
          • When to ask mom to tap connections? Not this summer. Save the introduction for February 2027 when you know what you're looking for and can have a substantive conversation.<br/>
          • Symbolos equity / IP questions — to be resolved with co-builder before any monetization conversation.<br/>
          • damianphim.com/plan build: done (you're reading it)
        </Block>
      </Accordion>
    </Wrap>
  );
}
