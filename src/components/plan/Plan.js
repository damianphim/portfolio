import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { usePlanState } from './usePlanState';
import PlanLog from './PlanLog';
import PlanOriginal from './PlanOriginal';
import PlanAddendum from './PlanAddendum';

// ─── Animations ───────────────────────────────────────────────────────────────
const fadeIn = keyframes`from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); }`;

// ─── Layout ───────────────────────────────────────────────────────────────────
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

const DateDisplay = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 6px;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.div`
  font-size: 0.85rem;
  opacity: 0.5;
  margin-bottom: 40px;
  font-family: 'Courier New', monospace;
`;

const TabRow = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 32px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  padding-bottom: 0;
`;

const Tab = styled.button`
  background: none;
  border: none;
  padding: 10px 18px 12px;
  cursor: pointer;
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
  color: ${p => p.$active ? (p.theme.color || '#fff') : 'rgba(255,255,255,0.35)'};
  border-bottom: 2px solid ${p => p.$active ? (p.theme.color || '#fff') : 'transparent'};
  margin-bottom: -1px;
  transition: color 0.2s, border-color 0.2s;
  &:hover { color: ${p => p.theme.color || '#fff'}; }
`;

// ─── Section ──────────────────────────────────────────────────────────────────
const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionLabel = styled.div`
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.4;
  font-family: 'Courier New', monospace;
  margin-bottom: 14px;
`;

// ─── Checklist ────────────────────────────────────────────────────────────────
const CheckItem = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 12px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;
  margin-bottom: 4px;
  background: rgba(255,255,255,${p => p.$done ? '0.03' : '0.055'});
  border: 1px solid rgba(255,255,255,${p => p.$done ? '0.04' : '0.09'});
  &:hover { background: rgba(255,255,255,0.08); }
`;

const Box = styled.div`
  width: 18px;
  height: 18px;
  border: 1.5px solid ${p => p.$done ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.25)'};
  border-radius: 4px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${p => p.$done ? 'rgba(255,255,255,0.08)' : 'transparent'};
  margin-top: 1px;
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
  margin-top: 3px;
  font-family: 'Courier New', monospace;
`;

// ─── Progress bar ─────────────────────────────────────────────────────────────
const ProgressBar = styled.div`
  height: 2px;
  background: rgba(255,255,255,0.07);
  border-radius: 2px;
  margin-bottom: 28px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: rgba(255,255,255,0.4);
  border-radius: 2px;
  width: ${p => p.$pct}%;
  transition: width 0.4s ease;
`;

// ─── Barnstable ───────────────────────────────────────────────────────────────
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 8px 12px;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.35;
  font-family: 'Courier New', monospace;
  font-weight: 400;
  border-bottom: 1px solid rgba(255,255,255,0.06);
`;

const Td = styled.td`
  padding: 10px 12px;
  opacity: 0.7;
  border-bottom: 1px solid rgba(255,255,255,0.04);
