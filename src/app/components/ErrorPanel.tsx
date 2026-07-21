import "@/src/app/styles/errorArea.css";

interface ErrorPanelProps {
    msg: string
}

export function  ErrorPanel({
    msg}: ErrorPanelProps) {

    return (
        <div className="errorArea">
            <p>{msg}</p>
        </div>
    );
}