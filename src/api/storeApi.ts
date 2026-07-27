import type { StoreDocumentResponse } from "@/src/app/types/ApiResponses";
import type { StoreDocumentStream } from "@/src/app/types/StoreDocumentStream";

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

/**
 * Fetches a file stream from FastAPI and converts it into a browser Blob URL.
 * @param fileName The name of the file to fetch (e.g., "report.pdf")
 * @returns {Promise<{ blobUrl: string; mimeType: string }>} An object containing the temporary browser URL and the MIME type
 */
export async function getDocumentStream(
    fileName: string,
): Promise<StoreDocumentStream> {

    const url = apiRoutes.getStoreDocumentStream(fileName);
    console.log("url=", url)
    const response = await fetch(url, {
        cache: "no-store",
    });

    if (response.ok) {
      console.log("ok=", "---")  
    }
    if (!response.ok) {
        const error = await response.text();

        throw new Error(
            `${error} - HTTP ${response.status}`
        );
    }

    const mimeType = response.headers.get("content-type") || "application/pdf";
    const blob = await response.blob(); 

    return {
        fileName: "", // Provide the actual filename here
        blobUrl: URL.createObjectURL(blob),
        mimeType: mimeType,
    } as StoreDocumentStream;
}