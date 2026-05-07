"use client";
import { useState } from "react";
import CriterionCard from "../CriterionCard/CriterionCard";
import styles from "./EvaluationSections.module.scss";

const SECTIONS = [
  {
    label: "Financial Evaluation",
    type: "financial",
    criteria: [
      {
        name: "Minimum Annual Turnover",
        requirement: "≥ ₹5 Crore",
        status: "needs-review" as const,
        confidence: "Low" as const,
        extractedValue: "₹4.9 Crore (FY 2022–23)",
        document: "Balance_Sheet_FY23.pdf",
        page: "4",
        reasoning: [
          "Identified financial statement document",
          "Extracted turnover value: ₹4.9 Crore",
          "Compared against threshold: ₹5 Crore",
          "Result: Below threshold — flagged for review due to low OCR confidence",
        ],
        ocrConf: 62, extractConf: 71, matchConf: 68,
      },
      {
        name: "Net Worth",
        requirement: "≥ ₹2 Crore",
        status: "eligible" as const,
        confidence: "High" as const,
        extractedValue: "₹2.4 Crore (FY 2022–23)",
        document: "Balance_Sheet_FY23.pdf",
        page: "6",
        reasoning: [
          "Identified net worth section in balance sheet",
          "Extracted net worth: ₹2.4 Crore",
          "Compared against threshold: ₹2 Crore",
          "Result: Above threshold → Eligible",
        ],
        ocrConf: 91, extractConf: 88, matchConf: 94,
      },
    ],
  },
  {
    label: "Technical Evaluation",
    type: "technical",
    criteria: [
      {
        name: "Years of Experience",
        requirement: "≥ 5 years",
        status: "eligible" as const,
        confidence: "High" as const,
        extractedValue: "9 years (since 2015)",
        document: "Company_Profile.pdf",
        page: "2",
        reasoning: [
          "Located company incorporation date: 2015",
          "Calculated years of operation: 9 years",
          "Compared against threshold: 5 years",
          "Result: Above threshold → Eligible",
        ],
        ocrConf: 95, extractConf: 92, matchConf: 97,
      },
    ],
  },
  {
    label: "Compliance Evaluation",
    type: "compliance",
    criteria: [
      {
        name: "ISO 9001:2015 Certificate",
        requirement: "Valid certificate required",
        status: "eligible" as const,
        confidence: "High" as const,
        extractedValue: "ISO 9001:2015 — Valid till March 2025",
        document: "ISO_Certificate.pdf",
        page: "1",
        reasoning: [
          "Located ISO certificate document",
          "Extracted certificate number and validity",
          "Verified standard: ISO 9001:2015",
          "Result: Valid certificate found → Eligible",
        ],
        ocrConf: 97, extractConf: 95, matchConf: 98,
      },
      {
        name: "EMD Receipt",
        requirement: "Mandatory submission",
        status: "not-eligible" as const,
        confidence: "High" as const,
        extractedValue: "Not found",
        document: "—",
        page: "—",
        reasoning: [
          "Scanned all uploaded documents for EMD receipt",
          "No EMD receipt document detected",
          "Result: Missing mandatory document → Not Eligible",
        ],
        ocrConf: 0, extractConf: 0, matchConf: 0,
      },
    ],
  },
];

export default function EvaluationSections({ onViewDoc }: { onViewDoc: (doc: string) => void }) {
  const [open, setOpen] = useState<Record<string, boolean>>({ "Financial Evaluation": true });

  return (
    <div className={styles.container}>
      {SECTIONS.map((section) => (
        <div key={section.label} className={styles.section}>
          <button
            className={`${styles.sectionHeader} ${styles[section.type]}`}
            onClick={() => setOpen((p) => ({ ...p, [section.label]: !p[section.label] }))}
          >
            <span className={styles.sectionToggle}>{open[section.label] ? "▾" : "▸"}</span>
            <span className={styles.sectionLabel}>{section.label}</span>
            <span className={styles.sectionCount}>{section.criteria.length} criteria</span>
          </button>
          {open[section.label] && (
            <div className={styles.criteriaList}>
              {section.criteria.map((c, i) => (
                <CriterionCard key={i} {...c} onViewDoc={() => onViewDoc(c.document)} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
