"use client";

import "@/src/app/styles/pageArea.css";
import "@/src/app/styles/controlArea.css";

import styles from "./page.module.css";

import { useState } from "react";
import { DocumentInfo } from "@/src/app/types/DocumentInfo";
import DocumentSelector from "@/src/app/components/DocumentSelector";

export default function DocumentPage() {
  const [selectedDocument, setSelectedDocument] = useState<DocumentInfo | null>(
    null,
  );

  return (
    <div className="pageArea">
      <div className="controlArea">
        <div className="pageTitle">Document Page</div>
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
    </div>
  );
}
