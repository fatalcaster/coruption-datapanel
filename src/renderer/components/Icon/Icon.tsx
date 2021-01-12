import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface IconProps {
    icon: IconDefinition;
    padding: string;
    margin: string;
}

export const Icon: React.FC<IconProps> = ({ icon }) => {
    return (
        <div>
            <FontAwesomeIcon icon={icon} size="lg" />
        </div>
    );
};
