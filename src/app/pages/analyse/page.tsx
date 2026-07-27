"use client";

import { useState } from "react";

import { ItemSelector } from "@/src/app/components/ItemSelector";
import { ItemSelectorEntity } from "@/src/app/types/ItemSelectorEntity";

import { useDocumentAnalysisNames } from "@/src/app/hooks/useDocumentAnalysisNames";
import { postAnalyseDocument } from "@/src/api/documentsApi";
import { JsonValue } from "@/src/app/types/JsonValue";
import { LoadingPanel } from "@/src/app/components/LoadingPanel"
import { ErrorPanel } from "@/src/app/components/ErrorPanel"

import { LLM_MODELS } from "@/src/app/config/models";

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

  const analysisDocumentNames = useDocumentAnalysisNames();

  function getModelsSelection() {
    return LLM_MODELS.map((m) => ({
      id: m.name,
      label: m.desc,
    }));
  }

  function getDocumentAnalysisSelection() {
    return analysisDocumentNames.map((m, index) => ({
      id: index.toString(),
      label: m
    }));

  }
  
  async function handleSaveAnalysisChecked(event: React.ChangeEvent<HTMLInputElement>) {
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

        const doc = await postAnalyseDocument(
          selectedModel.id,
          selectedDocument.label,
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
          itemArray={getDocumentAnalysisSelection()}
          onItemSelected={handleDocumentSelected}
        />
        <ItemSelector
          title="Select a model:"
          itemArray={getModelsSelection()}
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
