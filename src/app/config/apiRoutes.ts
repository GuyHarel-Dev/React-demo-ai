const apiBaseUrl = "http://localhost:8000";

export const apiRoutes = {
  getDocuments: `${apiBaseUrl}/api/store/documents`,
  getDocumentStream: (fileName: string) => `${apiBaseUrl}/api/store/document/stream/${encodeURIComponent(fileName)}`,
  postDocumentAnalysis: `${apiBaseUrl}/api/document/analysis`,
};
