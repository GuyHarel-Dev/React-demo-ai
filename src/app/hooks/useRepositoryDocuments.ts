import { useEffect, useState } from "react";

import { getRepositoryDocuments } from "@/src/api/documentsService";
import { ItemSelectorEntity } from "@/src/app/types/ItemSelectorEntity";

export function useRepositoryDocuments() {
  const [documents, setDocuments] = useState<ItemSelectorEntity[]>([]);

  useEffect(() => {
    async function loadDocuments() {
      const docs = await getRepositoryDocuments();
      
      console.log("docs3=", docs)

      const test = (docs ?? []).map((d) => ({
          toto: d.file_id,
          bobo: d.file_name,
        }));

      console.log("test=", test)
              
      setDocuments(
        (docs ?? []).map((d) => ({
          id: d.file_id,
          label: d.file_name,
        }))
      );

      console.log("documents=", documents);
    }

    loadDocuments();
  }, []);

  return documents;
}