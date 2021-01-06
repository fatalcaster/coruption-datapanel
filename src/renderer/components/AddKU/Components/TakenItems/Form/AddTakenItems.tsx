import { Field, Form, Formik } from "formik";
import React from "react";
import UnderlineInput from "../../../../UnderlineInput/UnderlineInput";
import styles from "./style.css";
interface AddTakenItemsProps {
    onClose:
        | ((event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
    onSubmit: (
        verification_number: string,
        item_name: string
    ) => void | undefined;
}

export const AddTakenItems: React.FC<AddTakenItemsProps> = ({
    onClose,
    onSubmit,
}) => {
    const validName = (value: string): string | undefined => {
        let error;

        if (value.length === 0) error = "Empty field";
        if (/\d/.test(value)) "Number inside the field";
        return error;
    };

    return (
        <div className={styles.buttonLater}>
            <Formik
                onSubmit={async (data, actions) => {
                    actions.setSubmitting(true);
                    onSubmit(data.verification_number, data.item_name);
                    onClose ? onClose() : () => {};
                }}
                initialValues={{
                    verification_number: "",
                    item_name: "",
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
                                            name="verification_number"
                                            placeholder="Број потврде"
                                            type="input"
                                            as={UnderlineInput}
                                            notValid={
                                                errors.verification_number &&
                                                touched.verification_number
                                            }
                                        />
                                    </td>
                                    <td
                                        className={`${styles.addReportedCell} ${styles.addReportedCellInput}`}
                                    >
                                        <Field
                                            validate={validName}
                                            name="item_name"
                                            placeholder="Достављено"
                                            type="input"
                                            as={UnderlineInput}
                                            notValid={
                                                errors.item_name &&
                                                touched.item_name
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
