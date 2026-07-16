// useDocuments.ts
import { useEffect, useState } from "react";

import { getDocuments } from "@/src/api/documentsService";
import { ItemSelectorEntity } from "@/src/app/types/ItemSelectorEntity";

export function useDocuments() {
  const [documents, setDocuments] = useState<ItemSelectorEntity[]>([]);

  useEffect(() => {
    async function loadDocuments() {
      const docs = await getDocuments();

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