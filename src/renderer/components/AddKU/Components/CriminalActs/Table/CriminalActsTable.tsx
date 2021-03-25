import React, { useState } from "react";
import { DataTable } from "../../../../DataTable/DataTable";
import { AddCriminalActs } from "../Form/AddCriminalActs";

interface CriminalActsTableProps {
    criminalActs: string[] | undefined;
    setActsList: (value: React.SetStateAction<string[] | undefined>) => void;
}

export const CriminalActsTable: React.FC<CriminalActsTableProps> = ({
    criminalActs,
    setActsList,
}) => {
    const removeAct = (index: number) => {
        if (!criminalActs) return;
        const newList = criminalActs
            .slice(0, index)
            .concat(
                index + 1 < criminalActs.length
                    ? criminalActs.slice(index + 1)
                    : []
            );
        setActsList(newList);
    };
    const addAct = (name: string) => {
        if (criminalActs && criminalActs.includes(name)) return;
        const newList = criminalActs ? criminalActs.concat(name) : [name];
        setActsList(newList);
    };

    return (
        <DataTable
            name="takenItems"
            headers={[
                `Кривична дела ( ${criminalActs ? criminalActs.length : 0} )`,
            ]}
            data={criminalActs}
            onInsert={addAct}
            onDelete={removeAct}
            children={AddCriminalActs}
        />
    );
};
