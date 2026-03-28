import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ClientCard from './components/ClientCard';
import UpdateLog from './components/UpdateLog';
import { d2rUpdates } from './data/d2rUpdates';
import styles from './App.module.css';

const CLIENTS = [
  {
    id: 'd2r',
    name: 'D2R Holidays',
    initials: 'D2R',
    accentColor: '#ff9500',
    accentGradient: 'linear-gradient(135deg, #ff9500 0%, #ff6b35 100%)',
    industry: 'Travel & Tourism',
    type: 'Website',
    since: 'Mar 2026',
    description: 'Full-stack travel & holiday package website, covering domestic and international tour packages with booking integrations.',
    updates: d2rUpdates,
  },
];

function KpiRow({ clients, activeClient }) {
  const src = activeClient ? [activeClient] : clients;
  const all  = src.flatMap(c => c.updates);
  const last = [...all].sort((a,b) => new Date(b.date)-new Date(a.date))[0]?.date;
  const lastFmt = last
    ? new Date(last).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})
    : '—';

  const items = [
    { value: all.length,                             label: 'Total Sessions',  color: '#007aff' },
    { value: all.filter(u=>u.type==='feature').length, label: 'Features',        color: '#34c759' },
    { value: all.filter(u=>u.type==='fix').length,     label: 'Bug Fixes',       color: '#ff9500' },
    { value: all.filter(u=>u.type==='design').length,  label: 'Design Updates',  color: '#af52de' },
    { value: lastFmt,                                label: 'Last Session',    color: '#007aff', small: true },
  ];

  return (
    <div className={styles.kpiRow}>
      {items.map((k,i) => (
        <div className={styles.kpiCard} key={i}>
          <span className={styles.kpiValue} style={{color: k.small ? 'var(--text-primary)' : k.color, fontSize: k.small ? '0.9rem' : undefined}}>
            {k.value}
          </span>
          <span className={styles.kpiLabel}>{k.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [openClientId, setOpenClientId] = useState(null);

  const openClient = useMemo(
    () => CLIENTS.find(c => c.id === openClientId) || null,
    [openClientId]
  );

  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.main}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroEyebrow}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                <circle cx="5" cy="5" r="5"/>
              </svg>
              {openClient ? `${openClient.name}` : 'Internal Dashboard'}
            </div>
            <h1 className={styles.heroTitle}>
              {openClient ? 'Website Updates' : 'Company Feedbacks'}
            </h1>
            <p className={styles.heroSub}>
              {openClient
                ? `Development & maintenance log for ${openClient.name} — all sessions listed chronologically.`
                : <>Centralised logs and feedback tracking for all client projects by <strong>CodeMeshFlow</strong>.</>
              }
            </p>
            <KpiRow clients={CLIENTS} activeClient={openClient} />
          </div>
        </section>

        {/* Content */}
        <div className="container">
          {!openClient ? (
            <>
              <div className={styles.sectionHead}>
                <span className={styles.sectionTitle}>Client Projects</span>
              </div>
              <div className={styles.cardGrid}>
                {CLIENTS.map(client => (
                  <ClientCard
                    key={client.id}
                    client={{ ...client, updateCount: client.updates.length }}
                    onOpen={() => setOpenClientId(client.id)}
                  />
                ))}
              </div>
            </>
          ) : (
            <UpdateLog
              client={openClient}
              updates={openClient.updates}
              onClose={() => setOpenClientId(null)}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <span>© 2025–2026 <strong>CodeMeshFlow</strong>. All rights reserved.</span>
          <span className={styles.footerSep}>·</span>
          <span>Confidential — Internal Use Only</span>
        </div>
      </footer>
    </div>
  );
}
