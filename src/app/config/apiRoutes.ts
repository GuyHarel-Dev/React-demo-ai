const apiBaseUrl = "http://localhost:8000";

export const apiRoutes = {
  getStoreDocuments: `${apiBaseUrl}/api/store/documents`,
  getDocumentStream: (fileName: string) => `${apiBaseUrl}/api/store/document/stream/${encodeURIComponent(fileName)}`,
  postDocumentAnalysis: `${apiBaseUrl}/api/document/analysis`,
  getAllDocumentAnalysis: `${apiBaseUrl}/api/document/analysis`,
  getDocumentAnalysisByName: (fileName: string) =>`${apiBaseUrl}/api/document/analysis/${encodeURIComponent(fileName)}`,
  postEmbbedText: `${apiBaseUrl}/api/embedding/text`
};
