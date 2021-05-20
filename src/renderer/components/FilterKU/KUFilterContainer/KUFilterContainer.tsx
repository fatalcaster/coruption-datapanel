import React from "react";
import Draggable from "react-draggable";
import { AddKULayout } from "../../AddKU/AddKULayout/AddKULayout";
import Prompt from "../../Prompt/Prompt";
import {
    PromptProvider,
    usePromptVisibilityUpdate,
} from "../../Prompt/PromptContext";
import { WindowHelper } from "../../WindowHelper/WindowHelper";
import { KUFilterLayout } from "../KUFilterLayout/KUFilterLayout";
import styles from "./style.css";

interface KUFilterContainerProps {
    onClose:
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
}

export const KUFilterContainer: React.FC<KUFilterContainerProps> = React.memo(
    ({ onClose }) => {
        return <WindowHelper onClose={onClose} children={KUFilterLayout} />;
    }
);
