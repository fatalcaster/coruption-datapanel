import React from "react";
import styles from "./style.css";

interface DropDownInputProps {
    options: string[];
    name: string;
    listOf: string;
    label: string;
    value?: string;
    link?: string;
    onChange: any;
    notValid?: boolean;
    placeholder?: string;
}

export const DropDownInput: React.FC<DropDownInputProps> = (
    props: DropDownInputProps
) => {
    return (
        <div>
            <input
                placeholder={props.placeholder}
                className={styles.listInput}
                list={props.listOf}
                name={props.name}
                onChange={props.onChange}
            />
            <datalist id={props.listOf} className={styles.listInput}>
                {props.options.map((option, key) => (
                    <option key={key} value={option}></option>
                ))}
            </datalist>
        </div>
    );
};
