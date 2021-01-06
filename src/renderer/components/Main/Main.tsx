import React from "react";
import styles from "./../../style.css";
interface MainProps {}

export const Main: React.FC<MainProps> = (props) => {
    return <div className={styles.body}>{props.children}</div>;
};
