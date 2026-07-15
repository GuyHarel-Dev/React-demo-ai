"use client";

import styles from "./page.module.css";

import { useState } from "react";
import { DocumentInfo } from "@/src/app/types/DocumentInfo";
import DocumentSelector from "@/src/app/components/DocumentSelector";
import { AVAILABLE_MODELS } from "@/src/app/config/models";

export default function AnalysePage() {
  const [selectedDocument, setSelectedDocument] = useState<DocumentInfo | null>(
    null,
  );

  return (
    <div className={styles.page_area}>
      <div className={styles.document_analysis_area}>
        <div className={styles.child_area}>
          <DocumentSelector onDocumentSelected={setSelectedDocument} />
        </div>
        <div className={styles.child_area}>deux</div>
      </div>
    </div>
  );
}
