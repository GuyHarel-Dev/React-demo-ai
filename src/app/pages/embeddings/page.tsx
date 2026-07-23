"use client";

import { useState } from "react";

import styles from "./page.module.css";

import { LoadingPanel } from "@/src/app/components/LoadingPanel"
import { ErrorPanel } from "@/src/app/components/ErrorPanel"

import "@/src/app/styles/pageArea.css";
import "@/src/app/styles/controlArea.css";

export default function EmbeddingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("")

    function onEmbbedText() {
        console.log("test")
    }

    return (
        <div className="pageArea">
            <div className="pageTitle">Embeddings Page</div>
            <div className={`controlArea ${styles.controlAreaFlex}`}>
                <button className={styles.button} onClick={onEmbbedText} disabled={isLoading}>
                    {isLoading ? (<LoadingPanel message="Analyzing..." />) : "Embed text"}
                </button>
            </div>
        </div>
    )
}