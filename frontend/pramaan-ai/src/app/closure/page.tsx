"use client";
import { useState } from "react";
import { AppShell } from "@/components";
import SummaryCards from "@/components/sections/closure/SummaryCards/SummaryCards";
import OutcomeTable from "@/components/sections/closure/OutcomeTable/OutcomeTable";
import OverrideRegister from "@/components/sections/closure/OverrideRegister/OverrideRegister";
import CertificationSection from "@/components/sections/closure/CertificationSection/CertificationSection";
import ClosureAiPanel from "@/components/sections/closure/ClosureAiPanel/ClosureAiPanel";
import { BIDDERS, OVERRIDES } from "@/components/sections/closure/mockData";
import type { BidderOutcome } from "@/types/closure";
import styles from "./closure.module.scss";

export default function ClosurePage() {
  const [statusFilter, setStatusFilter] = useState<BidderOutcome["status"] | null>(null);
  const [certified, setCertified] = useState(false);

  const reviewCount = BIDDERS.filter((b) => b.status === "needs-review").length;
  const canCertify = reviewCount === 0;

  return (
    <AppShell>
      <div className={styles.page}>
        {/* Context Header */}
        <div className={styles.contextHeader}>
          <div className={styles.headerLeft}>
            <h1 className={styles.tenderName}>Construction of NH-48 Bypass — Package 3</h1>
            <div className={styles.headerMeta}>
              <span>Case ID: <strong>CASE-NH48P3</strong></span>
              <span className={styles.sep}>·</span>
              <span className={`${styles.statusPill} ${certified ? styles.certifiedPill : canCertify ? styles.readyPill : styles.pendingPill}`}>
                {certified ? "Certified" : canCertify ? "Ready for Certification" : "Pending Issues"}
              </span>
            </div>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.metaItem}>Last updated: <strong>07 May 2026, 16:30</strong></div>
            <div className={styles.metaItem}>Role: <strong>Evaluation Officer</strong></div>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.main}>
            {/* Summary Cards */}
            <SummaryCards
              bidders={BIDDERS}
              overrideCount={OVERRIDES.length}
              onFilterStatus={setStatusFilter}
            />

            <div className={styles.tables}>
              <OutcomeTable bidders={BIDDERS} statusFilter={statusFilter} />
              <OverrideRegister overrides={OVERRIDES} />
            </div>

            <div className={styles.certArea}>
              <CertificationSection
                canCertify={canCertify}
                blockReason={!canCertify ? `${reviewCount} bidder${reviewCount > 1 ? "s" : ""} still marked for review` : undefined}
                onCertify={() => setCertified(true)}
                certified={certified}
              />
            </div>
          </div>

          <div className={styles.aside}>
            <ClosureAiPanel bidders={BIDDERS} overrides={OVERRIDES} certified={certified} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
