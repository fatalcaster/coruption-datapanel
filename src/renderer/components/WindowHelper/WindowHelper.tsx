import React from "react";
import Draggable from "react-draggable";
import { AddKULayout } from "../AddKU/AddKULayout/AddKULayout";
import Prompt from "../Prompt/Prompt";
import {
    PromptProvider,
    usePromptVisibilityUpdate,
} from "../Prompt/PromptContext";
import styles from "./style.css";

interface PromptProperties {
    prompt: string;
    cancel: string;
    confirm: string;
}

interface WindowHelperProps {
    children: any;
    onClose:
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
    prompt?: PromptProperties;
    data?: any;
}

export const WindowHelperHelper: React.FC<WindowHelperProps> = ({
    onClose,
    children,
    prompt,
    data,
}) => {
    // const [maximized, setMaximizedLayout] = useState(false);
    const Child = children;
    const updatePromptVisibility = usePromptVisibilityUpdate();

    // console.log("test" + updatePromptVisibility);
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
                {prompt ? (
                    <Prompt
                        prompt={prompt.prompt}
                        onClose={onClose}
                        button_cancel={prompt.cancel}
                        button_confirm={prompt.confirm}
                    />
                ) : null}
                <Child
                    onClose={
                        prompt
                            ? () => updatePromptVisibility?.setVisible()
                            : onClose
                    }
                    data={data}
                />
            </div>
        </Draggable>
    );
};

export const WindowHelper: React.FC<WindowHelperProps> = React.memo(
    ({ onClose, prompt, children, data }) => {
        return (
            <PromptProvider>
                <WindowHelperHelper
                    children={children}
                    onClose={onClose}
                    prompt={prompt}
                    data={data}
                />
            </PromptProvider>
        );
    }
);
