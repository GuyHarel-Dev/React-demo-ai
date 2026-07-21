"use client";


import { ItemSelector } from "@/src/app/components/ItemSelector";
import { ItemSelectorEntity } from "@/src/app/types/ItemSelectorEntity";
import { useState } from "react";
import { useDocuments } from "@/src/app/hooks/useDocuments";
import { getDocumentAnalysis, getModels } from "@/src/api/documentsService";
import { JsonValue } from "@/src/app/types/JsonVAlue";
import { LoadingPanel } from "@/src/app/components/LoadingPanel"

import "@/src/app/styles/pageArea.css";
import "@/src/app/styles/controlArea.css";
import styles from "./page.module.css";
import { error } from "console";

export default function AnalysePage() {
  const [selectedModel, setSelectedModel] = useState<ItemSelectorEntity>();
  const [selectedDocument, setSelectedDocument] = useState<ItemSelectorEntity>();
  const [analysisResult, setAnalysisResult] = useState<JsonValue>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>()

  const documents = useDocuments();

  function getModelSelection() {
    return getModels().map((m) => ({
      id: m.name,
      label: m.desc,
    }));
  }

  async function handleDocumentSelected(document: ItemSelectorEntity) {
    setSelectedDocument(document);
  }

  async function handleModelSelected(model: ItemSelectorEntity) {
    setSelectedModel(model);
  }

  async function onAnalyzeDocument() {
    if (selectedModel && selectedDocument) {
      try {
        setIsLoading(true);

        const doc = await getDocumentAnalysis(
          selectedModel.id,
          selectedDocument.id,
        );
        setAnalysisResult(doc);

      } catch (err) {
        console.log(err);
        setHasError(true)
        setErrorMessage("error1");

      } finally {
        setIsLoading(false);
      }
    }
  }
  return (
    <div className="pageArea">
      <div className="pageTitle">Analysis Page</div>
      <div className={`controlArea ${styles.controlAreaFlex}`}>
        <ItemSelector
          title="Select a document:"
          itemArray={documents}
          onItemSelected={handleDocumentSelected}
        />
        <ItemSelector
          title="Select a model:"
          itemArray={getModelSelection()}
          onItemSelected={handleModelSelected}
        />
        <button className={styles.button} onClick={onAnalyzeDocument} disabled={isLoading}>
          {isLoading ? (<LoadingPanel message="Analyzing..." />) : "Analyze document"}
        </button>
      </div>
      {hasError ? <div>{errorMessage}</div> : <div>pas erreur</div>}
      <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
    </div>
  );
}
