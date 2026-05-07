"use client";
import { useState, Fragment } from "react";
import Link from "next/link";
import styles from "./EvaluationMatrix.module.scss";

type CellStatus = "eligible" | "not-eligible" | "review" | "missing" | "failed";

interface Cell {
  status: CellStatus;
  value?: string;
  reason?: string;
  confidence?: number;
  source?: string;
}

interface Criterion {
  name: string;
  type: "Financial" | "Technical" | "Compliance";
  threshold?: string;
  cells: Cell[];
}

interface Bidder {
  name: string;
  status: "eligible" | "not-eligible" | "review";
  failed: number;
  flags: number;
}

const BIDDERS: Bidder[] = [
  { name: "Apex Constructions", status: "eligible", failed: 0, flags: 0 },
  { name: "BuildRight Pvt.", status: "not-eligible", failed: 3, flags: 1 },
  { name: "Horizon Infra", status: "review", failed: 1, flags: 2 },
  { name: "Delta Works", status: "eligible", failed: 0, flags: 1 },
  { name: "Sigma Builders", status: "review", failed: 2, flags: 3 },
];

const CRITERIA: Criterion[] = [
  {
    name: "Annual Turnover", type: "Financial", threshold: "≥ ₹5 Cr",
    cells: [
      { status: "eligible", value: "₹6.2 Cr", confidence: 95, source: "Balance Sheet p.4" },
      { status: "not-eligible", value: "₹3.1 Cr", reason: "Below threshold", confidence: 88, source: "Balance Sheet p.3" },
      { status: "review", value: "₹4.9 Cr", reason: "Low OCR confidence", confidence: 61, source: "Balance Sheet p.5" },
      { status: "eligible", value: "₹7.4 Cr", confidence: 97, source: "Balance Sheet p.2" },
      { status: "not-eligible", value: "₹2.8 Cr", reason: "Below threshold", confidence: 82, source: "Balance Sheet p.6" },
    ],
  },
  {
    name: "Net Worth", type: "Financial", threshold: "≥ ₹2 Cr",
    cells: [
      { status: "eligible", value: "₹3.1 Cr", confidence: 92 },
      { status: "not-eligible", value: "₹1.2 Cr", reason: "Below threshold", confidence: 85 },
      { status: "eligible", value: "₹2.4 Cr", confidence: 78 },
      { status: "eligible", value: "₹4.0 Cr", confidence: 94 },
      { status: "review", value: "₹1.9 Cr", reason: "Ambiguous wording", confidence: 58 },
    ],
  },
  {
    name: "Years of Experience", type: "Technical", threshold: "≥ 5 years",
    cells: [
      { status: "eligible", value: "12 years", confidence: 96 },
      { status: "eligible", value: "7 years", confidence: 90 },
      { status: "not-eligible", value: "3 years", reason: "Below threshold", confidence: 88 },
      { status: "eligible", value: "9 years", confidence: 93 },
      { status: "review", reason: "Conflicting values detected", confidence: 55 },
    ],
  },
  {
    name: "Similar Project Completion", type: "Technical", threshold: "≥ 2 projects",
    cells: [
      { status: "eligible", value: "4 projects", confidence: 91 },
      { status: "eligible", value: "3 projects", confidence: 87 },
      { status: "eligible", value: "2 projects", confidence: 80 },
      { status: "eligible", value: "5 projects", confidence: 95 },
      { status: "missing" },
    ],
  },
  {
    name: "ISO 9001:2015 Certificate", type: "Compliance",
    cells: [
      { status: "eligible", value: "Valid till 2026", confidence: 98 },
      { status: "missing" },
      { status: "eligible", value: "Valid till 2025", confidence: 94 },
      { status: "eligible", value: "Valid till 2027", confidence: 97 },
      { status: "review", reason: "Expiry date unclear", confidence: 63 },
    ],
  },
  {
    name: "CPWD Registration", type: "Compliance",
    cells: [
      { status: "eligible", confidence: 96 },
      { status: "eligible", confidence: 91 },
      { status: "failed" },
      { status: "eligible", confidence: 94 },
      { status: "eligible", confidence: 89 },
    ],
  },
];

const GROUPS = ["Financial", "Technical", "Compliance"] as const;

interface CellDetail {
  criterion: Criterion;
  cell: Cell;
  bidder: Bidder;
}

