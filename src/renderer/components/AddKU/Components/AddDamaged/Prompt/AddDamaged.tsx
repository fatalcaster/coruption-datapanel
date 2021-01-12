import React, { useState } from "react";
import { AddIndividual } from "../FormIndividual/AddIndividual";
import { AddLegalEntity } from "../FormLegalEntity/AddLegalEntity";
import styles from "./style.css";
interface AddDamagedProps {
    onClose:
        | ((event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
    onSubmit: {
        onSubmitIndividual: (
            id: string,
            name: string,
            surname: string,
            fatherName: string,
            residence: string
        ) => void | undefined;
        onSubmitLegalEntity: (
            id: string,
            name: string,
            address: string
        ) => void | undefined;
    };
}

export const AddDamaged: React.FC<AddDamagedProps> = ({
    onClose,
    onSubmit,
}) => {
    const [damageType, setDamageType] = useState(0);
    const { onSubmitIndividual, onSubmitLegalEntity } = onSubmit;
    const switchIndividual = () => {
        setDamageType(1);
    };
    const switchLegalEntity = () => {
        setDamageType(2);
    };
    if (damageType === 1)
        return (
            <AddIndividual
                onClose={() => {
                    if (onClose) onClose();
                }}
                onSubmit={onSubmitIndividual}
            />
        );
    if (damageType === 2)
        return (
            <AddLegalEntity
                onClose={() => {
                    if (onClose) onClose();
                }}
                onSubmit={onSubmitLegalEntity}
            />
        );
    return (
        <div className={styles.buttonLater}>
            <table>
                <tbody>
                    <tr>
                        <td colSpan={2} className={styles.addReportedCell}>
                            <button
                                className={`${styles.buttons} ${styles.save}`}
                                onClick={switchIndividual}
                            >
                                Физичко лице
                            </button>
                            <button
                                className={`${styles.buttons} ${styles.save}`}
                                onClick={switchLegalEntity}
                            >
                                Правно лице
                            </button>
                            <button
                                className={`${styles.buttons} ${styles.close}`}
                                onClick={onClose}
                            >
                                Откажи
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
