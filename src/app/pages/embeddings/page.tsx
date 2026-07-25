"use client";

import { useState } from "react";

import styles from "./page.module.css";

import { LoadingPanel } from "@/src/app/components/LoadingPanel"
import { ErrorPanel } from "@/src/app/components/ErrorPanel"

import { ItemSelector } from "@/src/app/components/ItemSelector";
import { ItemSelectorEntity } from "@/src/app/types/ItemSelectorEntity";

import { useDocuments } from "@/src/app/hooks/useDocuments";

import "@/src/app/styles/pageArea.css";
import "@/src/app/styles/controlArea.css";

export default function EmbeddingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [selectedDocument, setSelectedDocument] = useState<ItemSelectorEntity>();

    const documents = useDocuments();

    async function handleDocumentSelected(item: ItemSelectorEntity) {
        const documentName = documents.find((d) => d.id === item.id);
        setSelectedDocument(documentName);
        console.log(selectedDocument)
    }

    function onEmbbedText() {
        console.log("onEmbbedText")
    }

    return (
        <div className="pageArea">
            <div className="pageTitle">Embeddings Page</div>
            <div className={`controlArea ${styles.controlAreaFlex}`}>
                <ItemSelector
                    title="Select a document:"
                    itemArray={documents}
                    onItemSelected={handleDocumentSelected}
                />
                <div>{hasError ? <ErrorPanel msg={errorMessage}></ErrorPanel> : <p></p>}</div>
                <button className={styles.button} onClick={onEmbbedText} disabled={isLoading}>
                    {isLoading ? (<LoadingPanel message="Analyzing..." />) : "Embed text"}
                </button>
            </div>
        </div>
    )
}