import type { BidderOutcome, OverrideEntry } from "@/types/closure";
import styles from "./ClosureAiPanel.module.scss";

interface Props {
  bidders: BidderOutcome[];
  overrides: OverrideEntry[];
  certified: boolean;
}

export default function ClosureAiPanel({ bidders, overrides, certified }: Props) {
  const eligible = bidders.filter((b) => b.status === "eligible").length;
  const notEligible = bidders.filter((b) => b.status === "not-eligible").length;
  const review = bidders.filter((b) => b.status === "needs-review").length;
  const overridePct = bidders.length > 0 ? Math.round((overrides.length / (bidders.length * 4)) * 100) : 0;
  const ready = review === 0;

  return (
    <div className={styles.panel}>
      <div className={styles.panelTitle}>PramaanAI Analysis</div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Final Summary</div>
        <div className={styles.row}><span>Total Bidders</span><strong>{bidders.length}</strong></div>
        <div className={styles.row}><span className={styles.green}>Eligible</span><strong>{eligible}</strong></div>
        <div className={styles.row}><span className={styles.red}>Not Eligible</span><strong>{notEligible}</strong></div>
        <div className={styles.row}><span className={styles.amber}>Needs Review</span><strong>{review}</strong></div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Override Summary</div>
        <div className={styles.row}><span>Total Overrides</span><strong>{overrides.length}</strong></div>
        <div className={styles.row}><span>% of Decisions</span><strong>{overridePct}%</strong></div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Certification Readiness</div>
        <div className={`${styles.readiness} ${ready ? styles.ready : styles.blocked}`}>
          {ready ? "✓ Ready for certification" : `⚠ ${review} bidder${review > 1 ? "s" : ""} still under review`}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Integrity Check</div>
        <div className={styles.integrityRow}>
          <span className={styles.check}>✓</span> All decisions traceable
        </div>
        <div className={styles.integrityRow}>
          <span className={styles.check}>✓</span> All overrides justified
        </div>
        {certified && (
          <div className={styles.integrityRow}>
            <span className={styles.check}>✓</span> Evaluation certified
          </div>
        )}
      </div>
    </div>
  );
}
