import Link from "next/link";
import styles from "./EvalAiPanel.module.scss";

const FLAGGED = [
  { name: "Sigma Builders", reason: "2 criteria failed, 3 ambiguous extractions", priority: "High" },
  { name: "Horizon Infra", reason: "Close to eligibility threshold on turnover", priority: "Medium" },
  { name: "BuildRight Pvt.", reason: "Missing ISO certificate", priority: "High" },
];

const AMBIGUITIES = [
  "OCR confidence below threshold in 4 bidders",
  "Inconsistent formatting in turnover documents",
  "Missing ISO certificates in 2 submissions",
  "Conflicting turnover values in Horizon Infra",
];

export default function EvalAiPanel() {
  return (
    <div className={styles.panel}>
      <div className={styles.panelTitle}>PramaanAI Analysis</div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Flagged Bidders</div>
        {FLAGGED.map((b, i) => (
          <Link key={i} href="/investigation" className={styles.flaggedItem}>
            <div className={styles.flaggedTop}>
              <span className={styles.flaggedName}>{b.name}</span>
              <span className={`${styles.priorityTag} ${styles[b.priority.toLowerCase()]}`}>{b.priority}</span>
            </div>
            <div className={styles.flaggedReason}>{b.reason}</div>
          </Link>
        ))}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Review Priority</div>
        <div className={styles.priorityItem}>
          <span className={styles.rank}>1</span>
          <div>
            <div className={styles.priorityName}>Sigma Builders</div>
            <div className={styles.priorityReason}>Highest ambiguity in financial documents</div>
          </div>
        </div>
        <div className={styles.priorityItem}>
          <span className={styles.rank}>2</span>
          <div>
            <div className={styles.priorityName}>Horizon Infra</div>
            <div className={styles.priorityReason}>Close to eligibility threshold on turnover</div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Detected Ambiguities</div>
        {AMBIGUITIES.map((a, i) => (
          <div key={i} className={styles.ambiguityItem}>
            <span className={styles.ambiguityDot} />
            <span>{a}</span>
          </div>
        ))}
      </div>

      <div className={styles.recommendation}>
        <div className={styles.recTitle}>Suggested Next Action</div>
        <div className={styles.recText}>
          Review Sigma Builders due to borderline eligibility on turnover and 3 ambiguous extractions.
        </div>
      </div>
    </div>
  );
}
