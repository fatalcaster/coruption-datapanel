import { Field, Formik } from "formik";
import React from "react";
import { notEmpty } from "../../../../../ValidationFunctions/ValidationFunctions";
import UnderlineInput from "../../../../UnderlineInput/UnderlineInput";
import styles from "./../../FormStyle/formstyles.css";
interface AddTakenItemsProps {
    onClose:
        | ((event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
    onSubmit: (id: string, delivered_to: string) => void | undefined;
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
                    onSubmit(data.id, data.delivered_to);
                    onClose ? onClose() : () => {};
                }}
                initialValues={{
                    id: "",
                    delivered_to: "",
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
                                        name="id"
                                        placeholder="Број потврде"
                                        type="input"
                                        as={UnderlineInput}
                                        notValid={
                                            props.errors.id && props.touched.id
                                        }
                                    />
                                </td>
                                <td
                                    className={`${styles.addCell} ${styles.addCellInput}`}
                                >
                                    <Field
                                        validate={notEmpty}
                                        name="delivered_to"
                                        placeholder="Достављено"
                                        type="input"
                                        as={UnderlineInput}
                                        notValid={
                                            props.errors.delivered_to &&
                                            props.touched.delivered_to
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
