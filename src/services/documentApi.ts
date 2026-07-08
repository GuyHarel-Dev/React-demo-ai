/* import type { DocumentInfo } from "@/src/types/DocumentInfo"; */

const API_BASE_URL = "http://127.0.0.1:8000/person";

interface Person {
  name: string;
  age: number;
}

export async function getDocuments(): Promise<Person | null> {
  const res = await fetch(`${API_BASE_URL}`);

  console.log('res=', res);
/*   console.log(await res.json()); */

  if (!res.ok) {
    throw new Error(`Failed to fetch documents: ${res.status}`);
  }

  return res.json();
}
