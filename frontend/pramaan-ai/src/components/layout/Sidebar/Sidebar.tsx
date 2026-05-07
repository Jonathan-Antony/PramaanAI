'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, ClipboardCheck, Search, CheckCircle, BarChart3, Home } from 'lucide-react';
import styles from './Sidebar.module.scss';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/intake', label: 'Intake & Setup', icon: FileText },
  { href: '/evaluation', label: 'Cross-Bidder Evaluation', icon: ClipboardCheck },
  { href: '/investigation', label: 'Bidder Investigation', icon: Search },
  { href: '/closure', label: 'Evaluation Closure', icon: CheckCircle },
  { href: '/reports', label: 'Reports', icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`${styles.sidebar} ${expanded ? styles.expanded : ''}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className={styles.logo}>
        <div className={styles.badge}>AI</div>
        <span className={styles.logoText}>PramaanAI</span>
      </div>

      <nav className={styles.nav}>
        <div className={styles.sectionTitle}>Evaluation Workflow</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              title={!expanded ? item.label : undefined}
            >
              <Icon />
              <span className={styles.label}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <div className={styles.user}>
          <div className={styles.avatar}>RK</div>
          <div className={styles.info}>
            <div className={styles.name}>Rajesh Kumar</div>
            <div className={styles.role}>Evaluation Officer</div>
          </div>
        </div>
      </div>
    </div>
  );
}
