"use client";

import { useState } from "react";

import styles from "./page.module.css";

import "@/src/app/styles/pageArea.css";
import "@/src/app/styles/controlArea.css";

import { ItemSelector } from "@/src/app/components/ItemSelector";
import { ItemSelectorEntity } from "@/src/app/types/ItemSelectorEntity";
import { ErrorPanel } from "@/src/app/components/ErrorPanel";

import { DocumentInfo } from "@/src/app/types/DocumentInfo";

import { useStoreDocuments } from "@/src/app/hooks/useStoreDocuments";
import { getDocumentStream } from "@/src/api/documentsService";

export default function DocumentPage() {
  const [selectedDocument, setSelectedDocument] = useState<DocumentInfo | null>(
    null,
  );
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const documents = useStoreDocuments();

  async function handleDocumentSelected(item: ItemSelectorEntity) {
    const document = documents.find((d) => d.label === item.label);

    setHasError(false);
    setErrorMessage("");

    try {
      if (document) {
        const doc = await getDocumentStream(document.label);
        setSelectedDocument(doc);
      }
    } catch (err) {

      setHasError(true)
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage(String(err));
      }
    } 
  }

  return (
    <div className="pageArea">
      <div className="pageTitle">Document Page</div>
      <div className="controlArea">
        <ItemSelector
          title="Select a document:"
          itemArray={documents}
          onItemSelected={handleDocumentSelected}
        />
      </div>
      <div>{hasError ? <ErrorPanel msg={errorMessage}></ErrorPanel> : <p></p>}</div>
      
      <div className={styles.docViewArea}>
        {selectedDocument ? (
          <object
            className={styles.docViewObject}
            key={selectedDocument.fileId}
            data={selectedDocument.blobUrl}
            type={selectedDocument.mimeType}
          >
            <p>Cannot display document:{selectedDocument.fileName}</p>
          </object>
        ) : (
          <p>&nbsp;</p>
        )}
      </div>
    </div>
  );
}
