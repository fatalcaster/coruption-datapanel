import { Field, Formik } from "formik";
import React from "react";
import { notEmpty } from "../../../../../ValidationFunctions/ValidationFunctions";
import UnderlineInput from "../../../../UnderlineInput/UnderlineInput";
import styles from "./../../FormStyle/formstyles.css";
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
                {({ isSubmitting, errors, touched, handleSubmit }) => (
                    <table>
                        <tbody>
                            <tr>
                                <td className={`${styles.addCell}`}>
                                    <Field
                                        validate={notEmpty}
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
                                <td className={styles.addCell}>
                                    <button
                                        className={`${styles.buttons} ${styles.save}`}
                                        type={"button"}
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
