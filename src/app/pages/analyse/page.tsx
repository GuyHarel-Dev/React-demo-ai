"use client";

import "@/src/app/styles/pageArea.css";
import "@/src/app/styles/controlArea.css";
import styles from "./page.module.css";

import ItemSelector from "@/src/app/components/ItemSelector";

import { useState } from "react";
import { DocumentInfo } from "@/src/app/types/DocumentInfo";
import { getDocumentAnalysis } from "@/src/api/documentsService";

import { getModels } from "@/src/api/documentsService";

export default function AnalysePage() {
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedDocument, setSelectedDocument] = useState<DocumentInfo | null>(
    null,
  );

  const handleModelSelected = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedModel = event.target.value;
    setSelectedModel(selectedModel);
  };

  async function handleDocumentSelected(docInfo: DocumentInfo) {
    setSelectedDocument(docInfo);
  }

  async function onAnalyzeDocument() {
    if (selectedDocument) {
      const doc = await getDocumentAnalysis(
        selectedModel,
        selectedDocument.file_name,
      );
      console.log("onAnalyse", doc);
    }
  }
  return (
    <div className="pageArea">
      <div className="pageTitle">Analysis Page</div>
      <div className="controlArea">
        <ItemSelector itemArray={[]} onDocumentSelected={handleDocumentSelected} />
        <div>Select a model:</div>
        <select onChange={handleModelSelected} defaultValue="">
          <option value="" disabled>
            (select a model)
          </option>
          {getModels().map((m, index) => (
            <option key={index}>{m.name}</option>
          ))}
        </select>
        <button className={styles.button} onClick={onAnalyzeDocument}>
          Analyze document
        </button>
      </div>
      <pre>test</pre>
    </div>
  );
}
