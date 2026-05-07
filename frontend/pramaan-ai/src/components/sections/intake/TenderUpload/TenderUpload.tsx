"use client";
import { useState, useRef } from "react";
import { parseTenderPdf } from "@/services/parseApi";
import type { ParseResponse } from "@/types/parse";
import styles from "./TenderUpload.module.scss";

type UploadState = "empty" | "uploading" | "parsed" | "error";

interface Props {
  caseActive: boolean;
  onParsed?: (result: ParseResponse) => void;
}

export default function TenderUpload({ caseActive, onParsed }: Props) {
  const [state, setState] = useState<UploadState>("empty");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setFileName(file.name);
    setFileSize((file.size / 1024).toFixed(1) + " KB");
    setState("uploading");
    setErrorMsg("");
    try {
      const result = await parseTenderPdf(file);
      setState("parsed");
      onParsed?.(result);
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Upload failed");
      setState("error");
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    if (!caseActive) return;
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.title}>Tender Package</span>
        <span className={styles.subtitle}>Upload primary tender document</span>
      </div>

      {state === "empty" && (
        <div
          className={`${styles.dropzone} ${!caseActive ? styles.disabled : ""}`}
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => caseActive && inputRef.current?.click()}
        >
          <span className={styles.dropIcon}>📄</span>
          <span className={styles.dropText}>Drag & drop or click to upload</span>
          <span className={styles.dropHint}>PDF, DOCX, Images accepted</span>
          <input ref={inputRef} type="file" accept=".pdf,.docx,.doc,.png,.jpg,.jpeg" hidden onChange={onInputChange} />
        </div>
      )}

      {state === "uploading" && (
        <div className={styles.fileCard}>
          <span className={styles.fileIcon}>📄</span>
          <div className={styles.fileInfo}>
            <span className={styles.fileName}>{fileName}</span>
            <span className={styles.statusTag + " " + styles.parsing}>Parsing…</span>
          </div>
        </div>
      )}

      {(state === "parsed" || state === "error") && (
        <div className={styles.fileCard}>
          <span className={styles.fileIcon}>📄</span>
          <div className={styles.fileInfo}>
            <span className={styles.fileName}>{fileName}</span>
            <span className={styles.fileSize}>{fileSize}</span>
            {state === "parsed" && <span className={`${styles.statusTag} ${styles.success}`}>✓ Parsed successfully</span>}
            {state === "error" && <span className={`${styles.statusTag} ${styles.warn}`}>⚠ {errorMsg}</span>}
          </div>
          <button className={styles.removeBtn} onClick={() => setState("empty")}>✕</button>
        </div>
      )}
    </div>
  );
}
