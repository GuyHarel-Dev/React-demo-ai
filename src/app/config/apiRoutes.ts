const apiBaseUrl = "http://localhost:8000";

export const apiRoutes = {
  getStoreDocuments:
    `${apiBaseUrl}/api/store/documents`,

  getStoreDocumentStream: (fileName: string) =>
    `${apiBaseUrl}/api/store/document/stream/${encodeURIComponent(fileName)}`,

  postDocumentAnalysis: 
    `${apiBaseUrl}/api/document/analysis`,

  getDocumentAnalysisNames: 
    `${apiBaseUrl}/api/document/analysis/names`,

  getDocumentAnalysis: (fileName: string) => 
      `${apiBaseUrl}/api/document/analysis/${encodeURIComponent(fileName)}`,

  postEmbbedText: `${apiBaseUrl}/api/embedding/text`
};
