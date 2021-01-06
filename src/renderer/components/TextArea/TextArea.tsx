import React from "react";
import styles from "./style.css";

interface TextAreaProps {
    name: string;
    label: string;
    value: string;
    link?: string;
    onChange: any;
    notValid?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = (props: TextAreaProps) => {
    return (
        <textarea
            className={styles.textBlock}
            id={props.name}
            name={props.name}
            onChange={props.onChange}
        ></textarea>
    );
};
