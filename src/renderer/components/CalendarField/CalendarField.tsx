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
            value={formatDate(props.value)}
        />
    );
};

const formatDate = (date: string | undefined): string | undefined => {
    if (!date) return "";
    const year = new Date(date).getFullYear().toString();
    const month =
        new Date(date).getMonth() < 10
            ? `0${new Date(date).getMonth() + 1}`
            : (new Date(date).getMonth() + 1).toString();

    const day =
        new Date(date).getDate() < 10
            ? `0${new Date(date).getDate()}`
            : new Date(date).getDate().toString();
    return `${year}-${month}-${day}`;
};
