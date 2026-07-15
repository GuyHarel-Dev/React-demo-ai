"use client";

import "@/src/app/styles/pageArea.css";
import "@/src/app/styles/controlArea.css";
import styles from "./page.module.css";

import { useState } from "react";
import { DocumentInfo } from "@/src/app/types/DocumentInfo";
import DocumentSelector from "@/src/app/components/DocumentSelector";
import { AVAILABLE_MODELS } from "@/src/app/config/models";

export default function AnalysePage() {
  const [selectedDocument, setSelectedDocument] = useState<DocumentInfo | null>(
    null,
  );

  function handleClick() {
    console.log("je suis click")
  }

  return (
    <div className="pageArea">
      <div className="pageTitle">Analysis Page</div>
      <div className="controlArea">
        <DocumentSelector onDocumentSelected={setSelectedDocument} />
        <button className={styles.button} onClick={handleClick}>Analyze document</button>
      </div>
      <pre>test</pre>
    </div>
  );
}
