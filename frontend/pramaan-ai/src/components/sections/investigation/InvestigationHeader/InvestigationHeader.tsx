import Link from "next/link";
import styles from "./InvestigationHeader.module.scss";

export default function InvestigationHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Link href="/evaluation" className={styles.back}>← Back to Evaluation Dashboard</Link>
        <div className={styles.identity}>
          <h1 className={styles.bidderName}>Horizon Infrastructure Pvt. Ltd.</h1>
          <span className={styles.ids}>Bidder ID: BID-2024-003 · Submission: SUB-0047</span>
        </div>
      </div>
      <div className={styles.right}>
        <span className={`${styles.statusBadge} ${styles.review}`}>⚠ Needs Review</span>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>7</span>
            <span className={styles.statLabel}>Passed</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={`${styles.statNum} ${styles.red}`}>1</span>
            <span className={styles.statLabel}>Failed</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={`${styles.statNum} ${styles.amber}`}>2</span>
            <span className={styles.statLabel}>Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
}
