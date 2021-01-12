import React, { useState } from "react";
import { DataTable } from "../../../../DataTable/DataTable";
import { AddLSNumber } from "../Form/AddLSNumber";

interface LSNumberTableProps {}

export const LSNumberTable: React.FC<LSNumberTableProps> = ({}) => {
    const [LSNumbers, setLSNumbers] = useState<string[]>();

    const removeLSNumber = (index: number) => {
        if (!LSNumbers) return;
        const newList = LSNumbers.slice(0, index).concat(
            index + 1 < LSNumbers.length ? LSNumbers.slice(index + 1) : []
        );
        setLSNumbers(newList);
    };
    const addLSNumber = (name: string) => {
        if (LSNumbers && LSNumbers.includes(name)) return;
        const newList = LSNumbers ? LSNumbers.concat(name) : [name];
        setLSNumbers(newList);
    };
    let header = "ЛС ( " + (LSNumbers ? LSNumbers.length : "0") + " )";
    return (
        <DataTable
            name="takenItems"
            headers={[header]}
            data={LSNumbers}
            onInsert={addLSNumber}
            onDelete={removeLSNumber}
            children={AddLSNumber}
        />
    );
};
