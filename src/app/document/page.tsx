"use client";

import { useState } from "react";
import { getDocuments } from "@/src/services/documentApi";

interface Person {
  name: string;
  age: number;
}

export default function DocumentPage() {
  const [documents, setDocuments] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadDocuments() {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getDocuments();
      console.log('result=', result);
      setDocuments(result);
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
      
      <h2>{documents?.name}</h2>

    </div>
  );
}