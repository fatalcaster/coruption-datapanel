import { Field, Form, Formik } from "formik";
import React from "react";
import UnderlineInput from "../../../../UnderlineInput/UnderlineInput";
import styles from "./style.css";
interface AddLegalEntityProps {
    onClose:
        | ((event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
    onSubmit: (id: string, name: string, address: string) => void | undefined;
}

export const AddLegalEntity: React.FC<AddLegalEntityProps> = ({
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
        if (value.length !== 8) error = "Empty field";

        if (!/^[0-9]*$/.test(value)) "NaN inside the field";
        return error;
    };

    return (
        <div className={styles.buttonLater}>
            <Formik
                onSubmit={async (data, actions) => {
                    actions.setSubmitting(true);
                    onSubmit(data.damaged_id, data.damaged_name, data.address);
                    onClose ? onClose() : () => {};
                }}
                initialValues={{
                    damaged_id: "",
                    damaged_name: "",
                    address: "",
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
                                            name="damaged_name"
                                            placeholder="Назив"
                                            type="input"
                                            as={UnderlineInput}
                                            notValid={
                                                errors.damaged_name &&
                                                touched.damaged_name
                                            }
                                        />
                                    </td>
                                    <td
                                        className={`${styles.addReportedCell} ${styles.addReportedCellInput}`}
                                    >
                                        <Field
                                            validate={validID}
                                            name="damaged_id"
                                            placeholder="МБ правног лица"
                                            type="input"
                                            as={UnderlineInput}
                                            notValid={
                                                errors.damaged_id &&
                                                touched.damaged_id
                                            }
                                        />
                                    </td>
                                    <td
                                        className={`${styles.addReportedCell} ${styles.addReportedCellInput}`}
                                    >
                                        <Field
                                            validate={validName}
                                            name="address"
                                            placeholder="Адреса"
                                            type="input"
                                            as={UnderlineInput}
                                            notValid={
                                                errors.address &&
                                                touched.address
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
