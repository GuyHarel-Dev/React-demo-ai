"use client";

import { useState, useEffect } from "react";

import styles from "./page.module.css";
import "@/src/app/styles/pageArea.css";
import "@/src/app/styles/controlArea.css";

import ItemSelector from "@/src/app/components/ItemSelector";

import { ItemSelectorEntity } from "@/src/app/types/ItemSelectorEntity";
import { DocumentInfo } from "@/src/app/types/DocumentInfo";

import { getDocuments } from "@/src/api/documentsService";
import { getDocumentStream } from "@/src/api/documentsService";

export default function DocumentPage() {
  const [documents, setDocuments] = useState<ItemSelectorEntity[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<DocumentInfo | null>(
    null,
  );

  async function handleDocumentSelected(documentName: string) {
    const doc = await getDocumentStream(documentName);
    setSelectedDocument(doc);
  }

  useEffect(() => {
    async function loadDocuments() {
      const documents = await getDocuments();
      if (documents === null) {
        setDocuments([]);
        return;
      }

      const docEntities: ItemSelectorEntity[] = documents?.map((d, index) => ({
        id: index.toString(),
        label: d.file_name,
      }));

      setDocuments(docEntities);
    }
    loadDocuments();
  }, []);

  return (
    <div className="pageArea">
      <div className="pageTitle">Document Page</div>
      <div className="controlArea">
        <ItemSelector
          itemArray={documents}
          onLabelSelected={handleDocumentSelected}
        />
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
