import React, { useState } from "react";
import { DataTable } from "../../../../DataTable/DataTable";
import { AddTakenItems } from "../Form/AddTakenItems";

interface TakenItemsTableProps {
    takenItems: TakenItem[] | undefined;
    setItemsList: (
        value: React.SetStateAction<TakenItem[] | undefined>
    ) => void;
}

export const TakenItemsTable: React.FC<TakenItemsTableProps> = ({
    takenItems,
    setItemsList,
}) => {
    const removeItem = (index: number) => {
        if (!takenItems) return;
        const newList = takenItems
            .slice(0, index)
            .concat(
                index + 1 < takenItems.length ? takenItems.slice(index + 1) : []
            );
        setItemsList(newList);
    };

    const addItem = (id: string, delivered_to: string) => {
        const newList = takenItems
            ? takenItems.concat({
                  id,
                  delivered_to,
              })
            : [{ id, delivered_to }];
        setItemsList(newList);
    };
    const headers = ["Број потврде", "Достављено"];
    return (
        <DataTable
            name="takenItems"
            headers={headers}
            data={takenItems}
            onInsert={addItem}
            onDelete={removeItem}
            children={AddTakenItems}
        />
    );
};
