import { Field, Formik } from "formik";
import React from "react";
import {
    notEmpty,
    validID,
} from "../../../../../ValidationFunctions/ValidationFunctions";
import UnderlineInput from "../../../../UnderlineInput/UnderlineInput";
import styles from "./../../FormStyle/formstyles.css";
interface AddIndividualProps {
    onClose:
        | ((event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
    onSubmit: (
        surname: string,
        fatherName: string,
        name: string,
        id: string,
        residence: string
    ) => void | undefined;
}

export const AddIndividual: React.FC<AddIndividualProps> = ({
    onClose,
    onSubmit,
}) => {
    return (
        <div className={styles.buttonLater}>
            <Formik
                onSubmit={async (data, actions) => {
                    actions.setSubmitting(true);
                    onSubmit(
                        data.reported_surname,
                        data.reported_father_name,
                        data.reported_name,
                        data.reported_id,
                        data.reported_residence
                    );
                    onClose ? onClose() : () => {};
                }}
                initialValues={{
                    reported_father_name: "",
                    reported_surname: "",
                    reported_name: "",
                    reported_id: "",
                    reported_residence: "",
                    reported_birth_place: "",
                }}
            >
                {({ isSubmitting, errors, touched, handleSubmit }) => (
                    <table>
                        <tbody>
                            <tr>
                                <td
                                    className={`${styles.addCell} ${styles.addCellInput}`}
                                >
                                    <Field
                                        validate={notEmpty}
                                        name="reported_surname"
                                        placeholder="Презиме"
                                        type="input"
                                        as={UnderlineInput}
                                        notValid={
                                            errors.reported_surname &&
                                            touched.reported_surname
                                        }
                                    />
                                </td>
                                <td
                                    className={`${styles.addCell} ${styles.addCellInput}`}
                                >
                                    <Field
                                        validate={notEmpty}
                                        name="reported_father_name"
                                        placeholder="Име оца"
                                        type="input"
                                        as={UnderlineInput}
                                        notValid={
                                            errors.reported_father_name &&
                                            touched.reported_father_name
                                        }
                                    />
                                </td>
                                <td
                                    className={`${styles.addCell} ${styles.addCellInput}`}
                                >
                                    <Field
                                        validate={notEmpty}
                                        name="reported_name"
                                        placeholder="Име"
                                        type="input"
                                        as={UnderlineInput}
                                        notValid={
                                            errors.reported_name &&
                                            touched.reported_name
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td
                                    className={`${styles.addCell} ${styles.addCellInput}`}
                                >
                                    <Field
                                        validate={validID}
                                        name="reported_id"
                                        placeholder="ЈМБГ"
                                        type="input"
                                        as={UnderlineInput}
                                        notValid={
                                            errors.reported_id &&
                                            touched.reported_id
                                        }
                                    />
                                </td>
                                <td
                                    className={`${styles.addCell} ${styles.addCellInput}`}
                                >
                                    <Field
                                        validate={notEmpty}
                                        name="reported_residence"
                                        placeholder="Пребивалиште"
                                        type="input"
                                        as={UnderlineInput}
                                        notValid={
                                            errors.reported_residence &&
                                            touched.reported_residence
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.addCell}>
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
