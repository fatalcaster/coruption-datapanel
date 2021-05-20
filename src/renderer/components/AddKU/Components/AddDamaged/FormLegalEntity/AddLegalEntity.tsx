import { Field, Formik } from "formik";
import React from "react";
import {
    notEmpty,
    validLegalID,
} from "../../../../../ValidationFunctions/ValidationFunctions";
import UnderlineInput from "../../../../UnderlineInput/UnderlineInput";
import styles from "./../../FormStyle/formstyles.css";
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
    return (
        <div className={styles.buttonLater}>
            <Formik
                onSubmit={async (data, actions) => {
                    actions.setSubmitting(true);
                    onSubmit(data.damaged_name, data.damaged_id, data.address);
                    onClose ? onClose() : () => {};
                }}
                initialValues={{
                    damaged_name: "",
                    damaged_id: "",
                    address: "",
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
                                    className={`${styles.addCell} ${styles.addCellInput}`}
                                >
                                    <Field
                                        validate={validLegalID}
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
                                    className={`${styles.addCell} ${styles.addCellInput}`}
                                >
                                    <Field
                                        validate={notEmpty}
                                        name="address"
                                        placeholder="Адреса"
                                        type="input"
                                        as={UnderlineInput}
                                        notValid={
                                            errors.address && touched.address
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
