   
export interface StoreDocumentResponse {
  doc_name: string;
}

export interface RepoDocumentResponse {
  Id: number,
  FileName: string
  BytesHash: string
  CreatedAt: Date
  AnalysisResultJson: string

}