export default function EvaluationMatrix({ searchQuery, statusFilter, highlightProblematic }: {
  searchQuery: string;
  statusFilter: string;
  highlightProblematic: boolean;
}) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [detail, setDetail] = useState<CellDetail | null>(null);
  const [tooltip, setTooltip] = useState<{ cell: Cell; x: number; y: number } | null>(null);

  const filteredBidders = BIDDERS.filter((b) => {
    if (searchQuery && !b.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (statusFilter && b.status !== statusFilter) return false;
    return true;
  });

  const bidderIndices = filteredBidders.map((b) => BIDDERS.indexOf(b));

  function toggleGroup(g: string) {
    setCollapsed((prev) => ({ ...prev, [g]: !prev[g] }));
  }

  function toggleRow(name: string) {
    setExpandedRows((prev) => ({ ...prev, [name]: !prev[name] }));
  }

  const cellIcon: Record<CellStatus, string> = {
    eligible: "✓",
    "not-eligible": "✕",
    review: "⚠",
    missing: "—",
    failed: "✕",
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={`${styles.th} ${styles.stickyCol} ${styles.criteriaCol}`}>Criterion</th>
              {filteredBidders.map((b, i) => (
                <th key={i} className={`${styles.th} ${styles.bidderTh}`}>
                  <Link href="/investigation" className={styles.bidderName}>{b.name}</Link>
                  <span className={`${styles.bidderBadge} ${styles[b.status]}`}>
                    {b.status === "eligible" ? "Eligible" : b.status === "not-eligible" ? "Not Eligible" : "Review"}
                  </span>
                  <div className={styles.bidderMeta}>
                    {b.failed > 0 && <span className={styles.failedCount}>{b.failed} failed</span>}
                    {b.flags > 0 && <span className={styles.flagCount}>{b.flags} flags</span>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GROUPS.map((group) => {
              const groupCriteria = CRITERIA.filter((c) => c.type === group);
              const isCollapsed = collapsed[group];
              return (
                <Fragment key={group}>
                  {/* Group header row */}
                  <tr key={`group-${group}`} className={styles.groupRow}>
                    <td
                      colSpan={filteredBidders.length + 1}
                      className={styles.groupCell}
                      onClick={() => toggleGroup(group)}
                    >
                      <span className={styles.groupToggle}>{isCollapsed ? "▸" : "▾"}</span>
                      <span className={`${styles.groupLabel} ${styles[group.toLowerCase()]}`}>{group}</span>
                      <span className={styles.groupCount}>{groupCriteria.length} criteria</span>
                    </td>
                  </tr>

                  {!isCollapsed && groupCriteria.map((criterion) => (
                    <Fragment key={criterion.name}>
                      <tr
                        className={`${styles.criterionRow} ${highlightProblematic && !criterion.cells.some(c => c.status === "not-eligible" || c.status === "review") ? styles.dimmed : ""}`}
                      >
                        <td className={`${styles.td} ${styles.stickyCol} ${styles.criterionCell}`}>
                          <div className={styles.criterionName}>
                            <button className={styles.expandRowBtn} onClick={() => toggleRow(criterion.name)}>
                              {expandedRows[criterion.name] ? "▾" : "▸"}
                            </button>
                            {criterion.name}
                          </div>
                          {criterion.threshold && (
                            <div className={styles.threshold}>{criterion.threshold}</div>
                          )}
                        </td>
                        {bidderIndices.map((bi, i) => {
                          const cell = criterion.cells[bi];
                          return (
                            <td
                              key={i}
                              className={`${styles.td} ${styles.cell} ${styles[cell.status]}`}
                              onMouseEnter={(e) => setTooltip({ cell, x: e.clientX, y: e.clientY })}
                              onMouseLeave={() => setTooltip(null)}
                              onClick={() => setDetail({ criterion, cell, bidder: BIDDERS[bi] })}
                            >
                              <span className={styles.cellIcon}>{cellIcon[cell.status]}</span>
                              {cell.value && <span className={styles.cellValue}>{cell.value}</span>}
                              {!cell.value && cell.reason && <span className={styles.cellReason}>{cell.reason}</span>}
                              {cell.status === "missing" && <span className={styles.cellReason}>No data</span>}
                              {cell.status === "failed" && <span className={styles.cellReason}>Extraction failed</span>}
                            </td>
                          );
                        })}
                      </tr>

                      {expandedRows[criterion.name] && (
                        <tr key={`${criterion.name}-expanded`} className={styles.expandedRow}>
                          <td colSpan={filteredBidders.length + 1} className={styles.expandedCell}>
                            <div className={styles.expandedContent}>
                              <span className={styles.expandedLabel}>Threshold:</span>
                              <span>{criterion.threshold || "—"}</span>
                              <span className={styles.expandedLabel}>Type:</span>
                              <span className={`${styles.typeTag} ${styles[criterion.type.toLowerCase()]}`}>{criterion.type}</span>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  ))}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div className={styles.tooltip} style={{ top: tooltip.y + 12, left: tooltip.x + 12 }}>
          {tooltip.cell.value && <div><strong>Value:</strong> {tooltip.cell.value}</div>}
          {tooltip.cell.confidence && <div><strong>Confidence:</strong> {tooltip.cell.confidence}%</div>}
          {tooltip.cell.source && <div><strong>Source:</strong> {tooltip.cell.source}</div>}
          {tooltip.cell.reason && <div><strong>Note:</strong> {tooltip.cell.reason}</div>}
        </div>
      )}

      {/* Detail panel */}
      {detail && (
        <div className={styles.detailPanel}>
          <div className={styles.detailHeader}>
            <span>{detail.criterion.name} — {detail.bidder.name}</span>
            <button onClick={() => setDetail(null)}>✕</button>
          </div>
          <div className={styles.detailBody}>
            <div className={styles.detailRow}><span>Status</span>
              <span className={`${styles.bidderBadge} ${styles[detail.cell.status]}`}>
                {detail.cell.status}
              </span>
            </div>
            {detail.cell.value && <div className={styles.detailRow}><span>Extracted Value</span><strong>{detail.cell.value}</strong></div>}
            {detail.cell.confidence && <div className={styles.detailRow}><span>Confidence</span><strong>{detail.cell.confidence}%</strong></div>}
            {detail.cell.source && <div className={styles.detailRow}><span>Source</span><span>{detail.cell.source}</span></div>}
            {detail.cell.reason && <div className={styles.detailRow}><span>Reason</span><span>{detail.cell.reason}</span></div>}
            <Link href="/investigation" className={styles.investigateLink}>
              Open in Bidder Investigation →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
