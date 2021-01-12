import { Field, Formik } from "formik";
import React from "react";
import { notEmpty } from "../../../../../ValidationFunctions/ValidationFunctions";
import { DropDownInput } from "../../../../DropDownInput/DropDownInput";
import styles from "./style.css";
interface AddCriminalActsProps {
    onClose:
        | ((event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
    onSubmit: (name: string) => void | undefined;
}

export const AddCriminalActs: React.FC<AddCriminalActsProps> = ({
    onClose,
    onSubmit,
}) => {
    return (
        <div className={styles.buttonLater}>
            <Formik
                onSubmit={async (data, actions) => {
                    actions.setSubmitting(true);
                    onSubmit(data.criminal_act);
                    onClose ? onClose() : () => {};
                }}
                initialValues={{
                    criminal_act: "",
                }}
            >
                {({ isSubmitting, errors, touched, handleSubmit }) => (
                    <table>
                        <tbody>
                            <tr>
                                <td className={`${styles.addCriminalAct}`}>
                                    <Field
                                        validate={notEmpty}
                                        name="criminal_act"
                                        type="input"
                                        placeholder="Кривично дело"
                                        as={DropDownInput}
                                        listOf="CriminalActs"
                                        notValid={
                                            errors.criminal_act &&
                                            touched.criminal_act
                                        }
                                        options={["Test", "dva"]}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.addReportedCell}>
                                    <button
                                        className={`${styles.buttons} ${styles.save}`}
                                        type="button"
                                        onClick={() => {
                                            handleSubmit();
                                        }}
                                        disabled={isSubmitting}
                                    >
                                        Сачувај
                                    </button>
                                    <button
                                        className={`${styles.buttons} ${styles.close}`}
                                        disabled={isSubmitting}
                                        onClick={onClose}
                                    >
                                        Откажи
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </Formik>
        </div>
    );
};
