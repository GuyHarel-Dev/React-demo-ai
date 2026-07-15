const apiBaseUrl = process.env.NEXT_PUBLIC_apiBaseUrl!;

export const apiRoutes = {
  documents: `${apiBaseUrl}/api/store/documents`,
  documentStream: (fileName: string) =>
    `${apiBaseUrl}/api/store/document/stream/${encodeURIComponent(fileName)}`,
  knowledge: `${apiBaseUrl}/knowledge`,
  semantic: `${apiBaseUrl}/semantic`,
  models: `${apiBaseUrl}/models`,
};

