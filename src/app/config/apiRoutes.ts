const apiBaseUrl = "http://localhost:8000";

export const apiRoutes = {
  getStoreDocuments:
    `${apiBaseUrl}/api/store/documents`,

  getStoreDocumentStream: (fileName: string) =>
    `${apiBaseUrl}/api/store/document/stream/${encodeURIComponent(fileName)}`,

  getDocumentAnalysisNames:
    `${apiBaseUrl}/api/repo/document/analysis`,

  getDocumentAnalysis: (fileName: string) =>
    `${apiBaseUrl}/api/repo/document/analysis/${encodeURIComponent(fileName)}`,

  postAnalyseDocument:
    `${apiBaseUrl}/api/document/analysis`,

  postEmbbedDocumentAnalysis: `${apiBaseUrl}/api/embedding/document/analysis`
};
