"use client";

import styles from "./page.module.css";

import { useState, useEffect } from "react";
import { getDocuments } from "@/src/api/documentsService";
import { getDocumentStream } from "@/src/api/documentsService";
import { DocumentInfo } from "@/src/types/DocumentInfo";

export default function DocumentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [documents, setDocuments] = useState<DocumentInfo[] | null>(null);
  const [selectedDocumentName, setSelectedDocumentName] = useState<
    string | null
  >(null);
  const [selectedDocument, setSelectedDocument] = useState<DocumentInfo | null>(
    null,
  );

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

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    setSelectedDocumentName(selectedName);

    // Find the match in your documents state array
    const matchedDoc = documents?.find((doc) => doc.file_name === selectedName);

    if (matchedDoc) {
      const docInfo = await getDocumentStream(matchedDoc.file_name);
      setSelectedDocument(docInfo);
      console.log("getDocumentStream result:", docInfo);
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

      <div className={styles.docViewArea}>
      {selectedDocument ? (
        <object className={styles.docViewObject}
          key={selectedDocument.blob_url}
          data={selectedDocument.blob_url}
          type={selectedDocument.mime_type}
        > 
          <p>Cannot display document:{selectedDocument.file_name}</p>
        </object>
      ) : (
        <p>No document selected</p>
      )}

      </div>

    </div>
  );
}
