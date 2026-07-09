"use client";

import { useState } from "react";
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
      // Revoke the old blob URL from memory if one exists to prevent memory leaks
      if (selectedFileData) {
        URL.revokeObjectURL(selectedFileData.url);
      }

      const data = await getDocumentStream("empty-pdf.pdf");
        setSelectedFileData({ url: data.blobUrl, type: data.mimeType });
      console.log("result=", selectedFileData);
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

      <div>
        {selectedFileData ? (
          <object
            data={selectedFileData.url}
            type={selectedFileData.type}
            className="w-full h-[600px] border rounded-lg"
          ></object>
        ) : (
          <p>test 2</p>
        )}
      </div>
    </div>
  );
}
