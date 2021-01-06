import React, { useState } from "react";
import { AddKuLeft } from "../AddKULeft/AddKuLeft";
import { AddKuRight } from "../AddKURight/AddRight";
import { TitleBar } from "./../../TitleBar/TitleBar";
import styles from "./style.css";

interface AddKULayoutProps {
    onClose:
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
    onResize?:
        | ((event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
}

export const AddKULayout: React.FC<AddKULayoutProps> = ({
    onClose,
    onResize,
}) => {
    const [row, setLayout] = useState(false);

    return (
        <div
            className={`${styles.containerMain} 
            `}
        >
            <TitleBar
                onClose={onClose}
                onResize={() => {
                    onResize!();
                    setLayout(!row);
                }}
            />

            <div className={styles.spaceBox}></div>
            <div className={row ? styles.rowContainer : styles.columnContainer}>
                <div className={styles.containerLeft}>
                    <AddKuLeft />
                </div>
                <div
                    className={`${styles.containerRight} ${
                        !row ? styles.mTop : undefined
                    }`}
                >
                    <AddKuRight />
                </div>
            </div>
        </div>
    );
};
