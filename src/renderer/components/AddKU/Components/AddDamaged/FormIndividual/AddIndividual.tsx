import { Field, Form, Formik } from "formik";
import React from "react";
import UnderlineInput from "../../../../UnderlineInput/UnderlineInput";
import styles from "./style.css";
interface AddIndividualProps {
    onClose:
        | ((event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
    onSubmit: (
        id: string,
        name: string,
        surname: string,
        fatherName: string,
        residence: string
    ) => void | undefined;
}

export const AddIndividual: React.FC<AddIndividualProps> = ({
    onClose,
    onSubmit,
}) => {
    const validName = (value: string, state: any): string | undefined => {
        let error;

        if (value.length === 0) error = "Empty field";
        if (/\d/.test(value)) "Number inside the field";
        return error;
    };
    const validID = (value: string): string | undefined => {
        let error;
        if (value.length !== 13) error = "Empty field";

        if (!/^[0-9]*$/.test(value)) "NaN inside the field";
        return error;
    };

    return (
        <div className={styles.buttonLater}>
            <Formik
                onSubmit={async (data, actions) => {
                    actions.setSubmitting(true);
                    onSubmit(
                        data.reported_id,
                        data.reported_name,
                        data.reported_surname,
                        data.reported_father_name,
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
                {({ values, isSubmitting, errors, touched }) => (
                    <Form>
                        <table>
                            <tbody>
                                <tr>
                                    <td
                                        className={`${styles.addReportedCell} ${styles.addReportedCellInput}`}
                                    >
                                        <Field
                                            validate={validName}
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
                                        className={`${styles.addReportedCell} ${styles.addReportedCellInput}`}
                                    >
                                        <Field
                                            validate={validName}
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
                                        className={`${styles.addReportedCell} ${styles.addReportedCellInput}`}
                                    >
                                        <Field
                                            validate={validName}
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
                                        className={`${styles.addReportedCell} ${styles.addReportedCellInput}`}
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
                                        className={`${styles.addReportedCell} ${styles.addReportedCellInput}`}
                                    >
                                        <Field
                                            validate={validName}
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
                                    <td className={styles.addReportedCell}>
                                        <button
                                            className={`${styles.buttons} ${styles.save}`}
                                            type="submit"
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
                    </Form>
                )}
            </Formik>
        </div>
    );
};
