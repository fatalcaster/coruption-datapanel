import React from "react";
import styles from "./style.css";

interface UnderlineInputProps {
    name: string;
    placeholder: string;
    type: string;
    label: string;
    value: string;
    link?: string;
    onChange: any;
    required?: boolean;
    notValid?: boolean;
}

const UnderlineInput: React.FC<UnderlineInputProps> = (props) => {
    return (
        <>
            <label className={styles.label} htmlFor={props.name}>
                <span className={styles.hidden}>{props.label}</span>
            </label>
            <input
                className={`${styles.input} ${
                    props.notValid ? styles.invalid : undefined
                }`}
                id={props.name}
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                onChange={props.onChange}
                required={props.required}
                value={props.value}
            />
        </>
    );
};

export default UnderlineInput;
