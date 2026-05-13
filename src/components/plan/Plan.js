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
  border: 1.5px solid ${p => p.$done ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.5)'};
  border-radius: 3px;
  flex-shrink: 0;
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${p => p.$done ? 'rgba(255,255,255,0.12)' : 'transparent'};
  transition: all 0.15s;
`;

const CheckText = styled.div`
  font-size: 0.95rem;
  line-height: 1.45;
  opacity: ${p => p.$done ? 0.4 : 0.9};
  text-decoration: ${p => p.$done ? 'line-through' : 'none'};
  text-decoration-color: rgba(255,255,255,0.25);
  transition: opacity 0.2s;
`;

const CheckNote = styled.div`
  font-size: 0.75rem;
  opacity: 0.45;
  margin-top: 2px;
  font-family: 'Courier New', monospace;
`;

// ─── Progress bar ─────────────────────────────────────────────────────────────
const ProgressWrap = styled.div`
  margin-bottom: 36px;
`;

const ProgressRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
`;

const ProgressLabel = styled.div`
  font-size: 0.78rem;
  font-family: 'Courier New', monospace;
  opacity: 0.5;
  letter-spacing: 0.08em;
`;

const ProgressNum = styled.div`
  font-size: 0.78rem;
  font-family: 'Courier New', monospace;
  opacity: 0.5;
`;

const ProgressTrack = styled.div`
  height: 3px;
  background: rgba(255,255,255,0.08);
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${p => p.$pct}%;
  background: rgba(255,255,255,0.7);
  border-radius: 2px;
  transition: width 0.4s ease;
`;

// ─── Barnstable table ─────────────────────────────────────────────────────────
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 8px 12px;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
  opacity: 0.4;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  font-weight: 400;
`;

const Td = styled.td`
  padding: 10px 12px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  opacity: 0.8;
  vertical-align: top;
`;



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
  padding: 10px 14px 8px;
  background: rgba(255,255,255,0.03);
`;

const NoteTitle = styled.div`
  font-size: 0.85rem;
  opacity: 0.8;
`;

const NoteStatus = styled.div`
  font-size: 0.68rem;
  font-family: 'Courier New', monospace;
  opacity: 0.35;
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

// ─── Export/Import ────────────────────────────────────────────────────────────
const UtilRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,0.06);
  flex-wrap: wrap;
`;

const UtilBtn = styled.button`
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  color: inherit;
  padding: 8px 18px;
  border-radius: 4px;
  font-size: 0.78rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: rgba(255,255,255,0.12); }
`;

const LastSaved = styled.div`
  font-size: 0.72rem;
  opacity: 0.35;
  font-family: 'Courier New', monospace;
  margin-top: 12px;
`;

// ─── Checkmark ────────────────────────────────────────────────────────────────
const Check = ({ done }) => (
  <Box $done={done}>
    {done && <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
      <path d="M1 4L4.5 7.5L10 1" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>}
  </Box>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────
const STATUS_OPTIONS = [
  { value: 'not_sent', label: 'Not sent' },
  { value: 'sent', label: 'Sent' },
  { value: 'replied', label: 'Replied' },
  { value: 'meeting_scheduled', label: 'Meeting scheduled' },
  { value: 'no_reply', label: 'No reply' },
  { value: 'declined', label: 'Declined' },
];

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const diff = new Date(dateStr) - new Date(new Date().toISOString().split('T')[0]);
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

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

  return (
    <Wrap>
      <PageTitle>Summer 2026 — Plan</PageTitle>
      <DateDisplay>{today}</DateDisplay>
      <Subtitle>
        {state.last_updated
          ? `Last updated ${new Date(state.last_updated).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}`
          : 'Not yet saved'}
      </Subtitle>

      <TabRow>
        {TABS.map(t => (
          <Tab key={t} $active={tab === t} onClick={() => setTab(t)}>{t}</Tab>
        ))}
      </TabRow>

      {tab === 'Dashboard' && (
        <>
          {/* Progress */}
          <ProgressWrap>
            <ProgressRow>
              <ProgressLabel>This week's items</ProgressLabel>
              <ProgressNum>{checkCount} / {checklistItems.length}</ProgressNum>
            </ProgressRow>
            <ProgressTrack><ProgressFill $pct={checkPct} /></ProgressTrack>
          </ProgressWrap>

          {/* Checklist */}
          <Section>
            <SectionLabel>Action Checklist — Week of May 12</SectionLabel>
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

          {/* Barnstable Tracker */}
          <Section>
            <SectionLabel>Barnstable Outreach Tracker</SectionLabel>
            {followupDays !== null && followupDays <= 3 && followupDays >= 0 && (
              <div style={{ 
                background: 'rgba(255,220,100,0.08)', 
                border: '1px solid rgba(255,220,100,0.25)', 
                borderRadius: 6, 
                padding: '10px 14px', 
                marginBottom: 14,
                fontSize: '0.82rem',
                fontFamily: 'Courier New, monospace',
                color: 'rgba(255,220,100,0.9)'
              }}>
                ⚠ Benoit follow-up due {followupDays === 0 ? 'today' : `in ${followupDays} day${followupDays > 1 ? 's' : ''}`} (May 21)
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

          {/* Research notes */}
          <Section>
            <SectionLabel>Research Notes — Phase A Papers</SectionLabel>
            {[
              { key: 'boring_ottoboni', label: 'Boring, Ottoboni & Stark (2016)', hint: 'Natural experiment, random assignment, SETs measure satisfaction not learning...' },
              { key: 'centra_gaubatz', label: 'Centra & Gaubatz (2000)', hint: 'The counterargument — what validity SETs do have...' },
              { key: 'felton_mitchell', label: 'Felton, Mitchell & Stinson', hint: 'RMP-specific findings...' },
              { key: 'macnell_driscoll', label: 'MacNell, Driscoll & Hunt (2015)', hint: 'Online course gender study — same instructor, different perceived name...' },
              { key: 'kreitzer_sweet_cushman', label: 'Kreitzer & Sweet-Cushman (2022)', hint: 'Political science SETs and gender bias...' },
            ].map(paper => {
              const note = state.research_notes?.[paper.key] ?? '';
              return (
                <NoteCard key={paper.key}>
                  <NoteHeader>
                    <NoteTitle>{paper.label}</NoteTitle>
                    <NoteStatus>{note.length > 0 ? `${note.length} chars` : 'no notes yet'}</NoteStatus>
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
