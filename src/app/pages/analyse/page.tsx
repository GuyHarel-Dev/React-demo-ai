"use client";

import "@/src/app/styles/pageArea.css";
import "@/src/app/styles/controlArea.css";

import styles from "./page.module.css";

import ItemSelector from "@/src/app/components/ItemSelector";

import { useState } from "react";
import { useDocuments } from "@/src/app/hooks/useDocuments";
import { getDocumentAnalysis, getModels } from "@/src/api/documentsService";

export default function AnalysePage() {
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const documents = useDocuments();

  function getModelSelection() {
    return getModels().map((m) => ({
      id: m.id,
      label: m.name,
    }));
  }

  async function handleDocumentSelected(documentName: string) {
    setSelectedDocument(documentName);
  }

  async function handleModelSelected(modelName: string) {
    setSelectedModel(modelName);
  }

  async function onAnalyzeDocument() {
    console.log(selectedModel);
    console.log(selectedDocument);
  }
  return (
    <div className="pageArea">
      <div className="pageTitle">Analysis Page</div>
      <div className={`controlArea ${styles.controlAreaFlex}`}>
        <ItemSelector
          title="Select a document:"
          itemArray={documents}
          onLabelSelected={handleDocumentSelected}
        />
        <ItemSelector
          title="Select a model:"
          itemArray={getModelSelection()}
          onLabelSelected={handleModelSelected}
        />
        <button className={styles.button} onClick={onAnalyzeDocument}>
          Analyze document
        </button>
      </div>
      <pre>test</pre>
    </div>
  );
}
