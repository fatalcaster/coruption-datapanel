import React from "react";
// import { LogUserIn } from "../../../main/Functionality/Login";
import InputField from "./../../components/InputField/InputField";
import styles from "./styles.css";
import { Field, Form, Formik } from "formik";
import { LogUserIn } from "../../../main/Functionality/Login";
import { RouteComponentProps } from "react-router-dom";
import { Parent } from "../Parent";
import { ErrorField } from "../../components/ErrorField/ErrorField";

interface LoginProps extends RouteComponentProps {}

export const Login: React.FC<LoginProps> = ({ history }) => {
    return (
        <Parent>
            <div className={styles.align}>
                <div className={styles.container}>
                    <Formik
                        onSubmit={async (data, actions) => {
                            actions.setSubmitting(true);
                            const auth = await LogUserIn(
                                data.username,
                                data.password
                            );
                            console.log(auth);
                            if (auth.auth) history.replace("/KUWorkspace");
                            else
                                actions.setFieldError(
                                    auth.error!.field!,
                                    auth.error!.message!
                                );
                            //else <Redirect to="/" />;
                            actions.setSubmitting(false);
                        }}
                        initialValues={{ username: "", password: "" }}
                    >
                        {({ isSubmitting, errors }) => (
                            <Form className={styles.form_container}>
                                <h1 className={styles.title}>Пријава</h1>
                                <Field
                                    name="username"
                                    placeholder="Корисничко име"
                                    type="input"
                                    as={InputField}
                                />
                                {errors.username ? (
                                    <ErrorField text={errors.username} />
                                ) : null}
                                <Field
                                    name="password"
                                    placeholder="Лозинка"
                                    type="password"
                                    as={InputField}
                                />
                                {errors.password ? (
                                    <ErrorField text={errors.password} />
                                ) : null}
                                <div className={styles.form_field}>
                                    <button
                                        disabled={isSubmitting}
                                        className={styles.submit_button}
                                        type="submit"
                                    >
                                        Приступи
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </Parent>
    );
};
