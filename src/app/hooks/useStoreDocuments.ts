// useDocuments.ts
import { useEffect, useState } from "react";

import { getStoreDocuments } from "@/src/api/documentsService";
import { ItemSelectorEntity } from "@/src/app/types/ItemSelectorEntity";

export function useStoreDocuments() {
  const [documents, setDocuments] = useState<ItemSelectorEntity[]>([]);

  useEffect(() => {
    async function loadDocuments() {
      const docs = await getStoreDocuments();

      console.log("docs=", docs)
      setDocuments(
        (docs ?? []).map((d) => ({
          id: d.file_id,
          label: d.file_name,
        }))
      );
    }

    loadDocuments();
  }, []);

  return documents;
}