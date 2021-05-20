import React from "react";
import styles from "./style.css";

interface CheckboxProps {
    label: string;
    name: string;
    value: boolean;
    onChange: any;
}

export const Checkbox: React.FC<CheckboxProps> = (props: CheckboxProps) => {
    return (
        <label className={styles.checkbox_container}>
            {props.label}
            <input
                type="checkbox"
                name={props.name}
                onChange={props.onChange}
                id={props.name}
                checked={props.value}
            />
            <span className={styles.checkmark}></span>
        </label>
    );
};
