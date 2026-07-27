// useDocuments.ts
import { useEffect, useState } from "react";

import { getStoreDocuments } from "@/src/api/storeApi";
import { StoreDocumentResponse } from "@/src/app/types/ApiResponses";

export function useStoreDocuments() {
  const [documents, setDocuments] = useState<StoreDocumentResponse[]>([]);

  useEffect(() => {
    async function loadDocuments() {
      const resp = await getStoreDocuments();

      setDocuments(resp);
      
    }

    loadDocuments();
  }, []);

  return documents;
}