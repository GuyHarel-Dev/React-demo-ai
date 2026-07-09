"use client";

import { useState } from "react";
import { getDocuments } from "@/src/api/documentsService";
import { getDocumentStream } from "@/src/api/documentsService";
import { DocumentInfo } from "@/src/types/DocumentInfo";

interface Person {
  name: string;
  age: number;
}

export default function DocumentPage() {
  const [documents, setDocuments] = useState<DocumentInfo[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadDocuments() {
    setIsLoading(true);
    setError(null);

/*     try {
      const result = await getDocuments();
      console.log("result=", result);
      setDocuments(result);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger la liste des documents.");
    } finally {
      setIsLoading(false);
    } */

    try {
      const result = await getDocumentStream("empty-pdf.pdf");
      console.log("result=", result);

    } catch (err) {
      console.error(err);
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

      <h2>{documents?.length} documents trouvés</h2>
      {documents?.map((doc, index) => (
        <div key={index}>
          <h3>{doc.file_name}</h3>
          <p>{doc.file_url}</p>
        </div>
      ))}
    </div>
  );
}
