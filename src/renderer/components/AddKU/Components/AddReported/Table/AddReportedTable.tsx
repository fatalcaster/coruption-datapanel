import React, { useState } from "react";
import { DataTable } from "../../../../DataTable/DataTable";
import { AddReported } from "../Form/AddReported";

interface AddReportedTableProps {
    reportedPeople: ReportedTableElements[] | undefined;
    setReportedList: (
        value: React.SetStateAction<ReportedTableElements[] | undefined>
    ) => void;
}

export const AddReportedTable: React.FC<AddReportedTableProps> = ({
    reportedPeople,
    setReportedList,
}) => {
    const removeReported = (index: number) => {
        if (!reportedPeople) return;
        const newList = reportedPeople
            .slice(0, index)
            .concat(
                index + 1 < reportedPeople.length
                    ? reportedPeople.slice(index + 1)
                    : []
            );
        setReportedList(newList);
    };

    const addReported = (
        id: string,
        name: string,
        surname: string,
        father_name: string,
        birth_place: string,
        residence: string
    ) => {
        const newList = reportedPeople
            ? reportedPeople.concat({
                  id,
                  name,
                  surname,
                  father_name,
                  residence,
                  birth_place,
              })
            : [{ id, name, surname, father_name, residence, birth_place }];
        setReportedList(newList);
    };
    const headers = [
        "Презиме",
        "Име оца",
        "Име",
        "ЈМБГ",
        "Место рођења",
        "Пребивалиште",
    ];
    return (
        <DataTable
            name="reportedTable"
            headers={headers}
            data={reportedPeople}
            children={AddReported}
            onDelete={removeReported}
            onInsert={addReported}
        />
    );
};
