import React from "react";
import styles from "./styles.css";

interface InputFieldProps {
    name: string;
    placeholder: string;
    type: string;
    label: string;
    value: string;
    link?: string;
    onChange: any;
}

const InputField: React.FC<InputFieldProps> = (props) => {
    return (
        <>
            <label className={styles.label} htmlFor={props.name}>
                <span className={styles.hidden}>{props.label}</span>
            </label>
            <input
                value={props.value}
                className={styles.input_form}
                id={props.name}
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                onChange={props.onChange}
                //onInvalid=this.setCustomValidity('Ово поље је обавезно!')
            />
        </>
    );
};

export default InputField;
