import styles from "./EvalHeader.module.scss";

export default function EvalHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.tenderName}>Construction of NH-48 Bypass — Package 3</h1>
        <div className={styles.meta}>
          <span>Total Bidders: <strong>5</strong></span>
          <span className={styles.sep}>·</span>
          <span>Total Criteria: <strong>12</strong></span>
          <span className={styles.sep}>·</span>
          <span>Status: <strong>Partially Reviewed</strong></span>
        </div>
      </div>
      <div className={styles.right}>
        <span className={`${styles.badge} ${styles.eligible}`}>Eligible: 2</span>
        <span className={`${styles.badge} ${styles.notEligible}`}>Not Eligible: 1</span>
        <span className={`${styles.badge} ${styles.review}`}>Needs Review: 2</span>
      </div>
    </div>
  );
}
