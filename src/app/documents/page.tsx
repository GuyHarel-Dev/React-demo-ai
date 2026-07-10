"use client";

import styles from "./page.module.css";

import { useState } from "react";
import { DocumentInfo } from "@/src/types/DocumentInfo";
import DocumentSelector from "@/src/components/DocumentSelector";

export default function DocumentPage() {
  const [selectedDocument, setSelectedDocument] = useState<DocumentInfo | null>(
    null,
  );

  return (
    <div>
      <h1>Document Page</h1>
      <DocumentSelector onDocumentSelected={setSelectedDocument} />

      <div className={styles.docViewArea}>
        {selectedDocument ? (
          <object
            className={styles.docViewObject}
            key={selectedDocument.blob_url}
            data={selectedDocument.blob_url}
            type={selectedDocument.mime_type}
          >
            <p>Cannot display document:{selectedDocument.file_name}</p>
          </object>
        ) : (
          <p>&nbsp;</p>
        )}
      </div>
    </div>
  );
}
