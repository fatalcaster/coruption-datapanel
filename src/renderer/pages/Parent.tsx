import React from "react";
import styles from "./../style.css";

interface ParentProps {}

export const Parent: React.FC<ParentProps> = ({ children }) => {
    return <div className={styles.body}>{children}</div>;
};
