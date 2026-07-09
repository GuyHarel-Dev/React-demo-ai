import type { DocumentInfo } from "@/src/types/DocumentInfo";

const API_BASE_URL = "http://127.0.0.1:8000/api/store";


export async function getDocuments(): Promise<DocumentInfo[] | null> {
  const res = await fetch(`${API_BASE_URL}/documents`);

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
export async function getDocumentStream(fileName: string): Promise<{ blobUrl: string; mimeType: string }> {
  // Use encodeURIComponent to handle spaces and special characters safely in the URL
  const res = await fetch(`${API_BASE_URL}/document/stream/${encodeURIComponent(fileName)}`);

  if (!res.ok) {
    throw new Error(`Failed to stream document: ${res.status}`);
  }

   // Read the content type sent dynamically by your updated Python server
  const mimeType = res.headers.get("content-type") || "application/pdf";

  // 1. Download the response stream as a binary Blob object
  const blob = await res.blob();

  // 2. Generate a secure, temporary local pointer (e.g., blob:http://localhost:3000/...)
  return {
    blobUrl: URL.createObjectURL(blob),
    mimeType: mimeType
  };
}

