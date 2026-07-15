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

  return (
    <div className="pageArea">
      <div className="controlArea">
        <div className="pageTitle">Analysis Page</div>
         <DocumentSelector onDocumentSelected={setSelectedDocument} />
      </div>
    </div>
  );
}
