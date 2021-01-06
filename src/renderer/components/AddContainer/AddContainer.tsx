import React, { useState } from "react";
import Draggable from "react-draggable";
import { AddKULayout } from "../AddKU/AddKULayout/AddKULayout";
import styles from "./style.css";

interface AddContainerProps {
    onClose:
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
}

export const AddContainer: React.FC<AddContainerProps> = ({
    onClose,
    // children,
}) => {
    const [maximized, setMaximizedLayout] = useState(false);

    return (
        <Draggable
            enableUserSelectHack={false}
            scale={1.2}
            handle=".TITLEBAR"
            bounds={{
                left: maximized ? -200 : -500,
                top: maximized ? -150 : -500,
            }}
        >
            <div
                className={`${styles.container} ${
                    !maximized ? styles.minimized : undefined
                }`}
            >
                <AddKULayout
                    onClose={onClose}
                    onResize={() => setMaximizedLayout(!maximized)}
                />
            </div>
        </Draggable>
    );
};
