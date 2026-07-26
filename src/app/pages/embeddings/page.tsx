"use client";

import { useState } from "react";

import { LoadingPanel } from "@/src/app/components/LoadingPanel"
import { ErrorPanel } from "@/src/app/components/ErrorPanel"

import { ItemSelector } from "@/src/app/components/ItemSelector";
import { ItemSelectorEntity } from "@/src/app/types/ItemSelectorEntity";

import { useDocuments } from "@/src/app/hooks/useDocuments";

import { postCreateEmbeddings } from "@/src/api/embeddingService";

import "@/src/app/styles/pageArea.css";
import "@/src/app/styles/controlArea.css";

export default function EmbeddingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [selectedDocument, setSelectedDocument] = useState<ItemSelectorEntity>();
    const [embeddingsResult, setEmbeddingsResult] = useState<string>("")

    const documents = useDocuments();

    async function handleDocumentSelected(item: ItemSelectorEntity) {
        const documentName = documents.find((d) => d.id === item.id);
        setSelectedDocument(documentName);
        console.log(selectedDocument)
    }

    async function onEmbbedText() {

        if (selectedDocument) {
            try {
                setIsLoading(true);
                setHasError(false);
                setErrorMessage("");

                const result = await postCreateEmbeddings(
                    selectedDocument.id,
                    selectedDocument.label
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