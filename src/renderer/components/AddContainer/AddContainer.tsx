import React from "react";
import Draggable from "react-draggable";
import { AddKULayout } from "../AddKU/AddKULayout/AddKULayout";
import Prompt from "../Prompt/Prompt";
import {
    PromptProvider,
    usePromptVisibilityUpdate,
} from "../Prompt/PromptContext";
import styles from "./style.css";

interface AddContainerProps {
    onClose:
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
}

export const AddContainerHelper: React.FC<AddContainerProps> = ({
    onClose,
}) => {
    // const [maximized, setMaximizedLayout] = useState(false);
    const updatePromptVisibility = usePromptVisibilityUpdate();

    console.log("test" + updatePromptVisibility);
    return (
        <Draggable
            enableUserSelectHack={false}
            scale={1.2}
            handle=".TITLEBAR-ADD"
            bounds={{
                left: -500,
                top: -300,
            }}
        >
            <div className={`${styles.container} ${styles.minimized}`}>
                <Prompt
                    prompt={"Да ли сте сигурни да желите да напустите форму?"}
                    onClose={onClose}
                    button_cancel={"Откажи"}
                    button_confirm={"Напусти"}
                />
                <AddKULayout
                    onClose={() => updatePromptVisibility?.setVisible()}
                />
            </div>
        </Draggable>
    );
};

export const AddContainer: React.FC<AddContainerProps> = ({ onClose }) => {
    return (
        <PromptProvider>
            <AddContainerHelper onClose={onClose} />
        </PromptProvider>
    );
};
