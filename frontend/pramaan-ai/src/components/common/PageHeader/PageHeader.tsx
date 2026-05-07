import React from 'react';
import styles from './PageHeader.module.scss';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  meta?: Array<{ label: string; value: string }>;
  actions?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, meta, actions }: PageHeaderProps) {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.headerContent}>
        <div className={styles.headerLeft}>
          <h1>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {meta && meta.length > 0 && (
            <div className={styles.meta}>
              {meta.map((item, idx) => (
                <span key={idx} className={styles.metaItem}>
                  {item.label}: <span>{item.value}</span>
                </span>
              ))}
            </div>
          )}
        </div>
        {actions && <div className={styles.headerRight}>{actions}</div>}
      </div>
    </div>
  );
}
