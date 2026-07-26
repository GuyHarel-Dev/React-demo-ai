"use client";

import { useState } from "react";

import { ItemSelector } from "@/src/app/components/ItemSelector";
import { ItemSelectorEntity } from "@/src/app/types/ItemSelectorEntity";

import { useRepositoryDocuments } from "@/src/app/hooks/useRepositoryDocuments";
import { postCreateDocumentAnalysis, getModels } from "@/src/api/documentsService";
import { JsonValue } from "@/src/app/types/JsonValue";
import { LoadingPanel } from "@/src/app/components/LoadingPanel"
import { ErrorPanel } from "@/src/app/components/ErrorPanel"

import "@/src/app/styles/pageArea.css";
import "@/src/app/styles/controlArea.css";

export default function AnalysePage() {
  const [selectedModel, setSelectedModel] = useState<ItemSelectorEntity>();
  const [selectedDocument, setSelectedDocument] = useState<ItemSelectorEntity>();
  const [analysisResult, setAnalysisResult] = useState<JsonValue>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [saveAnalysisChecked, setSaveAnalysisChecked] = useState(false);

  const documents = useRepositoryDocuments();

  function getModelSelection() {
    return getModels().map((m) => ({
      id: m.name,
      label: m.desc,
    }));
  }

  async function handleSaveAnalysisChecked(event:  React.ChangeEvent<HTMLInputElement>) {
    const isChecked = event.target.checked;

    setSaveAnalysisChecked(isChecked)

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
        setHasError(false);
        setErrorMessage("");

        const doc = await postCreateDocumentAnalysis(
          selectedModel.id,
          selectedDocument.id,
          saveAnalysisChecked
        );
        setAnalysisResult(doc);

      } catch (err) {

        setHasError(true)
        if (err instanceof Error) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage(String(err));
        }

      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="pageArea">
      <div className="pageTitle">Analysis Page</div>
      <div className="controlArea">
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
        <button className="buttons" onClick={onAnalyzeDocument} disabled={isLoading}>
          {isLoading ? (<LoadingPanel message="Analyzing..." />) : "Analyze document"}
        </button>

        <label>
          <input type="checkbox"                
              checked={saveAnalysisChecked}
              onChange={(e) => handleSaveAnalysisChecked(e)} />
          Save analysis
        </label>

      </div>
      <div>{hasError ? <ErrorPanel msg={errorMessage}></ErrorPanel> : <p></p>}</div>
      <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
    </div>
  );
}
