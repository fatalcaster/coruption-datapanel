import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { CalendarField } from "../../CalendarField/CalendarField";
import { DropDownInput } from "../../DropDownInput/DropDownInput";
import { PdfInput } from "../../PdfInput/PdfInput";
import { TextArea } from "../../TextArea/TextArea";
import UnderlineInput from "../../UnderlineInput/UnderlineInput";
import { AddDamagedTable } from "../../AddKU/Components/AddDamaged/Table/AddDamagedTable";
import { AddReportedTable } from "../../AddKU/Components/AddReported/Table/AddReportedTable";
import { Checkbox } from "../../AddKU/Components/CheckBox/Checkbox";
import { CriminalActsTable } from "../../AddKU/Components/CriminalActs/Table/CriminalActsTable";
import { LSNumberTable } from "../../AddKU/Components/LSNumber/Table/LSNumberTable";
import { TakenItemsTable } from "../../AddKU/Components/TakenItems/Table/TakenItemsTable";
import { TitleBar } from "../../TitleBar/TitleBar";
import styles from "./style.css";
import { notEmpty } from "../../../ValidationFunctions/ValidationFunctions";
import { saveKU } from "../../../../main/Functionality/KU";
import { ipcRenderer } from "electron";

interface KUFilterLayoutProps {
  onClose:
    | ((event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  onResize?:
    | ((event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
}

export const KUFilterLayout: React.FC<KUFilterLayoutProps> = React.memo(
  ({ onClose }) => {
    const [suggestedCrimes, setSuggestedCrimes] = useState<string[]>([]);

    ipcRenderer.on("get-crimes-reply", (_event, arg) => {
      setSuggestedCrimes(arg);
    });

    const [suggestedWorkers, setSuggestedWorkers] = useState<string[]>([]);

    ipcRenderer.on("get-workers-reply", (_event, arg) => {
      setSuggestedWorkers(arg);
    });

    useEffect(() => {
      ipcRenderer.send("get-crimes");
      ipcRenderer.send("get-workers");
    }, []);
    return (
      <div
        className={`${styles.containerMain} 
            `}
      >
        <TitleBar onClose={onClose} dragClass={"TITLEBAR-ADD"} />

        <div className={styles.spaceBox}></div>
        <Formik
          initialValues={{
            before: "",
            after: "",
            vjt_delivered: false,
            ska_delivered: false,
            crimes_number: undefined,
            crime: "",
            clerk: "",
          }}
          onSubmit={async (values, _actions) => {
            ipcRenderer.send("ku-filter-request", { values });
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
                          <h4>ПРЕ</h4>
                        </td>
                        <td>
                          <Field
                            name="before"
                            type="input"
                            as={CalendarField}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.titleColumn}>
                          <h4>НАКОН</h4>
                        </td>
                        <td>
                          <Field name="after" type="input" as={CalendarField} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Field
                            name="vjt_delivered"
                            label="ДОСТАВЉЕНО ВЈТ"
                            as={Checkbox}
                          />
                        </td>

                        <td>
                          <Field
                            name="ska_delivered"
                            label="ДОСТАВЉЕНО СКА"
                            as={Checkbox}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.titleColumn}>
                          <h4>БРОЈ КРИВИЧНИХ ДЕЛА</h4>
                        </td>
                        <td>
                          <Field
                            name="crimes_number"
                            type="input"
                            as={UnderlineInput}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.titleColumn}>
                          <h4>САДРЖИ КРИВИЧНО ДЕЛО</h4>
                        </td>
                        <td>
                          <Field
                            name="crime"
                            type="input"
                            as={DropDownInput}
                            listOf="crimes"
                            options={suggestedCrimes}
                          />
                        </td>
                        <td className={styles.titleColumn}>
                          <h4>РАДНИК</h4>
                        </td>
                        <td>
                          <Field
                            name="clerk"
                            type="input"
                            as={DropDownInput}
                            listOf="clerks"
                            options={suggestedWorkers}
                          />
                        </td>
                      </tr>
                      <tr></tr>
                    </tbody>
                  </table>
                  <div className={styles.KUMainButtonsCell}>
                    <button
                      className={`${styles.buttons} ${styles.save}`}
                      type="submit"
                      disabled={props.isSubmitting}
                    >
                      Филтрирај
                    </button>
                    <button
                      type="button"
                      className={`${styles.buttons} ${styles.close}`}
                      onClick={() => {
                        ipcRenderer.send("ku-display-request", {
                          return: false,
                        });
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
