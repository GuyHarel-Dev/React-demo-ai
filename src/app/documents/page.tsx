"use client";

import styles from './page.module.css';

import { useState, useEffect } from "react";
import { getDocuments } from "@/src/api/documentsService";
import { getDocumentStream } from "@/src/api/documentsService";
import { DocumentInfo } from "@/src/types/DocumentInfo";

export default function DocumentPage() {
  const [documents, setDocuments] = useState<DocumentInfo[] | null>(null);
  const [selectedFileData, setSelectedFileData] = useState<{
    url: string;
    type: string;
  } | null>(null);

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

  return (
    <div>
      <div className={styles.documentSelectionArea }>
        <div className={styles.title}>Select or upload a document:</div>
          <select className={styles.selectDocument}>
            {documents?.map((doc, index) => (
              // Added index fallback just to remain structurally bulletproof
              <option key={`${doc.file_name}-${index}`} value={doc.file_name}>
                {doc.file_name}
              </option>
            ))}
          </select>
      </div>

      <div className="doc-view-area"></div>
      {selectedFileData ? (
        <object
          data={selectedFileData.url}
          type={selectedFileData.type}
          className="w-full h-[600px] border rounded-lg"
        ></object>
      ) : (
        <p>No document selected</p>
      )}
    </div>
  );
}
