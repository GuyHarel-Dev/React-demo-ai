import type { DocumentInfo } from "@/src/app/types/DocumentInfo";

import { apiRoutes } from "@/src/app/config/apiRoutes";
import { LLM_MODELS } from "@/src/app/config/models";

import { JsonValue } from "@/src/app/types/JsonValue";

export function getModels() {
  return LLM_MODELS;
}

export async function getStoreDocuments(): Promise<DocumentInfo[]> {

  const response = await fetch(apiRoutes.getStoreDocuments);

  if (!response.ok) {
    const error = await response.text();

    throw new Error(
      `$error: ${error} - HTTP ${response.status}`
    );
  }

  return response.json() as Promise<DocumentInfo[]>;
}


export async function getRepositoryDocuments(): Promise<DocumentInfo[]> {

  const response = await fetch(apiRoutes.getAllDocumentAnalysis);

  if (!response.ok) {
    const error = await response.text();

    throw new Error(
      `$error: ${error} - HTTP ${response.status}`
    );
  }

  console.log("type=", typeof(response))

  return response.json() as Promise<DocumentInfo[]>;
}

/**
 * Fetches a file stream from FastAPI and converts it into a browser Blob URL.
 * @param fileName The name of the file to fetch (e.g., "report.pdf")
 * @returns {Promise<{ blobUrl: string; mimeType: string }>} An object containing the temporary browser URL and the MIME type
 */
export async function getDocumentStream(
  fileName: string,
): Promise<DocumentInfo> {

  const url = apiRoutes.getDocumentStream(fileName);
  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await response.text();

    throw new Error(
      `${error} - HTTP ${response.status}`
    );
  }

  const mimeType = response.headers.get("content-type") || "application/pdf";
  const blob = await response.blob();

  return {
    file_name: "", // Provide the actual filename here
    blob_url: URL.createObjectURL(blob),
    mime_type: mimeType,
  } as DocumentInfo;
}

export async function postCreateDocumentAnalysis(
  modelName: string,
  fileName: string,
  saveAnalysis: boolean
): Promise<JsonValue> {

  const response = await fetch(apiRoutes.postDocumentAnalysis, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model_name: modelName,
      file_name: fileName,
      save_analysis: saveAnalysis,
    }),
  });

  if (!response.ok) {
    const error = await response.text();

    throw new Error(
      `${error} - HTTP ${response.status}`
    );
  }

  return response.json();
}

