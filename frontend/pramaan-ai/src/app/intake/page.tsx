"use client";
import { useState } from "react";
import { AppShell } from "@/components";
import TenderUpload from "@/components/sections/intake/TenderUpload/TenderUpload";
import BidderUpload from "@/components/sections/intake/BidderUpload/BidderUpload";
import ProcessingTimeline from "@/components/sections/intake/ProcessingTimeline/ProcessingTimeline";
import ValidationTable from "@/components/sections/intake/ValidationTable/ValidationTable";
import ReadinessBanner from "@/components/sections/intake/ReadinessBanner/ReadinessBanner";
import IntakeAiPanel from "@/components/sections/intake/IntakeAiPanel/IntakeAiPanel";
import type { ParseResponse } from "@/types/parse";
import styles from "./intake.module.scss";

export default function IntakePage() {
  const [caseId, setCaseId] = useState<string | null>(null);
  const [parseResult, setParseResult] = useState<ParseResponse | null>(null);

  function createCase() {
    setCaseId("CASE-" + Math.random().toString(36).slice(2, 8).toUpperCase());
    setParseResult(null);
  }

  const steps = [
    { label: "Tender Parsing", status: parseResult ? "done" as const : "pending" as const, timestamp: parseResult ? new Date().toLocaleTimeString() : undefined },
    { label: "Criteria Extraction", status: parseResult ? "done" as const : "pending" as const, timestamp: parseResult ? new Date().toLocaleTimeString() : undefined },
    { label: "Bidder Upload", status: caseId ? "in-progress" as const : "pending" as const },
    { label: "Submission Validation", status: "pending" as const },
    { label: "Ready for Evaluation", status: "pending" as const },
  ];

  return (
    <AppShell>
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.pageTitle}>Evaluation Intake &amp; Setup</h1>
            <p className={styles.pageSubtitle}>Upload tender and bidder submissions to initiate eligibility evaluation</p>
          </div>
          <div className={styles.headerRight}>
            {caseId && <span className={styles.caseId}>Case: {caseId}</span>}
            <button className={styles.createBtn} onClick={createCase}>
              {caseId ? "Reset Case" : "Create New Case"}
            </button>
          </div>
        </div>

        <div className={styles.columns}>
          <div className={styles.leftCol}>
            <TenderUpload caseActive={!!caseId} onParsed={setParseResult} />
            <BidderUpload caseActive={!!caseId} />
          </div>

          <div className={styles.centerCol}>
            <ProcessingTimeline steps={steps} />
            <ValidationTable />
            <ReadinessBanner
              state={caseId ? "partial" : "not-ready"}
              reason={caseId ? "Bidder 2 has missing documents" : "Create a case and upload documents to begin"}
            />
          </div>

          <div className={styles.rightCol}>
            <IntakeAiPanel active={!!caseId} parseResult={parseResult} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
