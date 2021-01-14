import { Field, Formik } from "formik";
import React from "react";
import { notEmpty } from "../../../../../ValidationFunctions/ValidationFunctions";
import UnderlineInput from "../../../../UnderlineInput/UnderlineInput";
import styles from "./../../FormStyle/formstyles.css";
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
                {(props) => (
                    <table>
                        <tbody>
                            <tr>
                                <td
                                    className={`${styles.addCell} ${styles.addCellInput}`}
                                >
                                    <Field
                                        validate={notEmpty}
                                        name="verification_number"
                                        placeholder="Број потврде"
                                        type="input"
                                        as={UnderlineInput}
                                        notValid={
                                            props.errors.verification_number &&
                                            props.touched.verification_number
                                        }
                                    />
                                </td>
                                <td
                                    className={`${styles.addCell} ${styles.addCellInput}`}
                                >
                                    <Field
                                        validate={notEmpty}
                                        name="item_name"
                                        placeholder="Достављено"
                                        type="input"
                                        as={UnderlineInput}
                                        notValid={
                                            props.errors.item_name &&
                                            props.touched.item_name
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.addCell}>
                                    <button
                                        className={`${styles.buttons} ${styles.save}`}
                                        onClick={() => {
                                            props.handleSubmit();
                                        }}
                                        disabled={props.isSubmitting}
                                    >
                                        Сачувај
                                    </button>
                                    <button
                                        className={`${styles.buttons} ${styles.close}`}
                                        disabled={props.isSubmitting}
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
