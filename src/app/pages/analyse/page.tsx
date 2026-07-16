"use client";

import "@/src/app/styles/pageArea.css";
import "@/src/app/styles/controlArea.css";
import styles from "./page.module.css";

import ItemSelector from "@/src/app/components/ItemSelector";

import { useState } from "react";
import { useDocuments } from "@/src/app/hooks/useDocuments";

import { getDocumentAnalysis } from "@/src/api/documentsService";

import { getModels } from "@/src/api/documentsService";

export default function AnalysePage() {
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const documents = useDocuments();

  const handleModelSelected = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedModel = event.target.value;
    setSelectedModel(selectedModel);
  };

  async function handleDocumentSelected(documentName: string) {
    setSelectedDocument(documentName);
  }

  async function onAnalyzeDocument() {
    if (selectedDocument) {
      const doc = await getDocumentAnalysis(
        selectedModel,
        selectedDocument,
      );
      console.log("onAnalyse", doc);
    }
  }
  return (
    <div className="pageArea">
      <div className="pageTitle">Analysis Page</div>
      <div className="controlArea">
        <ItemSelector
          itemArray={documents}
          onLabelSelected={handleDocumentSelected}
        />
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
