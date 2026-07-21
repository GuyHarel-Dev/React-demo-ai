import type { DocumentInfo } from "@/src/app/types/DocumentInfo";

import { apiRoutes } from "@/src/app/config/apiRoutes";
import { LLM_MODELS } from "@/src/app/config/models";

import {JsonValue } from "@/src/app/types/JsonValue";

export function getModels() {
  return LLM_MODELS;
}

export async function getDocuments(): Promise<DocumentInfo[] | null> {
  const res = await fetch(apiRoutes.getDocuments);

  if (!res.ok) {
    throw new Error(`Failed to fetch documents: ${res.status}`);
  }

  // Returns your array containing { file_name, file_url } JSON objects
  return res.json();
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
  const res = await fetch(url);

  if (!res.ok) {
    const error = await res.json();

    throw new Error(
      `${error.detail} - HTTP ${res.status}`
    );
  }

  // Read the content type sent dynamically by your updated Python server
  const mimeType = res.headers.get("content-type") || "application/pdf";

  // 1. Download the response stream as a binary Blob object
  const blob = await res.blob();

  // 2. Generate a secure, temporary local pointer (e.g., blob:http://localhost:3000/...)
  return {
    file_name: "", // Provide the actual filename here
    blob_url: URL.createObjectURL(blob),
    mime_type: mimeType,
  } as DocumentInfo;
}

export async function getDocumentAnalysis(
  modelName: string,
  fileName: string,
): Promise<JsonValue> {
  const url = apiRoutes.postDocumentAnalysis;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model_name: modelName, file_name: fileName }),
  });

  if (!res.ok) {
    throw new Error(`Failed to analyze document: ${res.status}`);
  }

  return await res.json(); 

}
