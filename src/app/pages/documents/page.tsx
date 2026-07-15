"use client";

import "@/src/app/styles/pageArea.css";
import "@/src/app/styles/controlArea.css";

import styles from "./page.module.css";

import { useState } from "react";
import { DocumentInfo } from "@/src/app/types/DocumentInfo";
import DocumentSelector from "@/src/app/components/DocumentSelector";

import { getDocumentStream } from "@/src/api/documentsService";

export default function DocumentPage() {
  const [selectedDocument, setSelectedDocument] = useState<DocumentInfo | null>(
    null,
  );

  async function handleDocumentSelected(docInfo: DocumentInfo) {

    const doc = await getDocumentStream(docInfo.file_name);
    setSelectedDocument(doc);
  }
  
  return (
    <div className="pageArea">
      <div className="pageTitle">Document Page</div>
      <div className="controlArea">
        <DocumentSelector onDocumentSelected={handleDocumentSelected} />
      </div>
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
