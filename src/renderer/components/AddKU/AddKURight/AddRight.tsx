import React, { useState } from "react";
import { CalendarField } from "../../CalendarField/CalendarField";
import styles from "./style.css";

import { Field, Formik } from "formik";
import UnderlineInput from "../../UnderlineInput/UnderlineInput";
import { LSNumberTable } from "../Components/LSNumber/Table/LSNumberTable";
import { TakenItemsTable } from "../Components/TakenItems/Table/TakenItemsTable";
import { DropDownInput } from "../../DropDownInput/DropDownInput";
import { TextArea } from "../../TextArea/TextArea";

interface AddKuRightProps {}

export const AddKuRight: React.FC<AddKuRightProps> = ({}) => {
    const [euros, setCurrency] = useState(false);

    return (
        <Formik
            initialValues={{
                ku_number: "",
            }}
            onSubmit={() => {}}
        >
            <table className={styles.KUMainLeftTable}>
                <tbody>
                    <tr>
                        <td className={styles.titleColumn}></td>
                        <td className={styles.al}>
                            <LSNumberTable />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.titleColumn}>
                            <h4>ОДУЗЕТИ ПРЕДМЕТИ</h4>
                        </td>
                        <td>
                            <TakenItemsTable />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.titleColumn}>
                            <h4>ДОСТАВЉЕНО СКА</h4>
                        </td>
                        <td className={styles.al}>
                            <div className={styles.calendarContainer}>
                                <Field name="ska_date" as={CalendarField} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.titleColumn}>
                            <h4>ВЕЗА (ПО, ОО)</h4>
                        </td>
                        <td>
                            <Field
                                name="po_bond"
                                type="input"
                                as={UnderlineInput}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.titleColumn}>
                            <h4>ЗАДУЖЕН РАДНИК</h4>
                        </td>
                        <td>
                            <Field
                                name="clerk"
                                type="input"
                                as={DropDownInput}
                                listOf="clerks"
                                options={["Маја Миловић", "Јелена Трајковић"]}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.titleColumn}>
                            <h4>НАПОМЕНА</h4>
                        </td>
                        <td>
                            <Field name="ku_note" type="input" as={TextArea} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <div className={styles.KUMainButtonsCell}>
                                <button
                                    className={`${styles.buttons} ${styles.save}`}
                                    type="submit"
                                >
                                    Сачувај
                                </button>

                                <button
                                    className={`${styles.buttons} ${styles.close}`}
                                >
                                    Откажи
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Formik>
    );
};
