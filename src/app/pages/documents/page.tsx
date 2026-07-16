"use client";

import { useState } from "react";

import styles from "./page.module.css";
import "@/src/app/styles/pageArea.css";
import "@/src/app/styles/controlArea.css";

import ItemSelector from "@/src/app/components/ItemSelector";
import { ItemSelectorEntity } from "@/src/app/types/ItemSelectorEntity";

import { DocumentInfo } from "@/src/app/types/DocumentInfo";

import { useDocuments } from "@/src/app/hooks/useDocuments";
import { getDocumentStream } from "@/src/api/documentsService";

export default function DocumentPage() {
  const [selectedDocument, setSelectedDocument] = useState<DocumentInfo | null>(
    null,
  );

  const documents = useDocuments();

  async function handleDocumentSelected(item: ItemSelectorEntity) {
    const documentName = documents.find((d) => d.id === item.id);

    if (documentName) {
      console.log("documentName=", documentName.label);
      const doc = await getDocumentStream(documentName.label);
      setSelectedDocument(doc);
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
