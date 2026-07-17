import styles from "./LoadingPanel.module.css";

interface LoadingPanelProps {
    message?: string
}

export function LoadingPanel({
    message = "(loading....)" }: LoadingPanelProps) {

    return (
        <div
            className={styles.container}
            role="status"
            aria-live="polite"
            aria-busy="true"
        >
            <div className={styles.spinner} aria-hidden="true" />
            <span className={styles.message}>{message}</span>
        </div>
    );
}