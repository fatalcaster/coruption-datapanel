import { Field, Formik } from "formik";
import React, { useState } from "react";
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
import { notEmpty } from "./../../../ValidationFunctions/ValidationFunctions";
import { saveKU } from "./../../../../main/Functionality/KU";

interface AddKULayoutProps {
    onClose:
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
    onResize?:
        | ((event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
}

export const AddKULayout: React.FC<AddKULayoutProps> = ({ onClose }) => {
    //Lifted state from CriminalActs Table
    const [criminalActs, setActsList] = useState<string[]>();

    //Lifted state from reportedPeople Table
    const [reportedPeople, setReportedList] = useState<
        ReportedTableElements[]
    >();

    // Lifted state from LSNumbers table
    const [LSNumbers, setLSNumbers] = useState<string[]>();

    // Lifted state from TakenItems table
    const [takenItems, setItemsList] = useState<TakenItem[]>();

    // Lifted states from Damaged Tables
    const [damagedIndividuals, setDamagedIndividuals] = useState<
        DamagedIndividual[]
    >();
    const [damagedLegalEntities, setDamagedLegalEntities] = useState<
        DamagedLegalEntity[]
    >();

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
                    po_connection: "",
                    materialDamage: "",
                    euros: false,
                    ku_note: "",
                }}
                onSubmit={async (values, actions) => {
                    console.log("TESTIRAM: " + values.ku_number);
                    await saveKU({
                        values: values,
                        criminalActs,
                        reportedPeople,
                        LSNumbers,
                        takenItems,
                        damagedIndividuals,
                        damagedLegalEntities,
                    });
                }}
            >
                {(props) => (
                    <div className={styles.columnContainer}>
                        <div className={styles.containerLeft}>
                            <form onSubmit={props.handleSubmit}>
                                <table className={styles.KUMainLeftTable}>
                                    <tbody>
                                        <tr>
                                            <td className={styles.titleColumn}>
                                                <h4>КУ БРОЈ</h4>
                                            </td>
                                            <td>
                                                <Field
                                                    validate={notEmpty}
                                                    name="ku_number"
                                                    type="input"
                                                    as={UnderlineInput}
                                                    notValid={
                                                        props.errors
                                                            .ku_number &&
                                                        props.touched.ku_number
                                                    }
                                                />
                                                <Field
                                                    name="ku_file"
                                                    as={PdfInput}
                                                    onSubmit={
                                                        props.handleSubmit
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.titleColumn}>
                                                <h4>БРОЈ</h4>
                                            </td>
                                            <td>
                                                <Field
                                                    validate={notEmpty}
                                                    name="case_number"
                                                    type="input"
                                                    as={UnderlineInput}
                                                    notValid={
                                                        props.errors
                                                            .case_number &&
                                                        props.touched
                                                            .case_number
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.titleColumn}>
                                                <h4>ДАТУМ УНОСА</h4>
                                            </td>
                                            <td className={styles.al}>
                                                <div
                                                    className={
                                                        styles.calendarContainer
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
                                            <td className={styles.titleColumn}>
                                                <h4>ОШТЕЋЕНИ</h4>
                                            </td>
                                            <td className={styles.al}>
                                                <AddDamagedTable
                                                    damagedIndividuals={
                                                        damagedIndividuals
                                                    }
                                                    damagedLegalEntities={
                                                        damagedLegalEntities
                                                    }
                                                    setDamagedIndividuals={(
                                                        new_list
                                                    ) =>
                                                        setDamagedIndividuals(
                                                            new_list
                                                        )
                                                    }
                                                    setDamagedLegalEntities={(
                                                        new_list
                                                    ) =>
                                                        setDamagedLegalEntities(
                                                            new_list
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.titleColumn}>
                                                <h4>ПРИЈАВЉЕНИ</h4>
                                            </td>
                                            <td>
                                                <AddReportedTable
                                                    reportedPeople={
                                                        reportedPeople
                                                    }
                                                    setReportedList={(
                                                        new_list
                                                    ) => {
                                                        setReportedList(
                                                            new_list
                                                        );
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                className={styles.titleColumn}
                                            ></td>
                                            <td>
                                                <CriminalActsTable
                                                    criminalActs={criminalActs}
                                                    setActsList={(new_list) => {
                                                        setActsList(new_list);
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.titleColumn}>
                                                <h4>ПРИМЕЊЕНЕ МЕРЕ</h4>
                                            </td>
                                            <td
                                                className={
                                                    styles.appliedMeasuresCell
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
                                            <td className={styles.titleColumn}>
                                                <h4>ДАТУМ ДОСТАВЉАЊА ВЈТ</h4>
                                            </td>
                                            <td className={styles.al}>
                                                <div
                                                    className={
                                                        styles.calendarContainer
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
                                                className={styles.titleColumn}
                                            ></td>
                                            <td className={styles.al}>
                                                <LSNumberTable
                                                    LSNumbers={LSNumbers}
                                                    setLSNumbers={(
                                                        new_list
                                                    ) => {
                                                        setLSNumbers(new_list);
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.titleColumn}>
                                                <h4>ОДУЗЕТИ ПРЕДМЕТИ</h4>
                                            </td>
                                            <td>
                                                <TakenItemsTable
                                                    takenItems={takenItems}
                                                    setItemsList={(
                                                        new_list
                                                    ) => {
                                                        setItemsList(new_list);
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.titleColumn}>
                                                <h4>ДОСТАВЉЕНО СКА</h4>
                                            </td>
                                            <td className={styles.al}>
                                                <div
                                                    className={
                                                        styles.calendarContainer
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
                                            <td className={styles.titleColumn}>
                                                <h4>ВЕЗА (ПО, ОО)</h4>
                                            </td>
                                            <td>
                                                <Field
                                                    name="po_connection"
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
                                                    options={[
                                                        "Маја Миловић",
                                                        "Јелена Трајковић",
                                                    ]}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.titleColumn}>
                                                <h4>МАТЕРИЈАЛНА ШТЕТА</h4>
                                            </td>
                                            <td>
                                                <div
                                                    className={
                                                        styles.materialDamageDiv
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
                                            <td className={styles.titleColumn}>
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
                                                        styles.KUMainButtonsCell
                                                    }
                                                >
                                                    <button
                                                        className={`${styles.buttons} ${styles.save}`}
                                                        type="submit"
                                                        disabled={
                                                            props.isSubmitting
                                                        }
                                                    >
                                                        Сачувај
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className={`${styles.buttons} ${styles.close}`}
                                                        onClick={onClose}
                                                    >
                                                        Откажи
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    );
};
