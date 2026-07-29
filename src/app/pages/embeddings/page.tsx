"use client";

import { useState } from "react";

import { LoadingPanel } from "@/src/app/components/LoadingPanel"
import { ErrorPanel } from "@/src/app/components/ErrorPanel"

import { ItemSelector } from "@/src/app/components/ItemSelector";
import { ItemSelectorEntity } from "@/src/app/types/ItemSelectorEntity";

import { useDocumentAnalysisNames } from "@/src/app/hooks/useDocumentAnalysisNames";

import { postCreateEmbeddings } from "@/src/api/embeddingsApi";
import { getDocumentAnalysis } from "@/src/api/documentsApi";

import type { RepoDocumentResponse } from "@/src/app/types/ApiResponses";

import "@/src/app/styles/pageArea.css";
import "@/src/app/styles/controlArea.css";

enum DisplayResult {
    None,
    Existing,
    New
}

export default function EmbeddingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [selectedItem, setSelectedItem] = useState<ItemSelectorEntity>();
    const [selectedDocument, setSelectedDocument] = useState<RepoDocumentResponse>();
    const [embeddingsResult, setEmbeddingsResult] = useState<string>("")
    const [displayResultEnum, setDisplayResultEnum] = useState<DisplayResult>(DisplayResult.None)

    const analysisDocumentNames = useDocumentAnalysisNames();

    function getDocumentAnalysisItems() {
        return analysisDocumentNames.map((m, index) => ({
            id: index.toString(),
            label: m
        }));
    }

    function parseJsonDocumentResult(document_result_json: string) {
        if (document_result_json)
            return JSON.stringify(JSON.parse(document_result_json), null, 2);
        else
            return "{no result to parse}"
    }
    async function handleDocumentSelected(item: ItemSelectorEntity) {

        setSelectedItem(item);

        try {
            const docName = analysisDocumentNames.find((d) => d === item.label);

            if (docName) {
                const document = await getDocumentAnalysis(docName);
                setSelectedDocument(document);
                setDisplayResultEnum(DisplayResult.Existing)
            }
        } catch (err) {

            setHasError(true)
            if (err instanceof Error) {
                setErrorMessage(err.message);
            } else {
                setErrorMessage(String(err));
            }
        }
    }

    async function onEmbbedText() {

        if (selectedItem) {
            try {
                setIsLoading(true);
                setHasError(false);
                setErrorMessage("");

                const result = await postCreateEmbeddings(
                    selectedItem.label
                );

                setEmbeddingsResult(JSON.stringify(result));
                setDisplayResultEnum(DisplayResult.New)

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
            <div className="pageTitle">Embeddings Page</div>
            <div className="controlArea">
                <ItemSelector
                    title="Select a document:"
                    itemArray={getDocumentAnalysisItems()}
                    onItemSelected={handleDocumentSelected}
                />
                <button className="buttons" onClick={onEmbbedText} disabled={isLoading}>
                    {isLoading ? (<LoadingPanel message="Analyzing..." />) : "Embed text"}
                </button>
            </div>
            <div>{hasError ? <ErrorPanel msg={errorMessage}></ErrorPanel> : <p></p>}</div>

            {displayResultEnum == DisplayResult.Existing ? (
                <div>
                    <h3>Existing Analysis Result:</h3>
                    <pre>
                        {selectedDocument ? parseJsonDocumentResult(selectedDocument.AnalysisResultJson) : <p></p>}
                    </pre>
                </div>
            ) : (
                <p>&nbsp;</p>
            )}

            {displayResultEnum == DisplayResult.New ? (
                <div>
                    <h3>New Analysis Result:</h3>
                    <pre>
                        {parseJsonDocumentResult(embeddingsResult)}
                    </pre>
                </div>
            ) : (
                <p>&nbsp;</p>
            )}

        </div>
    )
}
