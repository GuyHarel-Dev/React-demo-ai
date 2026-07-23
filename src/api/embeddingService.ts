
import { apiRoutes } from "@/src/app/config/apiRoutes";

export async function getTextEmbeddings(
  text: string
): Promise<string> {
  const url = apiRoutes.postEmbbedText;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/text",
    },
    body: JSON.stringify({ embed_text: text}),
  });

  if (!res.ok) {
    const error = await res.json();
    
    throw new Error(
      `${error.detail} - HTTP ${res.status}`
    );
  }

  return await res.json(); 

}