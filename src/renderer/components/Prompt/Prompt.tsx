import React from "react";
import { TitleBar } from "../TitleBar/TitleBar";
import styles from "./style.css";
import {
    usePromptVisibility,
    usePromptVisibilityUpdate,
} from "./PromptContext";

interface PromptProps {
    onClose:
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
    maximized?: boolean;
    prompt: string;
    button_confirm: string;
    button_cancel: string;
}

const Prompt: React.FC<PromptProps> = ({
    maximized,
    onClose,
    prompt,
    button_cancel,
    button_confirm,
}) => {
    const visible = usePromptVisibility();
    const updateVisibility = usePromptVisibilityUpdate();

    return visible ? (
        <div
            className={`${styles.exit} ${
                !maximized ? styles.exit_minimized : undefined
            }`}
        >
            <TitleBar onClose={() => updateVisibility?.setInvisible()} />
            <div className={styles.buttonClosePrompt}>
                <div className={styles.promptText}>
                    <p>{prompt}</p>
                </div>

                <div className={styles.buttonContainer}>
                    <button className={`${styles.close}`} onClick={onClose}>
                        {button_confirm}
                    </button>
                    <button
                        className={`${styles.button}`}
                        onClick={() => updateVisibility?.setInvisible()}
                    >
                        {button_cancel}
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
};

export default Prompt;