`;

const STATUS_OPTIONS = [
  { value: 'not_sent', label: 'Not sent' },
  { value: 'sent', label: 'Sent' },
  { value: 'replied', label: 'Replied ✓' },
  { value: 'meeting_scheduled', label: 'Meeting scheduled' },
  { value: 'no_reply', label: 'No reply (follow up)' },
  { value: 'declined', label: 'Declined' },
];

const StatusSelect = styled.select`
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  color: inherit;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.78rem;
  font-family: 'Courier New', monospace;
  cursor: pointer;
  option { background: #111; }
`;

// ─── Reading tracker ──────────────────────────────────────────────────────────
const ReadingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

// ─── Research Notes ───────────────────────────────────────────────────────────
const NoteCard = styled.div`
  margin-bottom: 10px;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 6px;
  overflow: hidden;
`;

const NoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  padding: 10px 14px 8px;
  background: rgba(255,255,255,0.03);
`;

const NoteTitle = styled.div`
  font-size: 0.85rem;
  opacity: 0.8;
  flex: 1;
`;

const NoteControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

const NoteStatus = styled.div`
  font-size: 0.68rem;
  font-family: 'Courier New', monospace;
  opacity: 0.35;
`;

const ReadingStatusSelect = styled.select`
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10);
  color: inherit;
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 0.68rem;
  font-family: 'Courier New', monospace;
  cursor: pointer;
  option { background: #111; }
`;

const NoteTextarea = styled.textarea`
  width: 100%;
  background: rgba(255,255,255,0.025);
  border: none;
  border-top: 1px solid rgba(255,255,255,0.05);
  color: inherit;
  padding: 12px 14px;
  font-size: 0.84rem;
  font-family: 'Georgia', serif;
  line-height: 1.6;
  resize: vertical;
  min-height: 72px;
  box-sizing: border-box;
  outline: none;
  opacity: 0.75;
  &:focus { 
    background: rgba(255,255,255,0.04);
    opacity: 1;
  }
  &::placeholder { opacity: 0.3; }
`;

// Phase header row
const PhaseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 28px 0 10px;
  &:first-child { margin-top: 0; }
`;

const PhaseLabel = styled.div`
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.45;
  font-family: 'Courier New', monospace;
`;

const PhasePct = styled.div`
  font-size: 0.68rem;
  font-family: 'Courier New', monospace;
  opacity: 0.3;
`;

// ─── Export/Import ────────────────────────────────────────────────────────────
const UtilRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;
`;

const UtilBtn = styled.button`
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  color: inherit;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  font-family: 'Courier New', monospace;
  transition: background 0.15s;
  &:hover { background: rgba(255,255,255,0.1); }
`;

const LastSaved = styled.div`
  font-size: 0.72rem;
  opacity: 0.3;
  margin-top: 12px;
  font-family: 'Courier New', monospace;
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Check({ done }) {
  return (
    <Box $done={done}>
      {done && <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path d="M1 3.5L3.5 6.5L9 1" stroke="rgba(255,255,255,0.65)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>}
    </Box>
  );
}

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const target = new Date(dateStr + 'T12:00:00');
  const now = new Date();
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ─── Lit review paper list, grouped by phase ──────────────────────────────────
const LIT_PHASES = [
  {
    id: 'phase1',
    label: 'Phase 1 — Orientation reviews',
    papers: [
      { key: 'heffernan', label: 'Heffernan (2022)', hint: 'Sexism, racism, prejudice, and bias: lit review & synthesis of SET research. Read first — map of the field.' },
      { key: 'gordon_alam', label: 'Gordon & Alam (2021)', hint: 'Race & gender in CS professor evaluations on RMP — SIGCSE. Closest paper to your project. Read second.' },
      { key: 'guo_llm_bias', label: 'Guo et al. (2024)', hint: 'Bias in large language models: origin, evaluation, mitigation. arXiv review. Orientation paper for the LLM side.' },
    ],
  },
  {
    id: 'phase2',
    label: 'Phase 2 — Foundation',
    papers: [
      { key: 'boring_ottoboni', label: 'Boring, Ottoboni & Stark (2016)', hint: 'Natural experiment, random assignment, SETs measure satisfaction not learning...' },
      { key: 'macnell_driscoll', label: 'MacNell, Driscoll & Hunt (2015)', hint: 'Online course gender study — same instructor, different perceived name...' },
      { key: 'centra_gaubatz', label: 'Centra & Gaubatz (2000)', hint: 'The counterargument — what validity SETs do have...' },
      { key: 'felton_mitchell', label: 'Felton, Mitchell & Stinson', hint: 'RMP-specific findings...' },
      { key: 'kreitzer_sweet_cushman', label: 'Kreitzer & Sweet-Cushman (2022)', hint: 'Political science SETs and gender bias...' },
    ],
  },
  {
    id: 'phase3',
    label: 'Phase 3 — Post-2016 SET bias',
    papers: [
      { key: 'mengel_sauermann', label: 'Mengel, Sauermann & Zölitz (2019)', hint: 'Gender bias in teaching evaluations. JEEA. Large-scale natural experiment.' },
      { key: 'aragon_pietri', label: 'Aragón, Pietri & Powell (2023)', hint: 'Gender bias and department gender composition. PNAS. Causal identification.' },
      { key: 'mitchell_martin', label: 'Mitchell & Martin (2018)', hint: 'Gender bias in student evaluations. PS: Political Science & Politics.' },
    ],
  },
  {
    id: 'phase4',
    label: 'Phase 4 — RateMyProfessor-specific',
    papers: [
      { key: 'fernandez_yetter', label: 'Fernandez & Yetter (2025)', hint: '8 million RMP reviews, sentiment analysis, gender/race bias. Southern Economic Journal. Read first in this phase.' },
      { key: 'rosen', label: 'Rosen (2018)', hint: 'Large-scale RMP bias study. Assessment & Evaluation in Higher Education. Foundational for RMP-bias literature.' },
      { key: 'zheng_vastrad', label: 'Zheng, Vastrad, He & Ni (2023)', hint: 'Contextualizing gender disparities in online teaching evaluations. PLOS One.' },
    ],
  },
  {
    id: 'phase5',
    label: 'Phase 5 — Race/ethnicity + intervention + policy',
    papers: [
      { key: 'chavez_mitchell', label: 'Chávez & Mitchell (2020)', hint: 'Gender, race, and ethnicity bias in student evaluations. PS.' },
      { key: 'fan_shepherd', label: 'Fan, Shepherd, Slavich, Waters & Stone (2019)', hint: 'Gender and cultural bias in SETs; representation matters. PLOS One.' },
      { key: 'peterson_biederman', label: 'Peterson, Biederman et al. (2019)', hint: 'Mitigating gender bias in student evaluations of teaching. PLOS One.' },
      { key: 'hornstein', label: 'Hornstein (2017)', hint: 'SETs are an inadequate assessment tool. Cogent Education. (May swap for Stroebe 2020.)' },
    ],
  },
  {
    id: 'phase6',
    label: 'Phase 6 — LLM bias amplification',
    papers: [
      { key: 'wang_bias_amplification', label: 'Wang et al. (2025)', hint: 'Bias amplification: LLMs as increasingly biased media. ACL. Closest paper to H4 — read carefully.' },
      { key: 'seshadri_singh', label: 'Seshadri, Singh & Elazar (2024)', hint: 'Bias amplification paradox in text-to-image generation. NAACL. Does model amplify training-data bias or just reflect it?' },
      { key: 'xu_pride_prejudice', label: 'Xu, Zhu, Zhao et al. (2024)', hint: 'Pride and prejudice: LLM amplifies self-bias in self-refinement. ACL. 152 citations.' },
      { key: 'ren_guo', label: 'Ren, Guo, Qiu, Wang et al. (2024)', hint: 'Bias amplification in LLM evolution: iterated learning perspective. NeurIPS. Bayesian framing of compounding bias.' },
    ],
  },
];

const READING_STATUS_OPTIONS = [
  { value: 'not_started', label: 'Not started' },
  { value: 'reading', label: 'Reading' },
  { value: 'notes_written', label: 'Notes written ✓' },
];

// ─── Main Component ───────────────────────────────────────────────────────────
const TABS = ['Dashboard', 'Log', 'Original Plan', 'Addendum'];

export default function Plan() {
  const { state, update, toggleCheck, addLogEntry, exportState, importState } = usePlanState();
  const [tab, setTab] = useState('Dashboard');
  const fileRef = useRef();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });

  const checklistItems = [
    { key: 'barnstable_email_sent', label: 'Send email to Jim Benoit (Barnstable IT)', note: 'Done May 12 ✓' },
    { key: 'phone_friction_setup', label: 'Set up phone friction system', note: 'Apps off home screen, Screen Time passcode, phone charges in different room' },
    { key: 'research_block_time_set', label: 'Commit to a morning research block time', note: 'Aim for 9am–noon daily' },
    { key: 'read_boring_ottoboni', label: 'Read Boring, Ottoboni & Stark (2016)', note: 'Google Scholar → "Boring Ottoboni Stark 2016 student evaluations"' },
    { key: 'read_one_niche_sampler', label: 'Read one niching-down sampler piece', note: 'Pick from Part 6 of addendum, 45 min timer' },
    { key: 'subscribe_newsletters', label: 'Subscribe: Politico Playbook + one other', note: 'Tangle, Slow Boring, or The Dispatch' },
    { key: 'pick_policy_issue', label: 'Pick one policy issue to follow all semester', note: 'AI EO rescission, state deepfake laws, Section 230, BEAD broadband, etc.' },
  ];

  const checkCount = checklistItems.filter(i => state.checklist[i.key]).length;
  const checkPct = Math.round((checkCount / checklistItems.length) * 100);

  const readingItems = [
    { key: 'boring_ottoboni', label: 'Boring/Ottoboni/Stark 2016' },
    { key: 'habermas_wiki', label: 'Habermas public sphere (Wikipedia + Ch.1)' },
    { key: 'zuckerman_aixdemo', label: 'Zuckerman AIxDemocracy post' },
    { key: 'one_niche_sampler', label: 'One niche-sampler piece' },
    { key: 'politico_subscribed', label: 'Politico Playbook subscribed' },
    { key: 'second_newsletter', label: 'Second newsletter subscribed' },
  ];

  const followupDays = daysUntil(state.barnstable.followup_date);

  // Compute total lit review progress
  const allPapers = LIT_PHASES.flatMap(ph => ph.papers);
  const doneCount = allPapers.filter(p => (state.reading_status?.[p.key] ?? 'not_started') === 'notes_written').length;
  const litPct = Math.round((doneCount / allPapers.length) * 100);

  return (
    <Wrap>
      <PageTitle>Summer 2026 — Plan</PageTitle>
      <DateDisplay>{today}</DateDisplay>
      <Subtitle>
        {state.last_updated
          ? `Last updated ${new Date(state.last_updated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}`
          : 'No updates yet'}
      </Subtitle>

      <TabRow>
        {TABS.map(t => (
          <Tab key={t} $active={tab === t} onClick={() => setTab(t)}>{t}</Tab>
        ))}
      </TabRow>

      {tab === 'Dashboard' && (
        <>
          {/* Launch checklist */}
          <Section>
            <SectionLabel>Launch Checklist — {checkCount}/{checklistItems.length} done</SectionLabel>
            <ProgressBar><ProgressFill $pct={checkPct} /></ProgressBar>
            {checklistItems.map(item => {
              const done = state.checklist[item.key];
              return (
                <CheckItem key={item.key} $done={done} onClick={() => toggleCheck('checklist', item.key)}>
                  <Check done={done} />
                  <div>
                    <CheckText $done={done}>{item.label}</CheckText>
                    {item.note && <CheckNote>{item.note}</CheckNote>}
                  </div>
                </CheckItem>
              );
            })}
          </Section>

          {/* Barnstable tracker */}
          <Section>
            <SectionLabel>Barnstable Project</SectionLabel>
            {followupDays !== null && followupDays <= 3 && (
              <div style={{ fontSize: '0.8rem', fontFamily: 'Courier New', opacity: 0.55, marginBottom: 12, color: followupDays <= 0 ? '#f6a' : 'inherit' }}>
                ⚠ Follow-up due {followupDays <= 0 ? 'today' : `in ${followupDays} day${followupDays > 1 ? 's' : ''}`} (May 21)
              </div>
            )}
            <Table>
              <thead>
                <tr>
                  <Th>Contact</Th>
                  <Th>Sent</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>Jim Benoit — Barnstable IT</Td>
                  <Td>{formatDate(state.barnstable.benoit_sent_date)}</Td>
                  <Td>
                    <StatusSelect
                      value={state.barnstable.benoit_status}
                      onChange={e => update('barnstable.benoit_status', e.target.value)}
                      onClick={e => e.stopPropagation()}
                    >
                      {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </StatusSelect>
                  </Td>
                </tr>
                <tr>
                  <Td>Ann Quirk — Town Clerk (backup)</Td>
                  <Td>{formatDate(state.barnstable.quirk_sent_date)}</Td>
                  <Td>
                    <StatusSelect
                      value={state.barnstable.quirk_status}
                      onChange={e => update('barnstable.quirk_status', e.target.value)}
                      onClick={e => e.stopPropagation()}
                    >
                      {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </StatusSelect>
                  </Td>
                </tr>
              </tbody>
            </Table>
          </Section>

          {/* Phase progress */}
          <Section>
            <SectionLabel>Research Phase Progress</SectionLabel>
            {[
              { key: 'lit_review_started', label: 'Phase A: Literature review started' },
              { key: 'lit_review_complete', label: 'Phase A: Literature review complete + Blog Post #2 published' },
              { key: 'blog_post_1_draft', label: 'Blog Post #1 drafted (Harrell)' },
              { key: 'blog_post_1_published', label: 'Blog Post #1 published' },
              { key: 'website_built', label: 'damianphim.com/plan live' },
            ].map(item => {
              const done = state.phases[item.key];
              return (
                <CheckItem key={item.key} $done={done} onClick={() => toggleCheck('phases', item.key)}>
                  <Check done={done} />
                  <CheckText $done={done}>{item.label}</CheckText>
                </CheckItem>
              );
            })}
          </Section>

          {/* Reading tracker */}
          <Section>
            <SectionLabel>Reading Tracker — Immediate</SectionLabel>
            <ReadingGrid>
              {readingItems.map(item => {
                const done = state.reading[item.key];
                return (
                  <CheckItem key={item.key} $done={done} onClick={() => toggleCheck('reading', item.key)}>
                    <Check done={done} />
                    <CheckText $done={done} style={{ fontSize: '0.85rem' }}>{item.label}</CheckText>
                  </CheckItem>
                );
              })}
            </ReadingGrid>
          </Section>

          {/* Literature Review — all 22 papers by phase */}
          <Section>
            <SectionLabel>
              Literature Review — {doneCount}/{allPapers.length} papers with notes ({litPct}%)
            </SectionLabel>
            <ProgressBar style={{ marginBottom: 0, marginTop: 4 }}>
              <ProgressFill $pct={litPct} />
            </ProgressBar>

            {LIT_PHASES.map(phase => {
              const phDone = phase.papers.filter(p => (state.reading_status?.[p.key] ?? 'not_started') === 'notes_written').length;
              return (
                <div key={phase.id}>
                  <PhaseHeader>
                    <PhaseLabel>{phase.label}</PhaseLabel>
                    <PhasePct>{phDone}/{phase.papers.length}</PhasePct>
                  </PhaseHeader>

                  {phase.papers.map(paper => {
                    const note = state.research_notes?.[paper.key] ?? '';
                    const status = state.reading_status?.[paper.key] ?? 'not_started';
                    return (
                      <NoteCard key={paper.key}>
                        <NoteHeader>
                          <NoteTitle>{paper.label}</NoteTitle>
                          <NoteControls>
                            <NoteStatus>{note.length > 0 ? `${note.length} chars` : 'no notes'}</NoteStatus>
                            <ReadingStatusSelect
                              value={status}
                              onChange={e => update(`reading_status.${paper.key}`, e.target.value)}
                            >
                              {READING_STATUS_OPTIONS.map(o => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                              ))}
                            </ReadingStatusSelect>
                          </NoteControls>
                        </NoteHeader>
                        <NoteTextarea
                          value={note}
                          onChange={e => update(`research_notes.${paper.key}`, e.target.value)}
                          placeholder={paper.hint}
                          rows={3}
                        />
                      </NoteCard>
                    );
                  })}
                </div>
              );
            })}
          </Section>

          {/* Decisions made */}
          <Section>
            <SectionLabel>Decisions Made (Do Not Revisit)</SectionLabel>
            <div style={{ 
              fontSize: '0.85rem', 
              lineHeight: 1.7, 
              opacity: 0.6, 
              fontFamily: 'Courier New, monospace',
              padding: '14px 16px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 6,
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              ✓ Staying with the Public Policy minor (not double major)<br/>
              ✓ Not scrambling for prestige internships this summer<br/>
              ✓ HKS is a story play, not a credential play<br/>
              ✓ CS major + PIT certificate + targeted policy work is the angle<br/>
              ✓ Email sent to Jim Benoit (not Clyburn, not Quirk first)<br/>
              ✓ Barnstable project: listen first, propose nothing specific<br/>
              ✓ Summer plan is the canonical document; addendum supports it<br/>
            </div>
          </Section>

          {/* Export/Import */}
          <UtilRow>
            <UtilBtn onClick={exportState}>Export backup →</UtilBtn>
            <UtilBtn onClick={() => fileRef.current.click()}>Import backup ↑</UtilBtn>
            <input
              ref={fileRef}
              type="file"
              accept=".json"
              style={{ display: 'none' }}
              onChange={e => { if (e.target.files[0]) importState(e.target.files[0]); }}
            />
          </UtilRow>
          <LastSaved>
            Export saves a JSON file you can import on any device. That's the cross-device sync story for now.
          </LastSaved>
        </>
      )}

      {tab === 'Log' && <PlanLog state={state} addLogEntry={addLogEntry} />}
      {tab === 'Original Plan' && <PlanOriginal />}
      {tab === 'Addendum' && <PlanAddendum state={state} toggleCheck={toggleCheck} />}
    </Wrap>
  );
}