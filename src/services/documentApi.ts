import type { DocumentInfo } from "@/src/types/DocumentInfo";

const API_BASE_URL = "https://localhost:7257/api/store";

export async function getDocuments(): Promise<DocumentInfo[]> {
  const res = await fetch(`${API_BASE_URL}/documents`);

  if (!res.ok) {
    throw new Error(`Failed to fetch documents: ${res.status}`);
  }

  return res.json();
}