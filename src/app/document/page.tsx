"use client";

import { useState } from "react";
import { getDocuments } from "@/src/services/documentApi";
import type { DocumentInfo } from "@/src/types/DocumentInfo";

export default function DocumentPage() {
  const [documents, setDocuments] = useState<DocumentInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadDocuments() {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getDocuments();
      setDocuments(result);
    } catch (err) {
      setError("Impossible de charger la liste des documents.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      <button onClick={loadDocuments} disabled={isLoading}>
        {isLoading ? "Chargement..." : "Charger les documents"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {documents.map((doc) => (
          <li key={doc.fileName}>{doc.fileName}</li>
        ))}
      </ul>
    </div>
  );
}