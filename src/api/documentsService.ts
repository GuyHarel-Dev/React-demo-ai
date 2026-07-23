import type { DocumentInfo } from "@/src/app/types/DocumentInfo";

import { apiRoutes } from "@/src/app/config/apiRoutes";
import { LLM_MODELS } from "@/src/app/config/models";

import { JsonValue } from "@/src/app/types/JsonValue";

export function getModels() {
  return LLM_MODELS;
}

export async function getDocuments(): Promise<DocumentInfo[] | null> {

  const res = await fetch(apiRoutes.getDocuments);

  if (!res.ok) {
    const error = await res.json();

    throw new Error(
      `${error.detail} - HTTP ${res.status}`
    );
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
  const res = await fetch(url, {
    cache: "no-store",
  });

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
  saveAnalysis: boolean
): Promise<JsonValue> {
  const url = apiRoutes.postDocumentAnalysis;
  const jsonBody = JSON.stringify({ model_name: modelName, file_name: fileName })
  //const jsonBody = JSON.stringify({ model_name: modelName, file_name: fileName, save_analysis: saveAnalysis })

  let response = {}

  console.log("url=", url)
  console.log("body=", JSON.stringify({ model_name: modelName, file_name: fileName, save_analysis: saveAnalysis }))

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonBody,
    });

    console.log("res=", res)

    if (!res.ok) {
      console.log("res=", res.ok)
      const error = await res.json();
      response = { "error": error.detail, "status": res.status }

    }

    return await res.json();

  }
  catch (error) {
    console.log("catch error=", error)
    response = {
      error: true,
      url: url,
      body: jsonBody,
      message: error instanceof Error
        ? error.message
        : String(error),
    };
  }

  return response;




}
