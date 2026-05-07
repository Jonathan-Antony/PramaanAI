import styles from "./ProcessingTimeline.module.scss";

type StepStatus = "done" | "in-progress" | "blocked" | "pending";

interface Step {
  label: string;
  status: StepStatus;
  timestamp?: string;
}

export default function ProcessingTimeline({ steps }: { steps: Step[] }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Processing Status</div>
      <div className={styles.steps}>
        {steps.map((step, i) => (
          <div key={i} className={`${styles.step} ${styles[step.status]}`}>
            <div className={styles.indicator}>
              <div className={styles.dot}>
                {step.status === "done" && "✓"}
                {step.status === "in-progress" && "…"}
                {step.status === "blocked" && "✕"}
              </div>
              {i < steps.length - 1 && <div className={styles.line} />}
            </div>
            <div className={styles.info}>
              <span className={styles.label}>{step.label}</span>
              {step.timestamp && <span className={styles.time}>{step.timestamp}</span>}
              {!step.timestamp && step.status === "pending" && (
                <span className={styles.time}>Waiting</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
