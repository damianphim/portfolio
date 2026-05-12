import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); }`;

const Wrap = styled.div`animation: ${fadeIn} 0.25s ease;`;

const Prompt = styled.div`
  font-size: 0.78rem;
  font-family: 'Courier New', monospace;
  opacity: 0.45;
  margin-bottom: 12px;
  letter-spacing: 0.06em;
`;

const Input = styled.input`
  width: 100%;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 6px;
  color: inherit;
  padding: 12px 16px;
  font-size: 0.9rem;
  font-family: 'Georgia', serif;
  box-sizing: border-box;
  outline: none;
  &:focus { border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.07); }
  &::placeholder { opacity: 0.3; }
`;

const SaveBtn = styled.button`
  margin-top: 10px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.15);
  color: inherit;
  padding: 9px 22px;
  border-radius: 4px;
  font-size: 0.78rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: rgba(255,255,255,0.16); }
  &:disabled { opacity: 0.3; cursor: default; }
`;

const Divider = styled.div`
  margin: 28px 0;
  border-top: 1px solid rgba(255,255,255,0.06);
`;

const SectionLabel = styled.div`
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.4;
  font-family: 'Courier New', monospace;
  margin-bottom: 14px;
`;

const LogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LogEntry = styled.div`
  display: flex;
  gap: 16px;
  align-items: baseline;
  padding: 10px 14px;
  background: rgba(255,255,255,0.03);
  border-radius: 5px;
  border: 1px solid rgba(255,255,255,0.05);
`;

const LogDate = styled.div`
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  opacity: 0.4;
  white-space: nowrap;
  min-width: 80px;
`;

const LogText = styled.div`
  font-size: 0.88rem;
  opacity: 0.75;
  line-height: 1.45;
`;

const Empty = styled.div`
  font-size: 0.85rem;
  opacity: 0.3;
  font-family: 'Courier New', monospace;
  text-align: center;
  padding: 40px 0;
`;

function formatDate(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', weekday: 'short'
  });
}

function getTodayEntry(log) {
  const today = new Date().toISOString().split('T')[0];
  return log.find(l => l.date === today)?.entry || '';
}

export default function PlanLog({ state, addLogEntry }) {
  const todayExisting = getTodayEntry(state.log);
  const [entry, setEntry] = useState(todayExisting);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!entry.trim()) return;
    addLogEntry(entry);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSave();
  };

  return (
    <Wrap>
      <Prompt>One line. What happened today? (Press Enter or click Save)</Prompt>
      <Input
        value={entry}
        onChange={e => { setEntry(e.target.value); setSaved(false); }}
        onKeyDown={handleKey}
        placeholder="e.g. 3h research block, finished Boring/Ottoboni. Sent Quirk follow-up."
        maxLength={280}
      />
      <SaveBtn onClick={handleSave} disabled={!entry.trim()}>
        {saved ? 'Saved ✓' : 'Save'}
      </SaveBtn>

      <Divider />

      <SectionLabel>Previous entries</SectionLabel>
      <LogList>
        {state.log.length === 0 ? (
          <Empty>No entries yet. Write your first one above.</Empty>
        ) : (
          state.log.map((item, i) => (
            <LogEntry key={i}>
              <LogDate>{formatDate(item.date)}</LogDate>
              <LogText>{item.entry}</LogText>
            </LogEntry>
          ))
        )}
      </LogList>
    </Wrap>
  );
}
