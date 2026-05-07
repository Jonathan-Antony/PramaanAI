import styles from "./ReadinessBanner.module.scss";

type ReadinessState = "not-ready" | "partial" | "ready";

interface Props {
  state: ReadinessState;
  reason?: string;
  onProceed?: () => void;
}

export default function ReadinessBanner({ state, reason, onProceed }: Props) {
  return (
    <div className={`${styles.banner} ${styles[state]}`}>
      <div className={styles.content}>
        <div className={styles.icon}>
          {state === "ready" && "✓"}
          {state === "partial" && "⚠"}
          {state === "not-ready" && "✕"}
        </div>
        <div className={styles.text}>
          {state === "not-ready" && (
            <>
              <span className={styles.heading}>Evaluation cannot begin</span>
              {reason && <span className={styles.reason}>{reason}</span>}
            </>
          )}
          {state === "partial" && (
            <>
              <span className={styles.heading}>Some bidders require review before proceeding</span>
              {reason && <span className={styles.reason}>{reason}</span>}
            </>
          )}
          {state === "ready" && (
            <span className={styles.heading}>All submissions validated. Ready to begin evaluation.</span>
          )}
        </div>
      </div>
      <a href="/evaluation">
        <button
          className={styles.proceedBtn}
          disabled={state === "not-ready"}
          onClick={onProceed}
        >
          Proceed to Evaluation Dashboard →
        </button>
      </a>
    </div>
  );
}
