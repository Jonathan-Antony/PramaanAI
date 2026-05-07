"use client";
import { useState } from "react";
import type { OverrideEntry } from "@/types/closure";
import styles from "./OverrideRegister.module.scss";

export default function OverrideRegister({ overrides }: { overrides: OverrideEntry[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.title}>Override Register</span>
        <span className={styles.count}>{overrides.length} override{overrides.length !== 1 ? "s" : ""}</span>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Bidder</th>
            <th>Criterion</th>
            <th>Original</th>
            <th>Overridden To</th>
            <th>Justification</th>
            <th>Officer</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {overrides.map((o) => (
            <>
              <tr key={o.id} className={styles.row} onClick={() => setExpanded(expanded === o.id ? null : o.id)}>
                <td className={styles.bidder}>{o.bidder}</td>
                <td>{o.criterion}</td>
                <td><span className={`${styles.decision} ${styles[o.original]}`}>{o.original === "pass" ? "Pass" : "Fail"}</span></td>
                <td><span className={`${styles.decision} ${styles[o.overridden]}`}>{o.overridden === "pass" ? "Pass" : "Fail"}</span></td>
                <td className={styles.justPreview}>{o.justification.slice(0, 60)}…</td>
                <td className={styles.officer}>{o.officerId}</td>
                <td className={styles.ts}>{o.timestamp}</td>
              </tr>
              {expanded === o.id && (
                <tr key={`${o.id}-exp`} className={styles.expandedRow}>
                  <td colSpan={7}>
                    <div className={styles.expandedContent}>
                      <div className={styles.expandedLabel}>Full Justification</div>
                      <div className={styles.expandedText}>{o.justification}</div>
                      <div className={styles.comparison}>
                        <div className={styles.compItem}>
                          <span className={styles.compLabel}>Before</span>
                          <span className={`${styles.decision} ${styles[o.original]}`}>{o.original === "pass" ? "Pass" : "Fail"}</span>
                        </div>
                        <span className={styles.arrow}>→</span>
                        <div className={styles.compItem}>
                          <span className={styles.compLabel}>After</span>
                          <span className={`${styles.decision} ${styles[o.overridden]}`}>{o.overridden === "pass" ? "Pass" : "Fail"}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
