"use client";
import { useState } from "react";
import { AppShell } from "@/components";
import EvalHeader from "@/components/sections/evaluation/EvalHeader/EvalHeader";
import ControlBar from "@/components/sections/evaluation/ControlBar/ControlBar";
import EvaluationMatrix from "@/components/sections/evaluation/EvaluationMatrix/EvaluationMatrix";
import EvalAiPanel from "@/components/sections/evaluation/EvalAiPanel/EvalAiPanel";
import styles from "./evaluation.module.scss";

export default function EvaluationPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [highlight, setHighlight] = useState(false);

  return (
    <AppShell>
      <div className={styles.page}>
        <EvalHeader />
        <ControlBar onSearch={setSearch} onStatusFilter={setStatusFilter} onHighlight={setHighlight} />
        <div className={styles.content}>
          <div className={styles.matrixArea}>
            <EvaluationMatrix
              searchQuery={search}
              statusFilter={statusFilter}
              highlightProblematic={highlight}
            />
          </div>
          <div className={styles.aiArea}>
            <EvalAiPanel />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
