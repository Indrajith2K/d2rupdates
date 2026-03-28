import React from 'react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logoWrap}>
            <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="28" height="28" rx="8" fill="#007aff"/>
              <path d="M14 6l2.5 4.5H20l-3 3 1.5 4.5L14 15.5 10.5 18 12 13.5l-3-3h3.5L14 6z"
                fill="white" opacity="0.9"/>
            </svg>
          </div>
          <span className={styles.brandName}>CodeMeshFlow</span>
          <div className={styles.sep} />
          <span className={styles.productLabel}>Client Portal</span>
        </div>

        {/* Right */}
        <div className={styles.right}>
          <div className={styles.livePill}>
            <span className={styles.liveDot} />
            Live
          </div>
          <div className={styles.avatar} title="CodeMeshFlow">CM</div>
        </div>
      </div>
    </header>
  );
}
