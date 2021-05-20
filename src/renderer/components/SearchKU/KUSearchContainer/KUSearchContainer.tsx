import React from "react";
import Draggable from "react-draggable";
import { AddKULayout } from "../../AddKU/AddKULayout/AddKULayout";
import Prompt from "../../Prompt/Prompt";
import {
    PromptProvider,
    usePromptVisibilityUpdate,
} from "../../Prompt/PromptContext";
import { WindowHelper } from "../../WindowHelper/WindowHelper";
import { KUSearchLayout } from "./../KUSearchLayout/KUSearchLayout";
import styles from "./style.css";

interface KUFilterContainerProps {
    onClose:
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
}

export const KUSearchContainer: React.FC<KUFilterContainerProps> = React.memo(
    ({ onClose }) => {
        return <WindowHelper onClose={onClose} children={KUSearchLayout} />;
    }
);
