"use client";
import { useState, useRef } from "react";
import styles from "./BidderUpload.module.scss";

type BundleStatus = "uploading" | "validating" | "ready" | "error";

interface Bundle {
  id: string;
  name: string;
  files: string[];
  progress: number;
  status: BundleStatus;
  expanded: boolean;
}

export default function BidderUpload({ caseActive }: { caseActive: boolean }) {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function addBundle(files: FileList) {
    const fileNames = Array.from(files).map((f) => f.name);
    const bundle: Bundle = {
      id: Date.now().toString(),
      name: `Bidder ${bundles.length + 1}`,
      files: fileNames,
      progress: 0,
      status: "uploading",
      expanded: false,
    };
    setBundles((prev) => [...prev, bundle]);

    const interval = setInterval(() => {
      setBundles((prev) =>
        prev.map((b) => {
          if (b.id !== bundle.id) return b;
          if (b.progress >= 100) {
            clearInterval(interval);
            return { ...b, status: "validating" };
          }
          const next = b.progress + 15;
          if (next >= 100) {
            setTimeout(() => {
              setBundles((p) =>
                p.map((x) => (x.id === bundle.id ? { ...x, status: "ready" } : x))
              );
            }, 800);
          }
          return { ...b, progress: Math.min(next, 100) };
        })
      );
    }, 100);
  }

  function toggleExpand(id: string) {
    setBundles((prev) => prev.map((b) => (b.id === id ? { ...b, expanded: !b.expanded } : b)));
  }

  function removeBundle(id: string) {
    setBundles((prev) => prev.filter((b) => b.id !== id));
  }

  function updateName(id: string, name: string) {
    setBundles((prev) => prev.map((b) => (b.id === id ? { ...b, name } : b)));
  }

  const statusLabel: Record<BundleStatus, string> = {
    uploading: "Uploading",
    validating: "Validating",
    ready: "Ready",
    error: "Error",
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.title}>Bidder Submissions</span>
        <button
          className={styles.addBtn}
          disabled={!caseActive}
          onClick={() => inputRef.current?.click()}
        >
          + Add Bundle
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.doc,.png,.jpg,.jpeg"
          hidden
          onChange={(e) => e.target.files && addBundle(e.target.files)}
        />
      </div>

      {bundles.length === 0 ? (
        <div className={styles.empty}>No bidder submissions uploaded yet</div>
      ) : (
        <div className={styles.list}>
          {bundles.map((b) => (
            <div key={b.id} className={styles.bundle}>
              <div className={styles.bundleRow}>
                <button className={styles.expandBtn} onClick={() => toggleExpand(b.id)}>
                  {b.expanded ? "▾" : "▸"}
                </button>
                <input
                  className={styles.nameInput}
                  value={b.name}
                  onChange={(e) => updateName(b.id, e.target.value)}
                />
                <span className={styles.fileCount}>{b.files.length} file{b.files.length !== 1 ? "s" : ""}</span>
                {b.status === "uploading" && (
                  <div className={styles.miniProgress}>
                    <div className={styles.miniProgressFill} style={{ width: `${b.progress}%` }} />
                  </div>
                )}
                <span className={`${styles.statusTag} ${styles[b.status]}`}>{statusLabel[b.status]}</span>
                <button className={styles.removeBtn} onClick={() => removeBundle(b.id)}>✕</button>
              </div>
              {b.expanded && (
                <div className={styles.fileList}>
                  {b.files.map((f, i) => (
                    <div key={i} className={styles.fileItem}>
                      <span>📄</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
