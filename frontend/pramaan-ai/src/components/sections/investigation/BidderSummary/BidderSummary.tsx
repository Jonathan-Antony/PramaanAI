import styles from "./BidderSummary.module.scss";

const FLAGS = [
  { type: "warn", text: "Low OCR confidence on Balance Sheet (62%)", target: "Minimum Annual Turnover" },
  { type: "warn", text: "Conflicting turnover values detected", target: "Minimum Annual Turnover" },
  { type: "error", text: "EMD Receipt missing", target: "EMD Receipt" },
];

export default function BidderSummary() {
  return (
    <aside className={styles.panel}>
      <div className={styles.panelTitle}>Bidder Summary</div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Overview</div>
        <div className={styles.field}><span>Company</span><strong>Horizon Infrastructure</strong></div>
        <div className={styles.field}><span>Submitted</span><strong>12 Mar 2024</strong></div>
        <div className={styles.field}><span>Documents</span><strong>7 files</strong></div>
        <div className={styles.field}><span>Types</span><strong>PDF, Scanned</strong></div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Evaluation Snapshot</div>
        <div className={styles.snapRow}>
          <span>Financial</span>
          <span className={`${styles.snap} ${styles.review}`}>Review</span>
        </div>
        <div className={styles.snapRow}>
          <span>Technical</span>
          <span className={`${styles.snap} ${styles.pass}`}>Pass</span>
        </div>
        <div className={styles.snapRow}>
          <span>Compliance</span>
          <span className={`${styles.snap} ${styles.fail}`}>Fail</span>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Quick Flags <span className={styles.flagCount}>{FLAGS.length}</span></div>
        {FLAGS.map((f, i) => (
          <div key={i} className={`${styles.flag} ${styles[f.type]}`}>
            <span className={styles.flagIcon}>{f.type === "error" ? "✕" : "⚠"}</span>
            <span>{f.text}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
