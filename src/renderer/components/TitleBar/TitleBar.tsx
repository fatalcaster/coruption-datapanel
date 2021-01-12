import React, { useState } from "react";
import styles from "./style.css";

interface TitleBarProps {
    onClose:
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
    onResize?:
        | ((event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
    dragClass?: string;
}

export const TitleBar: React.FC<TitleBarProps> = ({
    onClose,
    onResize,
    dragClass,
}) => {
    const [maximized, setMaximized] = useState(true);
    return (
        <div
            className={`${
                maximized ? styles.titleBar : styles.titleBar
            } ${dragClass}`}
            onDoubleClick={() => {
                if (onResize) onResize();
            }}
        >
            <div className={styles.pushRight}>
                {onResize !== undefined ? (
                    <button
                        className={styles.controls}
                        onClick={() => {
                            onResize();
                            setMaximized(!maximized);
                        }}
                    >
                        {maximized ? <i>&#xE923;</i> : <i>&#xE922;</i>}
                    </button>
                ) : null}

                <button
                    className={(styles.controls, styles.close)}
                    onClick={onClose}
                >
                    <i>&#xE894;</i>
                </button>
            </div>
        </div>
    );
};
