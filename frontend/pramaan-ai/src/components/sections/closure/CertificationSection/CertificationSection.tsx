"use client";
import { useState } from "react";
import styles from "./CertificationSection.module.scss";

interface Props {
  canCertify: boolean;
  blockReason?: string;
  onCertify: () => void;
  certified: boolean;
}

export default function CertificationSection({ canCertify, blockReason, onCertify, certified }: Props) {
  const [checked, setChecked] = useState(false);
  const [remarks, setRemarks] = useState("");

  function handleCertify() {
    if (!checked || !canCertify || certified) return;
    onCertify();
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.certCard}>
        <div className={styles.cardTitle}>Certification</div>

        {!canCertify && blockReason && (
          <div className={styles.blockBanner}>⚠ {blockReason}</div>
        )}

        <label className={`${styles.checkRow} ${!canCertify || certified ? styles.disabled : ""}`}>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            disabled={!canCertify || certified}
          />
          <span>I confirm that the evaluation has been reviewed and all decisions are accurate and justified.</span>
        </label>

        <div className={styles.officerInfo}>
          <div className={styles.infoRow}><span>Officer Name</span><span>Rajesh Kumar</span></div>
          <div className={styles.infoRow}><span>Role</span><span>Evaluation Officer</span></div>
          <div className={styles.infoRow}><span>System ID</span><span>RK-2041</span></div>
          <div className={styles.infoRow}><span>Timestamp</span><span>{certified ? new Date().toLocaleString() : "Generated on certification"}</span></div>
        </div>

        <textarea
          className={styles.remarks}
          placeholder="Add any final observations or notes for audit purposes"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          disabled={certified}
          rows={3}
        />

        <button
          className={`${styles.certifyBtn} ${certified ? styles.certified : ""}`}
          onClick={handleCertify}
          disabled={!checked || !canCertify || certified}
        >
          {certified ? "✓ Evaluation Certified" : "Certify & Finalize Evaluation"}
        </button>
      </div>

      <div className={styles.exportCard}>
        <div className={styles.cardTitle}>Export</div>
        <div className={styles.exportBtns}>
          <button className={styles.exportBtn} disabled={!certified}>Generate Consolidated Evaluation Report</button>
          <button className={styles.exportBtn} disabled={!certified}>Download Audit Trail</button>
          <button className={styles.exportBtn} disabled={!certified}>Download Officer Review Log</button>
        </div>
        {!certified && <div className={styles.exportNote}>Available after certification</div>}
      </div>
    </div>
  );
}
