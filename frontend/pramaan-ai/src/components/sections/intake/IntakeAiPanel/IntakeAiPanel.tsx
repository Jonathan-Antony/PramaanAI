import type { ParseResponse } from "@/types/parse";
import styles from "./IntakeAiPanel.module.scss";

interface Props {
  active: boolean;
  parseResult?: ParseResponse | null;
}

export default function IntakeAiPanel({ active, parseResult }: Props) {
  if (!active || !parseResult) {
    return (
      <div className={styles.panel}>
        <div className={styles.panelTitle}>PramaanAI Analysis</div>
        <div className={styles.idle}>Upload a tender document to begin AI analysis</div>
      </div>
    );
  }

  const { ai_analysis } = parseResult;
  const { criteria, classification_summary, overall_extraction_confidence } = ai_analysis;
  const confidencePct = Math.round(overall_extraction_confidence * 100);
  const confLevel = confidencePct >= 85 ? "high" : confidencePct >= 70 ? "medium" : "low";

  const allMandatory = [
    ...(criteria.mandatory.financial ?? []).map((t) => ({ text: t, type: "Financial" as const })),
    ...(criteria.mandatory.technical ?? []).map((t) => ({ text: t, type: "Technical" as const })),
    ...(criteria.mandatory.compliance ?? []).map((t) => ({ text: t, type: "Compliance" as const })),
  ];

  const allOptional = [
    ...(criteria.optional.financial ?? []).map((t) => ({ text: t, type: "Financial" as const })),
    ...(criteria.optional.technical ?? []).map((t) => ({ text: t, type: "Technical" as const })),
    ...(criteria.optional.compliance ?? []).map((t) => ({ text: t, type: "Compliance" as const })),
  ];

  return (
    <div className={styles.panel}>
      <div className={styles.panelTitle}>PramaanAI Analysis</div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Tender Understanding</div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Document</span>
          <span className={styles.value}>{parseResult.filename}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Pages</span>
          <span className={styles.value}>{parseResult.pages}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Confidence</span>
          <span className={`${styles.confBadge} ${styles[confLevel]}`}>
            {confLevel.charAt(0).toUpperCase() + confLevel.slice(1)} — {confidencePct}%
          </span>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Extracted Eligibility Criteria</div>
        <div className={styles.criteriaList}>
          {allMandatory.map((c, i) => (
            <div key={i} className={styles.criterionItem}>
              <div className={styles.criterionTop}>
                <span className={styles.mandatoryDot} title="Mandatory" />
                <span className={styles.criterionText}>{c.text}</span>
              </div>
              <div className={styles.criterionMeta}>
                <span className={`${styles.typeTag} ${styles[c.type.toLowerCase()]}`}>{c.type}</span>
                <span className={styles.confSmall}>Mandatory</span>
              </div>
            </div>
          ))}
          {allOptional.map((c, i) => (
            <div key={`opt-${i}`} className={styles.criterionItem}>
              <div className={styles.criterionTop}>
                <span className={styles.criterionText}>{c.text}</span>
              </div>
              <div className={styles.criterionMeta}>
                <span className={`${styles.typeTag} ${styles[c.type.toLowerCase()]}`}>{c.type}</span>
                <span className={styles.confSmall}>Optional</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          Mandatory Clauses
          <span className={styles.count}>{allMandatory.length}</span>
        </div>
        {allMandatory.map((c, i) => (
          <div key={i} className={styles.mandatoryItem}>
            <span className={styles.mandatoryDot} />
            <span>{c.text}</span>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Classification Summary</div>
        {Object.entries(classification_summary).map(([key, val]) => (
          <div key={key} className={styles.infoRow}>
            <span className={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
            <span className={styles.value}>{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
