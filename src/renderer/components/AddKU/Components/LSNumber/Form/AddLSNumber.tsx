import { Field, Form, Formik } from "formik";
import React from "react";
import UnderlineInput from "../../../../UnderlineInput/UnderlineInput";
import styles from "./style.css";
interface AddLSNumberProps {
    onClose:
        | ((event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
    onSubmit: (name: string) => void | undefined;
}

export const AddLSNumber: React.FC<AddLSNumberProps> = ({
    onClose,
    onSubmit,
}) => {
    const validName = (value: string, state: any): string | undefined => {
        let error;

        if (value.length === 0) error = "Empty field";
        return error;
    };

    return (
        <div className={styles.buttonLater}>
            <Formik
                onSubmit={async (data, actions) => {
                    actions.setSubmitting(true);
                    onSubmit(data.ls_number);
                    onClose ? onClose() : () => {};
                }}
                initialValues={{
                    ls_number: "",
                }}
            >
                {({ values, isSubmitting, errors, touched }) => (
                    <Form>
                        <table>
                            <tbody>
                                <tr>
                                    <td className={`${styles.addCriminalAct}`}>
                                        <Field
                                            validate={validName}
                                            name="ls_number"
                                            type="input"
                                            placeholder="ЛС Број"
                                            as={UnderlineInput}
                                            notValid={
                                                errors.ls_number &&
                                                touched.ls_number
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
