import React from 'react';
import styles from './AiPanel.module.scss';

interface AiPanelSection {
  title: string;
  content: React.ReactNode;
}

interface AiPanelProps {
  title?: string;
  sections: AiPanelSection[];
}

export default function AiPanel({ title = 'PramaanAI Summary', sections }: AiPanelProps) {
  return (
    <div className={styles.aiPanel}>
      <div className={styles.header}>
        <div className={styles.badge}>AI</div>
        <h3>{title}</h3>
      </div>
      {sections.map((section, idx) => (
        <div key={idx} className={styles.section}>
          <h4>{section.title}</h4>
          <div className={styles.content}>{section.content}</div>
        </div>
      ))}
    </div>
  );
}
