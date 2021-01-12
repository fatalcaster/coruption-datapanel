import { Field, Formik } from "formik";
import React from "react";
import { CalendarField } from "../../CalendarField/CalendarField";
import { DropDownInput } from "../../DropDownInput/DropDownInput";
import { PdfInput } from "../../PdfInput/PdfInput";
import { TextArea } from "../../TextArea/TextArea";
import UnderlineInput from "../../UnderlineInput/UnderlineInput";
import { AddDamagedTable } from "../Components/AddDamaged/Table/AddDamagedTable";
import { AddReportedTable } from "../Components/AddReported/Table/AddReportedTable";
import { Checkbox } from "../Components/CheckBox/Checkbox";
import { CriminalActsTable } from "../Components/CriminalActs/Table/CriminalActsTable";
import { LSNumberTable } from "../Components/LSNumber/Table/LSNumberTable";
import { TakenItemsTable } from "../Components/TakenItems/Table/TakenItemsTable";
import { TitleBar } from "./../../TitleBar/TitleBar";
import styles from "./style.css";
import stylesLeft from "./styleLeft.css";
import stylesRight from "./styleRight.css";
import { notEmpty } from "./../../../ValidationFunctions/ValidationFunctions";

interface AddKULayoutProps {
    onClose:
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
    onResize?:
        | ((event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
}

export const AddKULayout: React.FC<AddKULayoutProps> = ({ onClose }) => {
    return (
        <div
            className={`${styles.containerMain} 
            `}
        >
            <TitleBar onClose={onClose} dragClass={"TITLEBAR-ADD"} />

            <div className={styles.spaceBox}></div>
            <Formik
                initialValues={{
                    ku_number: "",
                    ku_file: "",
                    case_number: "",
                    ku_inserting_date: "",
                    depravation: false,
                    imprisoning: false,
                    forfeiture: false,
                    ku_delivering_date: "",
                    ska_date: "",
                    po_bond: "",
                    materialDamage: "",
                    euros: false,
                    ku_note: "",
                }}
                onSubmit={async (data, actions) => {
                    actions.setSubmitting(true);
                    console.log(data.ku_file);
                }}
            >
                {(props) => (
                    <div className={styles.columnContainer}>
                        <div className={styles.containerLeft}>
                            <table className={stylesLeft.KUMainLeftTable}>
                                <tbody>
                                    <tr>
                                        <td className={stylesLeft.titleColumn}>
                                            <h4>КУ БРОЈ</h4>
                                        </td>
                                        <td>
                                            <Field
                                                validate={notEmpty}
                                                name="ku_number"
                                                type="input"
                                                as={UnderlineInput}
                                                notValid={
                                                    props.errors.ku_number &&
                                                    props.touched.ku_number
                                                }
                                            />
                                            <Field
                                                name="ku_file"
                                                as={PdfInput}
                                                onSubmit={props.handleSubmit}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={stylesLeft.titleColumn}>
                                            <h4>БРОЈ</h4>
                                        </td>
                                        <td>
                                            <Field
                                                validate={notEmpty}
                                                name="case_number"
                                                type="input"
                                                as={UnderlineInput}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={stylesLeft.titleColumn}>
                                            <h4>ДАТУМ УНОСА</h4>
                                        </td>
                                        <td className={stylesLeft.al}>
                                            <div
                                                className={
                                                    stylesLeft.calendarContainer
                                                }
                                            >
                                                <Field
                                                    name="ku_inserting_date"
                                                    as={CalendarField}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={stylesLeft.titleColumn}>
                                            <h4>ОШТЕЋЕНИ</h4>
                                        </td>
                                        <td className={stylesLeft.al}>
                                            <AddDamagedTable />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={stylesLeft.titleColumn}>
                                            <h4>ПРИЈАВЉЕНИ</h4>
                                        </td>
                                        <td>
                                            <AddReportedTable />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className={stylesLeft.titleColumn}
                                        ></td>
                                        <td>
                                            <CriminalActsTable />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={stylesLeft.titleColumn}>
                                            <h4>ПРИМЕЊЕНЕ МЕРЕ</h4>
                                        </td>
                                        <td
                                            className={
                                                stylesLeft.appliedMeasuresCell
                                            }
                                        >
                                            <Field
                                                name="depravation
                            "
                                                label="Лишење"
                                                as={Checkbox}
                                            />
                                            <Field
                                                name="imprisoning 
                            "
                                                label="Задржавање"
                                                as={Checkbox}
                                            />
                                            <Field
                                                name="forfeiture
                            "
                                                label="Претрес"
                                                as={Checkbox}
                                            />
                                        </td>
                                    </tr>
                                    <tr style={{ marginBottom: "5px" }}>
                                        <td className={stylesLeft.titleColumn}>
                                            <h4>ДАТУМ ДОСТАВЉАЊА ВЈТ</h4>
                                        </td>
                                        <td className={stylesLeft.al}>
                                            <div
                                                className={
                                                    stylesLeft.calendarContainer
                                                }
                                            >
                                                <Field
                                                    name="ku_delivering_date"
                                                    as={CalendarField}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className={stylesRight.titleColumn}
                                        ></td>
                                        <td className={stylesRight.al}>
                                            <LSNumberTable />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={stylesRight.titleColumn}>
                                            <h4>ОДУЗЕТИ ПРЕДМЕТИ</h4>
                                        </td>
                                        <td>
                                            <TakenItemsTable />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={stylesRight.titleColumn}>
                                            <h4>ДОСТАВЉЕНО СКА</h4>
                                        </td>
                                        <td className={stylesRight.al}>
                                            <div
                                                className={
                                                    stylesRight.calendarContainer
                                                }
                                            >
                                                <Field
                                                    name="ska_date"
                                                    as={CalendarField}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={stylesRight.titleColumn}>
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
                                        <td className={stylesRight.titleColumn}>
                                            <h4>ЗАДУЖЕН РАДНИК</h4>
                                        </td>
                                        <td>
                                            <Field
                                                name="clerk"
                                                type="input"
                                                as={DropDownInput}
                                                listOf="clerks"
                                                options={[
                                                    "Маја Миловић",
                                                    "Јелена Трајковић",
                                                ]}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={stylesRight.titleColumn}>
                                            <h4>МАТЕРИЈАЛНА ШТЕТА</h4>
                                        </td>
                                        <td>
                                            <div
                                                className={
                                                    stylesRight.materialDamageDiv
                                                }
                                            >
                                                <div>
                                                    <Field
                                                        name="materialDamage"
                                                        type="input"
                                                        as={UnderlineInput}
                                                    />
                                                </div>

                                                <Field
                                                    name="euros"
                                                    label="€"
                                                    as={Checkbox}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={stylesRight.titleColumn}>
                                            <h4>НАПОМЕНА</h4>
                                        </td>
                                        <td>
                                            <Field
                                                name="ku_note"
                                                type="input"
                                                as={TextArea}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <div
                                                className={
                                                    stylesRight.KUMainButtonsCell
                                                }
                                            >
                                                <button
                                                    className={`${stylesRight.buttons} ${stylesRight.save}`}
                                                    type="submit"
                                                    onClick={() => {
                                                        props.handleSubmit();
                                                    }}
                                                    disabled={
                                                        props.isSubmitting
                                                    }
                                                >
                                                    Сачувај
                                                </button>

                                                <button
                                                    className={`${stylesRight.buttons} ${stylesRight.close}`}
                                                    disabled={
                                                        props.isSubmitting
                                                    }
                                                    onClick={onClose}
                                                >
                                                    Откажи
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div
                            className={`${styles.containerRight} ${styles.mTop}`}
                        >
                            <table className={stylesRight.KUMainLeftTable}>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    );
};
