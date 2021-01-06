import React from "react";
import styles from "./style.css";
interface AddDamagedProps {
    onClose:
        | ((event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
    onSubmit: (
        id: string,
        name: string,
        surname: string,
        fatherName: string,
        birth_place: string,
        residence: string
    ) => void | undefined;
}

export const AddDamaged: React.FC<AddDamagedProps> = ({
    onClose,
    onSubmit,
}) => {
    return (
        <div className={styles.buttonLater}>
            <table>
                <tbody>
                    <tr>
                        <td colSpan={2} className={styles.addReportedCell}>
                            <button
                                className={`${styles.buttons} ${styles.save}`}
                                type="submit"
                            >
                                Физичко лице
                            </button>
                            <button
                                className={`${styles.buttons} ${styles.save}`}
                                onClick={onClose}
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
