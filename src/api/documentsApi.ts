
import { apiRoutes } from "@/src/app/config/apiRoutes";
import { JsonValue } from "@/src/app/types/JsonValue";
import { RepoDocumentResponse } from "@/src/app/types/ApiResponses";

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

export async function getDocumentAnalysis(doc_name: string): Promise<RepoDocumentResponse> {

  const response = await fetch(apiRoutes.getDocumentAnalysis(doc_name));

  if (!response.ok) {
    const error = await response.text();

    throw new Error(
      `$error: ${error} - HTTP ${response.status}`
    );
  }

  return response.json() as Promise<RepoDocumentResponse>;
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

