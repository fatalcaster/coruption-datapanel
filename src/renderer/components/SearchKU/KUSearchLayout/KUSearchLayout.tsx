import { Field, Formik } from "formik";
import React, { useState } from "react";
import { CalendarField } from "../../CalendarField/CalendarField";
import UnderlineInput from "../../UnderlineInput/UnderlineInput";

import { TitleBar } from "../../TitleBar/TitleBar";
import styles from "./style.css";
import { ipcRenderer } from "electron";

interface KUSearchLayoutProps {
    onClose:
        | ((event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
    onResize?:
        | ((event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
}

export const KUSearchLayout: React.FC<KUSearchLayoutProps> = React.memo(
    ({ onClose }) => {
        //Lifted state from CriminalActs Table
        const [criminalActs, setActsList] = useState<string[]>();

        return (
            <div
                className={`${styles.containerMain}
            `}
            >
                <TitleBar onClose={onClose} dragClass={"TITLEBAR-ADD"} />

                <div className={styles.spaceBox}></div>
                <Formik
                    initialValues={{
                        input_date: "",
                        delivery_vjt: "",
                        delivery_ska: "",
                        ku_number: "",
                        case_number: "",
                        note: "",
                    }}
                    onSubmit={async (values, actions) => {
                        console.log("SUBMITING");
                        ipcRenderer.send("ku-search-request", { values });
                        // console.log("VALUES: \n", values);
                    }}
                >
                    {(props) => (
                        <div className={styles.columnContainer}>
                            <div className={styles.containerLeft}>
                                <form onSubmit={props.handleSubmit}>
                                    <table className={styles.KUMainLeftTable}>
                                        <tbody>
                                            <tr>
                                                <td
                                                    className={
                                                        styles.titleColumn
                                                    }
                                                >
                                                    <h4>ДАТУМ УНОСА</h4>
                                                </td>
                                                <td>
                                                    <Field
                                                        name="input_date"
                                                        type="input"
                                                        as={CalendarField}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    className={
                                                        styles.titleColumn
                                                    }
                                                >
                                                    <h4>
                                                        ДАТУМ ДОСТАВЉАЊА ВЈТ
                                                    </h4>
                                                </td>
                                                <td>
                                                    <Field
                                                        name="delivery_vjt"
                                                        type="input"
                                                        as={CalendarField}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    className={
                                                        styles.titleColumn
                                                    }
                                                >
                                                    <h4>
                                                        ДАТУМ ДОСТАВЉАЊА СКА
                                                    </h4>
                                                </td>
                                                <td>
                                                    <Field
                                                        name="delivery_ska"
                                                        type="input"
                                                        as={CalendarField}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    className={
                                                        styles.titleColumn
                                                    }
                                                >
                                                    <h4>КУ БРОЈ</h4>
                                                </td>
                                                <td>
                                                    <Field
                                                        name="ku_number"
                                                        type="input"
                                                        as={UnderlineInput}
                                                    />
                                                </td>
                                                <td
                                                    className={
                                                        styles.titleColumn
                                                    }
                                                >
                                                    <h4>БРОЈ</h4>
                                                </td>
                                                <td>
                                                    <Field
                                                        name="case_number"
                                                        type="input"
                                                        as={UnderlineInput}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    className={
                                                        styles.titleColumn
                                                    }
                                                >
                                                    <h4>НАПОМЕНА</h4>
                                                </td>
                                                <td>
                                                    <Field
                                                        name="note"
                                                        type="input"
                                                        as={UnderlineInput}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className={styles.KUMainButtonsCell}>
                                        <button
                                            className={`${styles.buttons} ${styles.save}`}
                                            type="submit"
                                            disabled={props.isSubmitting}
                                        >
                                            Претражи
                                        </button>
                                        <button
                                            type="button"
                                            className={`${styles.buttons} ${styles.close}`}
                                            onClick={() => {
                                                ipcRenderer.send(
                                                    "ku-display-request",
                                                    { return: false }
                                                );
                                                onClose!();
                                            }}
                                        >
                                            Откажи
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </Formik>
            </div>
        );
    }
);
