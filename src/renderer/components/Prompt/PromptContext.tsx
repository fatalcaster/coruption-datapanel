import React, { useContext, useState, ReactNode, useEffect } from "react";

interface IChildren {
    children?: ReactNode;
}

interface PromptUpdateProvider extends IChildren {
    setVisible: () => void;
    setInvisible: () => void;
}

const PromptContext = React.createContext<boolean | null>(null);

const PromptVisibilityUpdate = React.createContext<PromptUpdateProvider | null>(
    null
);

export function usePromptVisibility() {
    return useContext(PromptContext);
}

export function usePromptVisibilityUpdate() {
    return useContext(PromptVisibilityUpdate);
}

export function PromptProvider({ children }: IChildren) {
    const [visible, setVisibility] = useState(false);

    const setInvisible = () => {
        setVisibility(false);
    };

    const setVisible = async () => {
        setVisibility(true);
    };

    return (
        <PromptContext.Provider value={visible}>
            <PromptVisibilityUpdate.Provider
                value={{ setVisible, setInvisible }}
            >
                {children}
            </PromptVisibilityUpdate.Provider>
        </PromptContext.Provider>
    );
}
