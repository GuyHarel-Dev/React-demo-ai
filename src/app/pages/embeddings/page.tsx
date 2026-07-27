"use client";

import { useState } from "react";

import { LoadingPanel } from "@/src/app/components/LoadingPanel"
import { ErrorPanel } from "@/src/app/components/ErrorPanel"

import { ItemSelector } from "@/src/app/components/ItemSelector";
import { ItemSelectorEntity } from "@/src/app/types/ItemSelectorEntity";

import { useDocumentAnalysisNames } from "@/src/app/hooks/useDocumentAnalysisNames";

import { postCreateEmbeddings } from "@/src/api/embeddingsApi";

import "@/src/app/styles/pageArea.css";
import "@/src/app/styles/controlArea.css";

export default function EmbeddingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [selectedItem, setSelectedItem] = useState<ItemSelectorEntity>();
    const [embeddingsResult, setEmbeddingsResult] = useState<string>("")

    const documents = useDocumentAnalysisNames();

    async function handleDocumentSelected(item: ItemSelectorEntity) {
        setSelectedItem(item);
    }

    async function onEmbbedText() {

        if (selectedItem) {
            try {
                setIsLoading(true);
                setHasError(false);
                setErrorMessage("");

                const result = await postCreateEmbeddings(
                    selectedItem.id,
                    selectedItem.label
                );

                setEmbeddingsResult(JSON.stringify(result));

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
                    itemArray={documents}
                    onItemSelected={handleDocumentSelected}
                />
                <button className="buttons" onClick={onEmbbedText} disabled={isLoading}>
                    {isLoading ? (<LoadingPanel message="Analyzing..." />) : "Embed text"}
                </button>
            </div>
            <div>{hasError ? <ErrorPanel msg={errorMessage}></ErrorPanel> : <p></p>}</div>
            <pre>{embeddingsResult}</pre>
        </div>
    )
}