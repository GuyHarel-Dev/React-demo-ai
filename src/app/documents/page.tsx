"use client";

import styles from "./page.module.css";

import { useState, useEffect } from "react";
import { getDocuments } from "@/src/api/documentsService";
import { getDocumentStream } from "@/src/api/documentsService";
import { DocumentInfo } from "@/src/types/DocumentInfo";

export default function DocumentPage() {
  const [documents, setDocuments] = useState<DocumentInfo[] | null>(null);
  const [selectedDocumentName, setSelectedDocumentName] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadDocuments() {
    setIsLoading(true);
    setError(null);

    try {
      const docInfoJson = await getDocuments();
      setDocuments(docInfoJson);
      console.log("docInfoJson:", docInfoJson);
      console.log("documents", documents);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger la liste des documents.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log("useEffect called");
    async function getData() {
      await loadDocuments();
    }
    getData();
    console.log("Documents state after useEffect:", documents);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDocumentName(event.target.value);
    console.log("Selected document:", event.target.value);
  };

  return (
    <div>
      <div className={styles.documentSelectionArea}>
        <div className={styles.title}>Select or upload a document:</div>
        <select className={styles.selectDocument} onChange={handleChange}>
          {documents?.map((doc, index) => (
            // Added index fallback just to remain structurally bulletproof
            <option key={`${doc.file_name}-${index}`} value={doc.file_name}>
              {doc.file_name}
            </option>
          ))}
        </select>
      </div>

      <div className="doc-view-area"></div>
      {selectedDocumentName ? (
        <h1>{selectedDocumentName}</h1>
      ) : (
        <p>No document selected</p>
      )}
    </div>
  );
}
