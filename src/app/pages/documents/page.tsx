"use client";

import { useState } from "react";

import styles from "./page.module.css";

import "@/src/app/styles/pageArea.css";
import "@/src/app/styles/controlArea.css";

import { ItemSelector } from "@/src/app/components/ItemSelector";
import { ItemSelectorEntity } from "@/src/app/types/ItemSelectorEntity";
import { ErrorPanel } from "@/src/app/components/ErrorPanel";


import { useStoreDocuments } from "@/src/app/hooks/useStoreDocuments";
import { getDocumentStream } from "@/src/api/storeApi";

import type { StoreDocumentStream } from "@/src/app/types/StoreDocumentStream";

export default function DocumentPage() {
  const [selectedDocument, setSelectedDocument] = useState<StoreDocumentStream | null>(
    null,
  );
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const documents = useStoreDocuments();

  const documentItems: ItemSelectorEntity[] = documents.map((document) => ({
    id: document.file_name,
    label: document.file_name,
  }));

  async function handleDocumentSelected(item: ItemSelectorEntity) {
    const document = documents.find((d) => d.file_name === item.label);

    setHasError(false);
    setErrorMessage("");

    try {
      if (document) {
        const doc = await getDocumentStream(document.file_name);
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
          itemArray={documentItems}
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
