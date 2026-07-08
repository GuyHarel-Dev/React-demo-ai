import type { DocumentInfo } from "@/src/types/DocumentInfo";

const API_BASE_URL = "http://127.0.0.1:8000/api/store";


export async function getDocuments(): Promise<DocumentInfo[] | null> {
  const res = await fetch(`${API_BASE_URL}/documents`);

 console.log('API Request executed. Response status:', res.status);

  if (!res.ok) {
    throw new Error(`Failed to fetch documents: ${res.status}`);
  }

  // Returns your array containing { file_name, file_url } JSON objects
  return res.json();

}

/* test */