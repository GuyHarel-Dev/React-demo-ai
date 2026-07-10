"use client";

import styles from "./DocumentSelector.module.css"; // Move select styles here if needed


import { useState, useEffect } from "react";
import { getDocuments, getDocumentStream } from "@/src/api/documentsService";
import { DocumentInfo } from "@/src/types/DocumentInfo";

interface DocumentSelectorProps {
  onDocumentSelected: (docInfo: DocumentInfo) => void;
}

export default function DocumentSelector({ onDocumentSelected }: DocumentSelectorProps) {
  const [documents, setDocuments] = useState<DocumentInfo[] | null>(null);

  useEffect(() => {
    async function loadDocuments() {
      try {
        const docInfoJson = await getDocuments();
        setDocuments(docInfoJson);
      } catch (err) {
        console.error(err);
      }
    }
    loadDocuments();
  }, []);

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    const matchedDoc = documents?.find((doc) => doc.file_name === selectedName);

    if (matchedDoc) {
      const docInfo = await getDocumentStream(matchedDoc.file_name);
      onDocumentSelected(docInfo); // 👈 Passes the fetched document object up to the parent page
    }
  };

  return (
    <div className={styles.documentSelectionArea}>
      <div className={styles.title}>Select a document:</div>
      <select className={styles.selectDocument} onChange={handleChange} defaultValue="">
        <option value="" disabled>(select a document)</option>
        {documents?.map((doc, index) => (
          <option key={`${doc.file_name}-${index}`} value={doc.file_name}>
            {doc.file_name}
          </option>
        ))}
      </select>
    </div>
  );
}
