import type { BidderOutcome, OverrideEntry } from "@/types/closure";

export const BIDDERS: BidderOutcome[] = [
  {
    id: "1", name: "Apex Constructions Ltd.", status: "eligible",
    criteriaPassed: 4, criteriaTotal: 4, overrides: 0, flags: [],
    criteriaBreakdown: [
      { criterion: "Annual Turnover ≥ ₹5 Cr", result: "pass" },
      { criterion: "3 similar projects in 5 years", result: "pass" },
      { criterion: "Valid GST registration", result: "pass" },
      { criterion: "ISO 9001 certification", result: "pass" },
    ],
  },
  {
    id: "2", name: "BuildRight Pvt. Ltd.", status: "not-eligible",
    criteriaPassed: 2, criteriaTotal: 4, overrides: 1, flags: ["Missing ISO certificate"],
    criteriaBreakdown: [
      { criterion: "Annual Turnover ≥ ₹5 Cr", result: "pass" },
      { criterion: "3 similar projects in 5 years", result: "fail" },
      { criterion: "Valid GST registration", result: "pass" },
      { criterion: "ISO 9001 certification", result: "override", note: "Officer marked as non-critical" },
    ],
  },
  {
    id: "3", name: "Horizon Infrastructure", status: "needs-review",
    criteriaPassed: 3, criteriaTotal: 4, overrides: 1, flags: ["Ambiguous OCR on turnover doc"],
    criteriaBreakdown: [
      { criterion: "Annual Turnover ≥ ₹5 Cr", result: "override", note: "Borderline — officer approved" },
      { criterion: "3 similar projects in 5 years", result: "pass" },
      { criterion: "Valid GST registration", result: "pass" },
      { criterion: "ISO 9001 certification", result: "pass" },
    ],
  },
  {
    id: "4", name: "Sigma Builders", status: "not-eligible",
    criteriaPassed: 1, criteriaTotal: 4, overrides: 0, flags: ["2 criteria failed", "Low OCR confidence"],
    criteriaBreakdown: [
      { criterion: "Annual Turnover ≥ ₹5 Cr", result: "fail" },
      { criterion: "3 similar projects in 5 years", result: "fail" },
      { criterion: "Valid GST registration", result: "pass" },
      { criterion: "ISO 9001 certification", result: "fail" },
    ],
  },
  {
    id: "5", name: "NovaBuild Contractors", status: "eligible",
    criteriaPassed: 4, criteriaTotal: 4, overrides: 0, flags: [],
    criteriaBreakdown: [
      { criterion: "Annual Turnover ≥ ₹5 Cr", result: "pass" },
      { criterion: "3 similar projects in 5 years", result: "pass" },
      { criterion: "Valid GST registration", result: "pass" },
      { criterion: "ISO 9001 certification", result: "pass" },
    ],
  },
];

export const OVERRIDES: OverrideEntry[] = [
  {
    id: "o1", bidder: "BuildRight Pvt. Ltd.", criterion: "ISO 9001 certification",
    original: "fail", overridden: "pass",
    justification: "Bidder provided evidence of pending renewal. Certificate expired 2 weeks before submission deadline. Officer deemed acceptable given active renewal process.",
    officerId: "RK-2041", timestamp: "2026-05-06 14:32",
  },
  {
    id: "o2", bidder: "Horizon Infrastructure", criterion: "Annual Turnover ≥ ₹5 Cr",
    original: "fail", overridden: "pass",
    justification: "OCR extracted ₹4.87 Cr but audited statement clearly shows ₹5.12 Cr. Extraction error confirmed. Decision corrected.",
    officerId: "RK-2041", timestamp: "2026-05-06 15:10",
  },
];
