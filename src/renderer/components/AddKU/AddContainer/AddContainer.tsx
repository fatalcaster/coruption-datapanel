import React from "react";
import { AddKULayout } from "../AddKULayout/AddKULayout";

import { WindowHelper } from "../../WindowHelper/WindowHelper";
import { KUData } from "../../../../main/Helpers/DataTypes";

interface AddContainerProps {
    onClose:
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
    data: KUData | undefined;
}

export const AddContainer: React.FC<AddContainerProps> = React.memo(
    ({ onClose, data }) => {
        const prompt = {
            prompt: "Да ли сте сигурни да желите да напустите форму?",
            confirm: "Напусти",
            cancel: "Откажи",
        };
        return (
            <WindowHelper
                onClose={onClose}
                children={AddKULayout}
                prompt={prompt}
                data={data}
            />
        );
    }
);
