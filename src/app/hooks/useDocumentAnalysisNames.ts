import { useEffect, useState } from "react";

import { getDocumentAnalysisNames } from "@/src/api/documentsApi";

export function useDocumentAnalysisNames(): string[] {
  const [analysisDocumentNames, setAnalysisDocumentNames] = useState<string[]>([]);

  useEffect(() => {
    async function loadDocuments() {
      const resp = await getDocumentAnalysisNames();
      setAnalysisDocumentNames(resp)
    }

    loadDocuments();
  }, []);

  return analysisDocumentNames;
}