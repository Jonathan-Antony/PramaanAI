export interface BidderOutcome {
  id: string;
  name: string;
  status: "eligible" | "not-eligible" | "needs-review";
  criteriaPassed: number;
  criteriaTotal: number;
  overrides: number;
  flags: string[];
  criteriaBreakdown: { criterion: string; result: "pass" | "fail" | "override"; note?: string }[];
}

export interface OverrideEntry {
  id: string;
  bidder: string;
  criterion: string;
  original: "pass" | "fail";
  overridden: "pass" | "fail";
  justification: string;
  officerId: string;
  timestamp: string;
}
