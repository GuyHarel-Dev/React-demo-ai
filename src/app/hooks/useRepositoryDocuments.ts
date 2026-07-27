import { useEffect, useState } from "react";

import { getDocumentAnalysisNames } from "@/src/api/documentsApi";
import { ItemSelectorEntity } from "@/src/app/types/ItemSelectorEntity";

export function useRepositoryDocuments(): ItemSelectorEntity[] {
  const [documents, setDocuments] = useState<ItemSelectorEntity[]>([]);

  useEffect(() => {
    async function loadDocuments() {
      const docs = await getDocumentAnalysisNames();
      
      console.log("docs3=", docs)

 
    }

    loadDocuments();
  }, []);

  return documents;
}