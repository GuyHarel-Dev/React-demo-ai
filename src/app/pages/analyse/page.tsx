"use client";

import "@/src/app/styles/pageArea.css";
import "@/src/app/styles/controlArea.css";
import styles from "./page.module.css";

import DocumentSelector from "@/src/app/components/DocumentSelector";

import { useState } from "react";
import { DocumentInfo } from "@/src/app/types/DocumentInfo";
import { getDocumentAnalysis } from "@/src/api/documentsService";

import { AVAILABLE_MODELS } from "@/src/config/models";

export default function AnalysePage() {
  const [selectedDocument, setSelectedDocument] = useState<DocumentInfo | null>(
    null,
  );
  async function handleDocumentSelected(docInfo: DocumentInfo) {
    setSelectedDocument(docInfo);
  }

  async function onAnalyzeDocument() {
    if (selectedDocument) {
      const doc = await getDocumentAnalysis(selectedDocument.file_name);
      console.log("onAnalyse", doc)
    }
  }
  return (
    <div className="pageArea">
      <div className="pageTitle">Analysis Page</div>
      <div className="controlArea">
        <DocumentSelector onDocumentSelected={handleDocumentSelected} />
        <button className={styles.button} onClick={onAnalyzeDocument}>
          Analyze document
        </button>
      </div>
      <pre>test</pre>
    </div>
  );
}
