import styles from "./ErrorPanel.module.css";

interface ErrorPanelProps {
    message?: string
}

export function  DisplayErrorPanel({
    message}: ErrorPanelProps) {

    return (
        <div>
            <p>Error:</p>
            <p>{message}</p>
        </div>
    );
}