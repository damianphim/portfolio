// usePlanState.js - Persisted state hook for the /plan pages
// Uses localStorage so state survives across sessions.
// To swap to Supabase: replace getItem/setItem with Supabase reads/writes.

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'damian_summer_plan_2026';

const defaultState = {
  // Part 1: This-week checklist
  checklist: {
    barnstable_email_sent: true, // Already done May 12
    phone_friction_setup: false,
    research_block_time_set: false,
    read_one_niche_sampler: false,
    subscribe_newsletters: false,
    pick_policy_issue: false,
    read_boring_ottoboni: false,
  },
  // Barnstable tracker
  barnstable: {
    benoit_status: 'sent', // 'sent' | 'replied' | 'meeting_scheduled' | 'no_reply' | 'declined'
    benoit_sent_date: '2026-05-12',
    quirk_status: 'not_sent',
    quirk_sent_date: null,
    followup_date: '2026-05-21',
    project_status: 'pending_response',
  },
  // Phase tracking
  phases: {
    lit_review_started: false,
    lit_review_complete: false,
    blog_post_1_draft: false,
    blog_post_1_published: false,
    blog_post_2_draft: false,
    blog_post_2_published: false,
    symbolos_weekly_hours: 0,
    website_built: false,
  },
  // Daily log
  log: [], // [{date: 'YYYY-MM-DD', entry: 'text'}]
  // Reading tracker (immediate / non-lit-review)
  reading: {
    boring_ottoboni: false,
    habermas_wiki: false,
    zuckerman_aixdemo: false,
    one_niche_sampler: false,
    politico_subscribed: false,
    second_newsletter: false,
  },
  // Per-paper reading status for the lit review
  // Values: 'not_started' | 'reading' | 'notes_written'
  reading_status: {
    // Phase 1 — Orientation reviews
    heffernan: 'not_started',
    gordon_alam: 'not_started',
    guo_llm_bias: 'not_started',
    // Phase 2 — Foundation
    boring_ottoboni: 'not_started',
    macnell_driscoll: 'not_started',
    centra_gaubatz: 'not_started',
    felton_mitchell: 'not_started',
    kreitzer_sweet_cushman: 'not_started',
    // Phase 3 — Post-2016 SET bias
    mengel_sauermann: 'not_started',
    aragon_pietri: 'not_started',
    mitchell_martin: 'not_started',
    // Phase 4 — RateMyProfessor-specific
    fernandez_yetter: 'not_started',
    rosen: 'not_started',
    zheng_vastrad: 'not_started',
    // Phase 5 — Race/ethnicity + intervention + policy
    chavez_mitchell: 'not_started',
    fan_shepherd: 'not_started',
    peterson_biederman: 'not_started',
    hornstein: 'not_started',
    // Phase 6 — LLM bias amplification
    wang_bias_amplification: 'not_started',
    seshadri_singh: 'not_started',
    xu_pride_prejudice: 'not_started',
    ren_guo: 'not_started',
  },
  // Research notes — all 22 papers
  research_notes: {
    // Phase 1 — Orientation reviews
    heffernan: '',
    gordon_alam: '',
    guo_llm_bias: '',
    // Phase 2 — Foundation
    boring_ottoboni: '',
    macnell_driscoll: '',
    centra_gaubatz: '',
    felton_mitchell: '',
    kreitzer_sweet_cushman: '',
    // Phase 3 — Post-2016 SET bias
    mengel_sauermann: '',
    aragon_pietri: '',
    mitchell_martin: '',
    // Phase 4 — RateMyProfessor-specific
    fernandez_yetter: '',
    rosen: '',
    zheng_vastrad: '',
    // Phase 5 — Race/ethnicity + intervention + policy
    chavez_mitchell: '',
    fan_shepherd: '',
    peterson_biederman: '',
    hornstein: '',
    // Phase 6 — LLM bias amplification
    wang_bias_amplification: '',
    seshadri_singh: '',
    xu_pride_prejudice: '',
    ren_guo: '',
  },
  // Meta
  last_updated: null,
  checkin_streak: 0,
  last_checkin: null,
};

export function usePlanState() {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with defaults to handle new keys added later
        return deepMerge(defaultState, parsed);
      }
    } catch (e) {
      console.warn('Could not load plan state:', e);
    }
    return defaultState;
  });

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Could not save plan state:', e);
    }
  }, [state]);

  const update = useCallback((path, value) => {
    setState(prev => {
      const next = deepClone(prev);
      setNestedValue(next, path, value);
      next.last_updated = new Date().toISOString();
      return next;
    });
  }, []);

  const toggleCheck = useCallback((section, key) => {
    setState(prev => {
      const next = deepClone(prev);
      next[section][key] = !prev[section][key];
      next.last_updated = new Date().toISOString();
      return next;
    });
  }, []);

  const addLogEntry = useCallback((entry) => {
    if (!entry.trim()) return;
    setState(prev => {
      const next = deepClone(prev);
      const today = new Date().toISOString().split('T')[0];
      // Replace today's entry if one exists
      const existingIdx = next.log.findIndex(l => l.date === today);
      if (existingIdx >= 0) {
        next.log[existingIdx].entry = entry;
      } else {
        next.log.unshift({ date: today, entry });
      }
      if (next.log.length > 90) next.log = next.log.slice(0, 90); // 3 months max
      next.last_updated = new Date().toISOString();
      return next;
    });
  }, []);

  const recordCheckin = useCallback(() => {
    setState(prev => {
      const next = deepClone(prev);
      const today = new Date().toISOString().split('T')[0];
      next.last_checkin = today;
      next.last_updated = new Date().toISOString();
      return next;
    });
  }, []);

  const exportState = useCallback(() => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `summer-plan-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [state]);

  const importState = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        setState(deepMerge(defaultState, imported));
      } catch (err) {
        alert('Invalid file. Make sure it\'s a plan export JSON.');
      }
    };
    reader.readAsText(file);
  }, []);

  return { state, update, toggleCheck, addLogEntry, recordCheckin, exportState, importState };
}

// Utilities
function deepMerge(base, override) {
  const result = { ...base };
  for (const key of Object.keys(override)) {
    if (override[key] && typeof override[key] === 'object' && !Array.isArray(override[key])) {
      result[key] = deepMerge(base[key] || {}, override[key]);
    } else {
      result[key] = override[key];
    }
  }
  return result;
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function setNestedValue(obj, path, value) {
  const keys = path.split('.');
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = value;
}