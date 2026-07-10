"use client";

import styles from "./page.module.css";

import { useState } from "react";
import { DocumentInfo } from "@/src/types/DocumentInfo";
import DocumentSelector from "@/src/components/DocumentSelector";

export default function AnalysePage() {
  const [selectedDocument, setSelectedDocument] = useState<DocumentInfo | null>(
    null,
  );

  return (
    <div>
      <h1>Analyse Page</h1>
      <DocumentSelector onDocumentSelected={setSelectedDocument} />
    </div>
  );
}
