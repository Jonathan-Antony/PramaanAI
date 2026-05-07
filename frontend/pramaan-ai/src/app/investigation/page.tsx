"use client";
import { useState } from "react";
import { AppShell } from "@/components";
import InvestigationHeader from "@/components/sections/investigation/InvestigationHeader/InvestigationHeader";
import BidderSummary from "@/components/sections/investigation/BidderSummary/BidderSummary";
import EvaluationSections from "@/components/sections/investigation/EvaluationSections/EvaluationSections";
import EvidenceViewer from "@/components/sections/investigation/EvidenceViewer/EvidenceViewer";
import InvestigationAiPanel from "@/components/sections/investigation/InvestigationAiPanel/InvestigationAiPanel";
import styles from "./investigation.module.scss";

export default function InvestigationPage() {
  const [activeDoc, setActiveDoc] = useState("Balance_Sheet_FY23.pdf");

  return (
    <AppShell>
      <div className={styles.page}>
        <InvestigationHeader />
        <div className={styles.workspace}>
          <BidderSummary />
          <div className={styles.center}>
            <EvaluationSections onViewDoc={setActiveDoc} />
          </div>
          <div className={styles.rightCol}>
            <EvidenceViewer document={activeDoc} />
            <InvestigationAiPanel />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
