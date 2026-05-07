"use client";
import { useState } from "react";
import styles from "./ValidationTable.module.scss";

type ValidationStatus = "validated" | "incomplete" | "needs-review";

interface BidderRow {
  id: string;
  name: string;
  docsDetected: number;
  requiredMatch: number;
  totalRequired: number;
  missing: string[];
  status: ValidationStatus;
  confidence: number;
}

const MOCK: BidderRow[] = [
  { id: "1", name: "Apex Constructions Ltd.", docsDetected: 8, requiredMatch: 8, totalRequired: 8, missing: [], status: "validated", confidence: 94 },
  { id: "2", name: "BuildRight Pvt. Ltd.", docsDetected: 6, requiredMatch: 5, totalRequired: 8, missing: ["ISO Certificate", "Audited Balance Sheet", "Work Completion Certificate"], status: "incomplete", confidence: 71 },
  { id: "3", name: "Horizon Infrastructure", docsDetected: 7, requiredMatch: 7, totalRequired: 8, missing: ["EMD Receipt"], status: "needs-review", confidence: 62 },
];

export default function ValidationTable() {
  const [selected, setSelected] = useState<BidderRow | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <span className={styles.title}>Submission Validation</span>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Bidder Name</th>
              <th>Docs Detected</th>
              <th>Required Match</th>
              <th>Missing Items</th>
              <th>Status</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {MOCK.map((row) => (
              <tr key={row.id} className={styles.row} onClick={() => setSelected(row)}>
                <td className={styles.bidderName}>{row.name}</td>
                <td>{row.docsDetected}</td>
                <td>{row.requiredMatch}/{row.totalRequired}</td>
                <td>
                  {row.missing.length === 0
                    ? <span className={styles.none}>—</span>
                    : <span className={styles.missingCount}>{row.missing.length} item{row.missing.length > 1 ? "s" : ""}</span>
                  }
                </td>
                <td>
                  <span className={`${styles.statusBadge} ${styles[row.status]}`}>
                    {row.status === "validated" && "✓ Validated"}
                    {row.status === "incomplete" && "✕ Incomplete"}
                    {row.status === "needs-review" && "⚠ Needs Review"}
                  </span>
                </td>
                <td>
                  <span className={`${styles.confidence} ${row.confidence >= 85 ? styles.high : row.confidence >= 70 ? styles.medium : styles.low}`}>
                    {row.confidence}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span>{selected.name}</span>
            <button onClick={() => setSelected(null)}>✕</button>
          </div>
          <div className={styles.panelBody}>
            {selected.missing.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionTitle}>Missing Documents</div>
                {selected.missing.map((m, i) => (
                  <div key={i} className={styles.missingItem}>✕ {m}</div>
                ))}
              </div>
            )}
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Confidence</div>
              <div className={styles.confRow}>
                <span>OCR Confidence</span>
                <span>{selected.confidence}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
