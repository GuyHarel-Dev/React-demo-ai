"use client";

import styles from "./page.module.css";

import { useState, useEffect } from "react";
import { getDocuments } from "@/src/api/documentsService";
import { getDocumentStream } from "@/src/api/documentsService";
import { DocumentInfo } from "@/src/types/DocumentInfo";

export default function DocumentPage() {
  const [documents, setDocuments] = useState<DocumentInfo[] | null>(null);
  const [selectedDocumentName, setSelectedDocumentName] = useState<
    string | null
  >(null);
  const [selectedDocument, setSelectedDocument] = useState<DocumentInfo | null>(
    null,
  );

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

  /* called on page load to fetch the list of documents from the FastAPI backend */
  useEffect(() => {
    async function getData() {
      await loadDocuments();
    }
    getData();
    console.log("Documents state after useEffect:", documents);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDocumentName(event.target.value);
    console.log("Selected document:", event.target.value);

    const selectedName = event.target.value;

    // Find the match in your documents state array
    const matchedDoc = documents?.find((doc) => doc.file_name === selectedName);

    if (matchedDoc) {
      setSelectedDocument({
        file_name: matchedDoc.file_name,
        file_url: matchedDoc.file_url,
      });
    }
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
        <div>
          <h1>{selectedDocumentName}</h1>
          <h1>{selectedDocument?.file_name}</h1>
          <h1>{selectedDocument?.file_url}</h1>
        </div>
      ) : (
        <p>No document selected</p>
      )}
    </div>
  );
}
