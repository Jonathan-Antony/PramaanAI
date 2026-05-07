import React from 'react';
import styles from './Card.module.scss';

interface CardProps {
  title?: string;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  hoverable?: boolean;
  compact?: boolean;
}

export default function Card({ title, actions, footer, children, hoverable, compact }: CardProps) {
  return (
    <div className={`${styles.card} ${hoverable ? styles.hoverable : ''} ${compact ? styles.compact : ''}`}>
      {title && (
        <div className={styles.cardHeader}>
          <h3>{title}</h3>
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      )}
      <div className={styles.cardBody}>{children}</div>
      {footer && <div className={styles.cardFooter}>{footer}</div>}
    </div>
  );
}
