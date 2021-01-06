import React from "react";
import styles from "./style.css";

interface ErrorFieldProps {
    text: string;
}

export const ErrorField: React.FC<ErrorFieldProps> = ({ text }) => {
    return <p className={styles.errorText}>{text}</p>;
};
