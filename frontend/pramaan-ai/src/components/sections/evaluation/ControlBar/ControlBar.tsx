"use client";
import { useState } from "react";
import styles from "./ControlBar.module.scss";

interface Props {
  onSearch: (v: string) => void;
  onStatusFilter: (v: string) => void;
  onHighlight: (v: boolean) => void;
}

export default function ControlBar({ onSearch, onStatusFilter, onHighlight }: Props) {
  const [highlight, setHighlight] = useState(false);

  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        <input
          className={styles.search}
          placeholder="Search bidders…"
          onChange={(e) => onSearch(e.target.value)}
        />
        <select className={styles.select} onChange={(e) => onStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="eligible">Eligible</option>
          <option value="not-eligible">Not Eligible</option>
          <option value="review">Needs Review</option>
        </select>
        <select className={styles.select}>
          <option value="">All Criteria Types</option>
          <option value="financial">Financial</option>
          <option value="technical">Technical</option>
          <option value="compliance">Compliance</option>
        </select>
        <select className={styles.select}>
          <option value="">All Confidence</option>
          <option value="high">High Confidence</option>
          <option value="low">Low Confidence</option>
        </select>
      </div>
      <div className={styles.right}>
        <select className={styles.select}>
          <option>Sort: Failed Criteria</option>
          <option>Sort: Review Flags</option>
          <option>Sort: Alphabetical</option>
        </select>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={highlight}
            onChange={(e) => { setHighlight(e.target.checked); onHighlight(e.target.checked); }}
          />
          <span>Highlight problematic only</span>
        </label>
      </div>
    </div>
  );
}
