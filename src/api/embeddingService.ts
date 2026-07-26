import { apiRoutes } from "@/src/app/config/apiRoutes";

import { JsonValue } from "@/src/app/types/JsonValue";

export async function postCreateEmbeddings(
  fileName: string
): Promise<JsonValue> {

  const response = await fetch(apiRoutes.postEmbbedText, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({"file_id": "abc","file_name": fileName}),
  });

  console.log("res=", response)
  if (!response.ok) {
    const error = await response.text();

    throw new Error(
      `${error} - HTTP ${response.status}`
    );
  }

  return response.json();
}