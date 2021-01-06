import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { CalendarField } from "../../CalendarField/CalendarField";
import styles from "./style.css";

import { Field, Formik } from "formik";
import UnderlineInput from "../../UnderlineInput/UnderlineInput";
import { AddReportedTable } from "../Components/AddReported/Table/AddReportedTable";
import { CriminalActsTable } from "../Components/CriminalActs/Table/CriminalActsTable";
import { AddDamagedTable } from "../Components/AddDamaged/Table/AddDamagedTable";
import { Checkbox } from "../Components/CheckBox/Checkbox";

interface AddKuLeftProps {}

export const AddKuLeft: React.FC<AddKuLeftProps> = ({}) => {
    // const [addingDamaged, setAddingDamaged] = useState(true);
    // const [damagedPeople, setDamagedList] = useState<ReportedTableElements[]>();

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
                        <td className={styles.titleColumn}>
                            <h4>КУ БРОЈ</h4>
                        </td>
                        <td>
                            <Field
                                name="ku_number"
                                type="input"
                                as={UnderlineInput}
                            />
                            <FontAwesomeIcon
                                icon={faFilePdf}
                                className={styles.pdfIcon}
                                size="lg"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.titleColumn}>
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
                        <td className={styles.titleColumn}>
                            <h4>ДАТУМ УНОСА</h4>
                        </td>
                        <td className={styles.al}>
                            <div className={styles.calendarContainer}>
                                <Field name="ku_date" as={CalendarField} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.titleColumn}>
                            <h4>ОШТЕЋЕНИ</h4>
                            {/* <p className={styles.explanation}>
                                (презиме и име или назив правног лица, ЈМБГ или
                                МБ правног лица)
                            </p> */}
                        </td>
                        <td className={styles.al}>
                            <AddDamagedTable />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.titleColumn}>
                            <h4>ПРИЈАВЉЕНИ</h4>
                        </td>
                        <td>
                            <AddReportedTable />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.titleColumn}></td>
                        <td>
                            <CriminalActsTable />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.titleColumn}>
                            <h4>ПРИМЕЊЕНЕ МЕРЕ</h4>
                        </td>
                        <td className={styles.appliedMeasuresCell}>
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
                    <tr>
                        <td className={styles.titleColumn}>
                            <h4>ДАТУМ ДОСТАВЉАЊА</h4>
                        </td>
                        <td className={styles.al}>
                            <div className={styles.calendarContainer}>
                                <Field name="ku_date" as={CalendarField} />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Formik>
    );
};
