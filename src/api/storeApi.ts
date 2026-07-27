import type { StoreDocumentResponse } from "@/src/app/types/ApiResponses";

import { apiRoutes } from "@/src/app/config/apiRoutes";

export async function getStoreDocuments(): Promise<StoreDocumentResponse[]> {

  const response = await fetch(apiRoutes.getStoreDocuments);

  if (!response.ok) {
    const error = await response.text();

    throw new Error(
      `$error: ${error} - HTTP ${response.status}`
    );
  }

  return response.json() as Promise<StoreDocumentResponse[]>;
}