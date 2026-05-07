"use client";
import type { BidderOutcome } from "@/types/closure";
import styles from "./SummaryCards.module.scss";

interface Props {
  bidders: BidderOutcome[];
  overrideCount: number;
  onFilterStatus: (s: BidderOutcome["status"] | null) => void;
}

export default function SummaryCards({ bidders, overrideCount, onFilterStatus }: Props) {
  const eligible = bidders.filter((b) => b.status === "eligible").length;
  const notEligible = bidders.filter((b) => b.status === "not-eligible").length;
  const review = bidders.filter((b) => b.status === "needs-review").length;
  const approvalsOverridden = 0;
  const rejectionsOverridden = overrideCount;
  const ready = review === 0;

  return (
    <div className={styles.cards}>
      <div className={styles.card} onClick={() => onFilterStatus(null)}>
        <div className={styles.cardValue}>{bidders.length}</div>
        <div className={styles.cardLabel}>Total Bidders</div>
        <div className={styles.cardSub}>Processed successfully</div>
      </div>

      <div className={styles.card}>
        <div className={styles.distRow}>
          <span className={styles.eligible} onClick={() => onFilterStatus("eligible")}>{eligible} Eligible</span>
          <span className={styles.notEligible} onClick={() => onFilterStatus("not-eligible")}>{notEligible} Not Eligible</span>
          <span className={styles.review} onClick={() => onFilterStatus("needs-review")}>{review} Review</span>
        </div>
        <div className={styles.cardLabel}>Eligibility Distribution</div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardValue}>{overrideCount}</div>
        <div className={styles.cardLabel}>Human Overrides</div>
        <div className={styles.cardSub}>{approvalsOverridden} approvals overridden · {rejectionsOverridden} rejections overridden</div>
      </div>

      <div className={`${styles.card} ${ready ? styles.readyCard : styles.blockedCard}`}>
        <div className={`${styles.readinessStatus} ${ready ? styles.readyText : styles.blockedText}`}>
          {ready ? "✓ Ready" : "⚠ Blocked"}
        </div>
        <div className={styles.cardLabel}>Certification Readiness</div>
        {!ready && <div className={styles.cardSub}>{review} bidder{review > 1 ? "s" : ""} still marked for review</div>}
      </div>
    </div>
  );
}
