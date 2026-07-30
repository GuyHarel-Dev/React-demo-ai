"use client";

import { useState } from "react";

import "@/src/app/styles/pageArea.css";
import "@/src/app/styles/controlArea.css";

import styles from "./page.module.css";

import { LoadingPanel } from "@/src/app/components/LoadingPanel"
import { ErrorPanel } from "@/src/app/components/ErrorPanel"

import { ItemSelector } from "@/src/app/components/ItemSelector";
import { ItemSelectorEntity } from "@/src/app/types/ItemSelectorEntity";


import { useDocumentAnalysisNames } from "@/src/app/hooks/useDocumentAnalysisNames";

import { postSearchDocument } from "@/src/api/embeddingsApi";
import { JsonValue } from "@/src/app/types/JsonValue";

export default function EmbeddingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [selectedItem, setSelectedItem] = useState<ItemSelectorEntity>();
    const [searchPrompt, setSearchPrompt] = useState<string>("");
    const [searchResult, setSearchResult] = useState<JsonValue>();

    const analysisDocumentNames = useDocumentAnalysisNames();

    async function onSearchDocument() {

        if (selectedItem) {
            try {
                setIsLoading(true);
                setHasError(false);
                setErrorMessage("");


                const result = await postSearchDocument(
                    selectedItem?.label,
                    searchPrompt)

                setSearchResult(result)

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


    async function handleDocumentSelected(item: ItemSelectorEntity) {

        setSelectedItem(item);

    }

    function getDocumentAnalysisItems() {
        return analysisDocumentNames.map((m, index) => ({
            id: index.toString(),
            label: m
        }));
    }

    return (
        <div>
            <div className="pageArea">
                <div className="pageTitle">Semantic Page</div>
                <div className="controlArea">
                    <ItemSelector
                        title="Select a document:"
                        itemArray={getDocumentAnalysisItems()}
                        onItemSelected={handleDocumentSelected}
                    />


                </div>
                <div className="controlArea">
                    <label htmlFor="searchPrompt">
                        Search prompt:
                    </label>

                    <input className={styles.searchInput}
                        id="searchPrompt"
                        type="text"
                        value={searchPrompt}
                        placeholder="Enter a search prompt..."
                        onChange={(e) => setSearchPrompt(e.target.value)}
                    />

                    <button className="buttons" onClick={onSearchDocument} disabled={isLoading}>
                        {isLoading ? (<LoadingPanel message="Analyzing..." />) : "Analyze document"}
                    </button>
                </div>
                <pre>{JSON.stringify(searchResult, null, 2)}</pre>
            </div>
            <div>{hasError ? <ErrorPanel msg={errorMessage}></ErrorPanel> : <p></p>}</div>
        </div>
    )
}