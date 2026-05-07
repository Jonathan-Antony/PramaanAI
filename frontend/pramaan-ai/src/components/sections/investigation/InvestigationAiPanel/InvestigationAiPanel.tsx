import styles from "./InvestigationAiPanel.module.scss";

export default function InvestigationAiPanel() {
  return (
    <aside className={styles.panel}>
      <div className={styles.title}>PramaanAI Advisory</div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Active Ambiguity</div>
        <div className={`${styles.item} ${styles.warn}`}>
          <span className={styles.icon}>⚠</span>
          <span>Turnover value unclear — low OCR confidence (62%). Multiple figures on page 4.</span>
        </div>
        <div className={`${styles.item} ${styles.warn}`}>
          <span className={styles.icon}>⚠</span>
          <span>Conflicting values: ₹4.9 Cr and ₹5.1 Cr found in same document.</span>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Recommended Action</div>
        <div className={styles.recommendation}>
          Verify manually from original scanned document. Mark as Needs Review if uncertainty persists.
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Override Acknowledgment</div>
        <div className={styles.overrideRow}>
          <span className={styles.overrideLabel}>AI Decision</span>
          <span className={`${styles.badge} ${styles.review}`}>Needs Review</span>
        </div>
        <div className={styles.overrideRow}>
          <span className={styles.overrideLabel}>Officer Decision</span>
          <span className={styles.none}>No override yet</span>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Audit Confirmation</div>
        <div className={styles.auditRow}>
          <span>🔒</span>
          <span>All actions on this bidder are being recorded.</span>
        </div>
        <div className={styles.auditCount}>6 actions recorded</div>
      </div>
    </aside>
  );
}
