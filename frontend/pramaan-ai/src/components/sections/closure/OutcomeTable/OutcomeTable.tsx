"use client";
import { useState } from "react";
import type { BidderOutcome } from "@/types/closure";
import styles from "./OutcomeTable.module.scss";

const STATUS_ORDER = { "needs-review": 0, "not-eligible": 1, eligible: 2 };

interface Props {
  bidders: BidderOutcome[];
  statusFilter: BidderOutcome["status"] | null;
}

export default function OutcomeTable({ bidders, statusFilter }: Props) {
  const [selected, setSelected] = useState<BidderOutcome | null>(null);

  const sorted = [...bidders]
    .filter((b) => !statusFilter || b.status === statusFilter)
    .sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.title}>Final Bidder Outcomes</span>
        {statusFilter && <span className={styles.filterTag}>Filtered: {statusFilter} <button onClick={() => {}}>✕</button></span>}
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Bidder Name</th>
            <th>Final Status</th>
            <th>Criteria Passed</th>
            <th>Overrides</th>
            <th>Flags</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((b) => (
            <tr key={b.id} className={styles.row} onClick={() => setSelected(b === selected ? null : b)}>
              <td className={styles.name}>{b.name}</td>
              <td>
                <span className={`${styles.statusBadge} ${styles[b.status]}`}>
                  {b.status === "eligible" && "✓ Eligible"}
                  {b.status === "not-eligible" && "✕ Not Eligible"}
                  {b.status === "needs-review" && "⚠ Needs Review"}
                </span>
              </td>
              <td>{b.criteriaPassed}/{b.criteriaTotal}</td>
              <td>{b.overrides > 0 ? <span className={styles.overrideTag}>{b.overrides} override{b.overrides > 1 ? "s" : ""}</span> : "—"}</td>
              <td>{b.flags.length > 0 ? <span className={styles.flagText}>{b.flags[0]}{b.flags.length > 1 ? ` +${b.flags.length - 1}` : ""}</span> : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span>{selected.name}</span>
            <button onClick={() => setSelected(null)}>✕</button>
          </div>
          <div className={styles.panelBody}>
            {selected.criteriaBreakdown.map((c, i) => (
              <div key={i} className={styles.criterionRow}>
                <span className={`${styles.criterionResult} ${styles[c.result]}`}>
                  {c.result === "pass" ? "✓" : c.result === "fail" ? "✕" : "↺"}
                </span>
                <div>
                  <div className={styles.criterionName}>{c.criterion}</div>
                  {c.note && <div className={styles.criterionNote}>{c.note}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
