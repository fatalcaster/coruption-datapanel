import { Field, Form, Formik } from "formik";
import React from "react";
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
                    onSubmit(data.criminal_act);
                    onClose ? onClose() : () => {};
                }}
                initialValues={{
                    criminal_act: "",
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
