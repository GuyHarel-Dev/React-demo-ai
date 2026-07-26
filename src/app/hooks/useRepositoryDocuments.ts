// useDocuments.ts
import { useEffect, useState } from "react";

import { getRepositoryDocuments } from "@/src/api/documentsService";
import { ItemSelectorEntity } from "@/src/app/types/ItemSelectorEntity";

export function useRepositoryDocuments() {
  const [documents, setDocuments] = useState<ItemSelectorEntity[]>([]);

  useEffect(() => {
    async function loadDocuments() {
      const docs = await getRepositoryDocuments();

      console.log("docs=", docs)
      setDocuments(
        (docs ?? []).map((d) => ({
          id: d.file_name,
          label: d.file_name,
        }))
      );
    }

    loadDocuments();
  }, []);

  return documents;
}