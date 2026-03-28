import React, { useState, useMemo } from 'react';
import styles from './UpdateLog.module.css';

const TYPE_META = {
  feature: { label: 'Feature', color: '#ffffff', bg: '#007aff', filterClass: 'filterBtnFeature' },
  fix:     { label: 'Fix',     color: '#ffffff', bg: '#ff9500', filterClass: 'filterBtnFix'     },
  design:  { label: 'Design',  color: '#ffffff', bg: '#af52de', filterClass: 'filterBtnDesign'  },
  content: { label: 'Content', color: '#ffffff', bg: '#34c759', filterClass: 'filterBtnContent' },
};

const FILTERS = [
  { key: 'all',     label: 'All',     class: 'filterBtnAll'     },
  { key: 'feature', label: 'Feature', class: 'filterBtnFeature' },
  { key: 'fix',     label: 'Fix',     class: 'filterBtnFix'     },
  { key: 'design',  label: 'Design',  class: 'filterBtnDesign'  },
  { key: 'content', label: 'Content', class: 'filterBtnContent' },
];

const FILTER_COLORS = {
  all:     '#1c1c1e',
  feature: '#007aff',
  fix:     '#ff9500',
  design:  '#af52de',
  content: '#34c759',
};

function formatDate(str) {
  const d = new Date(str);
  return {
    day:       d.toLocaleDateString('en-IN', { day: '2-digit' }),
    monthYear: d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
    full:      d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
  };
}

function LogCard({ entry, index }) {
  const [open, setOpen] = useState(false);
  const meta = TYPE_META[entry.type];
  const date = formatDate(entry.date);

  return (
    <div
      className={`${styles.logCard} ${open ? styles.logCardExpanded : ''}`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Summary row */}
      <div className={styles.cardSummary} onClick={() => setOpen(o => !o)}>

        {/* Date pill */}
        <div className={styles.datePill}>
          <span className={styles.dateDay}>{date.day}</span>
          <span className={styles.dateMonthYear}>{date.monthYear}</span>
        </div>

        {/* Content */}
        <div className={styles.cardContent}>
          <div className={styles.cardTopLine}>
            <span
              className={styles.typePill}
              style={{ background: meta.bg, color: meta.color }}
            >
              {meta.label}
            </span>
            <span className={styles.sessionId}>{entry.session}</span>
          </div>
          <div className={styles.cardTitle}>{entry.summary}</div>
          <div className={styles.cardSubline}>
            <span>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="6" cy="6" r="4.5"/>
                <path d="M6 3.5V6.5L8 8"/>
              </svg>
              {entry.duration}
            </span>
            <span>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="6" cy="4.5" r="2"/>
                <path d="M2 10c0-2.2 1.8-4 4-4s4 1.8 4 4"/>
              </svg>
              {entry.engineer}
            </span>
            <span>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="2" width="10" height="9" rx="1.5"/>
                <path d="M4 2V1M8 2V1M1 5.5h10"/>
              </svg>
              {date.full}
            </span>
          </div>
        </div>

        {/* Expand toggle */}
        <button
          className={styles.chevronBtn}
          aria-label={open ? 'Collapse' : 'Expand'}
        >
          <svg
            className={`${styles.chevronIcon} ${open ? styles.chevronOpen : ''}`}
            viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M4 6l4 4 4-4"/>
          </svg>
        </button>
      </div>

      {/* Detail panel */}
      <div className={`${styles.detailPanel} ${open ? styles.detailPanelOpen : ''}`}>
        <div className={styles.detailInner}>
          {entry.details.map((d, i) => (
            <div key={i} className={styles.detailItem}>
              <svg className={styles.checkIcon} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8l4 4L13 5"/>
              </svg>
              <span>{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function UpdateLog({ onClose, updates }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = useMemo(() =>
    activeFilter === 'all' ? updates : updates.filter(u => u.type === activeFilter),
    [activeFilter, updates]
  );

  return (
    <div className={styles.section}>

      {/* Back nav */}
      <div className={styles.navRow}>
        <button className={styles.backBtn} onClick={onClose}>
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 2L4 7l5 5"/>
          </svg>
          Back to Clients
        </button>
      </div>

      {/* Filters */}
      <div className={styles.filterRow}>
        <span className={styles.filterLabel}>Filter:</span>
        {FILTERS.map(f => {
          const count = f.key === 'all'
            ? updates.length
            : updates.filter(u => u.type === f.key).length;
          const isActive = activeFilter === f.key;
          return (
            <button
              key={f.key}
              className={`${styles.filterBtn} ${styles[f.class]} ${isActive ? styles.filterActive : ''}`}
              style={isActive ? { background: FILTER_COLORS[f.key] } : {}}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
              <span className={styles.filterCount}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Log list */}
      {filtered.length === 0 ? (
        <div className={styles.emptyState}>No sessions found for this filter.</div>
      ) : (
        <div className={styles.logList}>
          {filtered.map((entry, i) => (
            <LogCard key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      )}

      <div className={styles.endMarker}>
        {filtered.length} session{filtered.length !== 1 ? 's' : ''} · End of log
      </div>
    </div>
  );
}
