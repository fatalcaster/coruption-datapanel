import styles from "./style.css";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface PdfInputProps {
    name: string;
    value: string;
    link?: string;
    onChange: any;
    notValid?: boolean;
}

export const PdfInput: React.FC<PdfInputProps> = (props: PdfInputProps) => {
    return (
        <>
            <label htmlFor={props.name}>
                <FontAwesomeIcon
                    icon={faFilePdf}
                    className={styles.pdfIcon}
                    size="lg"
                />
            </label>
            <input
                name={props.name}
                onChange={props.onChange}
                type="file"
                id={props.name}
                className={styles.noDisplay}
            />
        </>
    );
};
