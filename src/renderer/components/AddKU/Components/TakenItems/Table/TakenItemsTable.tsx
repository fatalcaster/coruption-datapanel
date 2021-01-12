import React, { useState } from "react";
import { DataTable } from "../../../../DataTable/DataTable";
import { AddLSNumber } from "../../LSNumber/Form/AddLSNumber";
import { AddTakenItems } from "../Form/AddTakenItems";

interface TakenItemsTableProps {}

export const TakenItemsTable: React.FC<TakenItemsTableProps> = ({}) => {
    const [takenItems, setItemsList] = useState<TakenItem[]>();

    const removeItem = (index: number) => {
        if (!takenItems) return;
        const newList = takenItems
            .slice(0, index)
            .concat(
                index + 1 < takenItems.length ? takenItems.slice(index + 1) : []
            );
        setItemsList(newList);
    };

    const addItem = (verification_number: string, item_name: string) => {
        const newList = takenItems
            ? takenItems.concat({
                  verification_number,
                  item_name,
              })
            : [{ verification_number, item_name }];
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
