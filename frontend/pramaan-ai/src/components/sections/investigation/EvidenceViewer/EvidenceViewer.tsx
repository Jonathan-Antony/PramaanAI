"use client";
import { useState } from "react";
import styles from "./EvidenceViewer.module.scss";

const DOCS = ["Balance_Sheet_FY23.pdf", "Company_Profile.pdf", "ISO_Certificate.pdf"];

export default function EvidenceViewer({ document: activeDoc }: { document: string }) {
  const [selectedDoc, setSelectedDoc] = useState(activeDoc);
  const hasDoc = selectedDoc && selectedDoc !== "—";

  return (
    <div className={styles.viewer}>
      <div className={styles.title}>Evidence Viewer</div>

      <div className={styles.docSelector}>
        <select className={styles.select} value={selectedDoc} onChange={(e) => setSelectedDoc(e.target.value)}>
          {DOCS.map((d) => <option key={d}>{d}</option>)}
        </select>
      </div>

      <div className={styles.docArea}>
        {hasDoc ? (
          <div className={styles.docPreview}>
            <div className={styles.docIcon}>📄</div>
            <div className={styles.docName}>{selectedDoc}</div>
            <div className={styles.highlightBox}>
              <div className={styles.highlightLine} />
              <div className={styles.highlightLine} style={{ width: "70%", opacity: 0.6 }} />
              <div className={styles.highlightActive} />
              <div className={styles.highlightLine} style={{ width: "85%", opacity: 0.4 }} />
            </div>
            <div className={styles.pageNav}>
              <button>‹</button>
              <span>Page 4 / 12</span>
              <button>›</button>
            </div>
          </div>
        ) : (
          <div className={styles.empty}>Select a document to view</div>
        )}
      </div>

      <div className={styles.meta}>
        <div className={styles.metaRow}><span>File Type</span><strong>PDF (Scanned)</strong></div>
        <div className={styles.metaRow}><span>Uploaded</span><strong>12 Mar 2024, 09:41</strong></div>
        <div className={styles.metaRow}><span>OCR Confidence</span><strong className={styles.amber}>62%</strong></div>
      </div>
    </div>
  );
}
