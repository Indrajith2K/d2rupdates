import React from 'react';
import styles from './ClientCard.module.css';

export default function ClientCard({ client, onOpen }) {
  return (
    <article
      className={styles.card}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      aria-label={`Open ${client.name} update log`}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onOpen()}
    >
      {/* Trello-style colour cover strip */}
      <div className={styles.cover} style={{ background: client.accentGradient }} />

      <div className={styles.body}>
        {/* Top */}
        <div className={styles.topRow}>
          <div className={styles.avatar} style={{ background: client.accentGradient }}>
            {client.initials}
          </div>
          <div className={styles.nameGroup}>
            <div className={styles.name}>{client.name}</div>
            <div className={styles.labels}>
              <span className={`${styles.label} ${styles.labelGreen}`}>● Active</span>
              <span className={`${styles.label} ${styles.labelBlue}`}>{client.type}</span>
            </div>
          </div>
        </div>

        {/* Metadata grid */}
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.metaKey}>Industry</span>
            <span className={styles.metaVal}>{client.industry}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaKey}>Client Since</span>
            <span className={styles.metaVal}>{client.since}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaKey}>Sessions</span>
            <span className={styles.metaVal}>{client.updateCount} logged</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaKey}>Status</span>
            <span className={styles.metaVal}>Ongoing</span>
          </div>
        </div>

        {/* Description */}
        <p className={styles.desc}>{client.description}</p>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.count}>
            <svg className={styles.countIcon} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 4h12v7a2 2 0 01-2 2H4a2 2 0 01-2-2V4zM5 4V3a1 1 0 011-1h4a1 1 0 011 1v1"/>
            </svg>
            {client.updateCount} update sessions
          </div>
          <button className={styles.openBtn}>
            View Log
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 5.5h7M5.5 2l3.5 3.5L5.5 9"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
