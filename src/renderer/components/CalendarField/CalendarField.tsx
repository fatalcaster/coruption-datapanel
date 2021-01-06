import React from "react";
import styles from "./style.css";

interface CalendarFieldProps {
    name: string;
    label: string;
    value: string;
    link?: string;
    onChange: any;
    notValid?: boolean;
}

export const CalendarField: React.FC<CalendarFieldProps> = (
    props: CalendarFieldProps
) => {
    return (
        <input
            className={`${styles.calendarInput} ${
                props.notValid ? styles.invalid : undefined
            }`}
            type="date"
            id={props.name}
            name={props.name}
            onChange={props.onChange}
        />
    );
};
