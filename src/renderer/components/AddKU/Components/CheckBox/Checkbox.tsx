import React from "react";
import styles from "./style.css";

interface CheckboxProps {
    label: string;
    name: string;
    value: string;
}

export const Checkbox: React.FC<CheckboxProps> = (props: CheckboxProps) => {
    return (
        <label className={styles.checkbox_container}>
            {props.label}
            <input type="checkbox" name={props.name} />
            <span className={styles.checkmark}></span>
        </label>
    );
};
