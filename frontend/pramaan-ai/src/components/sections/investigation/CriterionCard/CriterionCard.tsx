"use client";
import { useState } from "react";
import styles from "./CriterionCard.module.scss";

type Status = "eligible" | "not-eligible" | "needs-review";

interface Props {
  name: string;
  requirement: string;
  status: Status;
  confidence: "High" | "Medium" | "Low";
  extractedValue: string;
  document: string;
  page: string;
  reasoning: string[];
  ocrConf: number;
  extractConf: number;
  matchConf: number;
  onViewDoc?: () => void;
}

export default function CriterionCard(props: Props) {
  const { name, requirement, status, confidence, extractedValue, document, page, reasoning, ocrConf, extractConf, matchConf, onViewDoc } = props;
  const [override, setOverride] = useState<Status | "">("");
  const [rationale, setRationale] = useState("");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const effective = (override || status) as Status;

  function save() {
    if (!rationale.trim()) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const statusLabel = { eligible: "✓ Eligible", "not-eligible": "✕ Not Eligible", "needs-review": "⚠ Needs Review" };

  return (
    <div className={`${styles.card} ${styles[effective]}`}>

      {/* A. Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.name}>{name}</span>
          <code className={styles.req}>{requirement}</code>
        </div>
        <div className={styles.headerRight}>
          <span className={`${styles.statusBadge} ${styles[effective]}`}>{statusLabel[effective]}</span>
          <span className={`${styles.confBadge} ${styles[confidence.toLowerCase()]}`}>{confidence} conf.</span>
        </div>
      </div>

      {/* B. Extracted Evidence */}
      <div className={styles.row}>
        <div className={styles.rowLabel}>Extracted Evidence</div>
        <div className={styles.evidenceVal}>{extractedValue}</div>
      </div>

      {/* C. Source Reference */}
      <div className={styles.row}>
        <div className={styles.rowLabel}>Source Reference</div>
        <div className={styles.sourceRow}>
          <span className={styles.docName}>📄 {document}</span>
          {page !== "—" && <span className={styles.pageTag}>p.{page}</span>}
          {document !== "—" && (
            <button className={styles.viewBtn} onClick={onViewDoc}>View →</button>
          )}
        </div>
      </div>

      {/* D. Reasoning Trail */}
      <div className={styles.row}>
        <div className={styles.rowLabel}>Automated Reasoning Trail</div>
        <div className={styles.trail}>
          {reasoning.map((step, i) => (
            <div key={i} className={styles.trailStep}>
              <div className={styles.trailDot}>
                <span className={styles.trailNum}>{i + 1}</span>
                {i < reasoning.length - 1 && <div className={styles.trailLine} />}
              </div>
              <span className={`${styles.trailText} ${i === reasoning.length - 1 ? styles.trailFinal : ""}`}>{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* E. Confidence Breakdown */}
      <div className={styles.row}>
        <div className={styles.rowLabel}>Confidence Breakdown</div>
        <div className={styles.confBars}>
          <ConfBar label="OCR" value={ocrConf} />
          <ConfBar label="Extraction" value={extractConf} />
          <ConfBar label="Matching" value={matchConf} />
        </div>
      </div>

      {/* F. Officer Action */}
      <div className={styles.actionPanel}>
        <div className={styles.rowLabel}>Officer Action</div>
        <select
          className={`${styles.overrideSelect} ${override ? styles[override] : ""}`}
          value={override}
          onChange={(e) => { setOverride(e.target.value as Status | ""); setSaved(false); }}
        >
          <option value="">— Override Decision —</option>
          <option value="eligible">Mark Eligible</option>
          <option value="not-eligible">Mark Not Eligible</option>
          <option value="needs-review">Mark Needs Review</option>
        </select>

        {override && (
          <div className={styles.overrideFields}>
            <textarea
              className={styles.textarea}
              placeholder="Rationale for override (required)"
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              rows={2}
            />
            <textarea
              className={`${styles.textarea} ${styles.optional}`}
              placeholder="Verification notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
            <button className={`${styles.saveBtn} ${saved ? styles.savedBtn : ""}`} onClick={save} disabled={!rationale.trim()}>
              {saved ? "✓ Override Saved" : "Save Override"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ConfBar({ label, value }: { label: string; value: number }) {
  const color = value >= 80 ? "#16a34a" : value >= 60 ? "#d97706" : value === 0 ? "#9ca3af" : "#dc2626";
  return (
    <div className={styles.confBarRow}>
      <span className={styles.confBarLabel}>{label}</span>
      <div className={styles.confBarTrack}>
        <div className={styles.confBarFill} style={{ width: `${value}%`, background: color }} />
      </div>
      <span className={styles.confBarVal} style={{ color }}>{value > 0 ? `${value}%` : "N/A"}</span>
    </div>
  );
}
