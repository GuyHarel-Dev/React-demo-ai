
import { apiRoutes } from "@/src/app/config/apiRoutes";
import { JsonValue } from "@/src/app/types/JsonValue";

export async function getDocumentAnalysisNames(): Promise<string[]> {

  const response = await fetch(apiRoutes.getDocumentAnalysisNames);

  if (!response.ok) {
    const error = await response.text();

    throw new Error(
      `$error: ${error} - HTTP ${response.status}`
    );
  }

  return response.json() as Promise<string[]>;
}

export async function postAnalyseDocument(
  modelName: string,
  docName: string,
  saveAnalysis: boolean
): Promise<JsonValue> {

  const response = await fetch(apiRoutes.postAnalyseDocument, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model_name: modelName,
      doc_name: docName,
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

