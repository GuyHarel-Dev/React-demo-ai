import { apiRoutes } from "@/src/app/config/apiRoutes";

import { JsonValue } from "@/src/app/types/JsonValue";

export async function postCreateEmbeddings(
  docName: string
): Promise<JsonValue> {

  const response = await fetch(apiRoutes.postEmbbedDocumentAnalysis, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({"doc_name": docName}),
  });

  if (!response.ok) {
    const error = await response.text();

    throw new Error(
      `${error} - HTTP ${response.status}`
    );
  }

  return response.json();
}