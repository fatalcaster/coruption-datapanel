import React, { useState } from "react";
import { DataTable } from "../../../../DataTable/DataTable";
import { AddDamaged } from "../Prompt/AddDamaged";

interface AddDamagedTableProps {}

export const AddDamagedTable: React.FC<AddDamagedTableProps> = ({}) => {
    const [damagedIndividuals, setDamagedIndividuals] = useState<
        DamagedIndividual[]
    >();
    const [damagedLegalEntities, setDamagedLegalEntities] = useState<
        DamagedLegalEntity[]
    >();

    const removeDamagedIndividual = (index: number) => {
        if (!damagedIndividuals) return;
        const newList = damagedIndividuals
            .slice(0, index)
            .concat(
                index + 1 < damagedIndividuals.length
                    ? damagedIndividuals.slice(index + 1)
                    : []
            );
        setDamagedIndividuals(newList);
    };

    const removeDamagedEntity = (index: number) => {
        if (!damagedLegalEntities) return;
        const newList = damagedLegalEntities
            .slice(0, index)
            .concat(
                index + 1 < damagedLegalEntities.length
                    ? damagedLegalEntities.slice(index + 1)
                    : []
            );
        setDamagedLegalEntities(newList);
    };

    const addDamagedLegalEntities = (
        id: string,
        name: string,

        address: string
    ) => {
        const newList = damagedLegalEntities
            ? damagedLegalEntities.concat({
                  id,
                  name,
                  address,
              })
            : [{ id, name, address }];
        setDamagedLegalEntities(newList);
    };
    const addDamagedIndividuals = (
        id: string,
        name: string,
        surname: string,
        father_name: string,
        address: string
    ) => {
        const newList = damagedIndividuals
            ? damagedIndividuals.concat({
                  id,
                  name,
                  surname,
                  father_name,
                  address,
              })
            : [{ id, name, surname, father_name, address }];
        setDamagedIndividuals(newList);
    };
    const headersIndividuals = [
        "Презиме",
        "Име оца",
        "Име",
        "ЈМБГ",
        "Пребивалиште",
    ];
    const headersEntities = ["Назив", "МБ Лица", "Адреса"];
    return (
        <>
            <DataTable
                name="damagedIndividuals"
                headers={headersIndividuals}
                data={damagedIndividuals}
                onDelete={removeDamagedIndividual}
            />
            <DataTable
                name="damagedLegalEntities"
                headers={headersEntities}
                data={damagedLegalEntities}
                onDelete={removeDamagedEntity}
                twoInserts={{
                    onSubmitIndividual: addDamagedIndividuals,
                    onSubmitLegalEntity: addDamagedLegalEntities,
                }}
                children={AddDamaged}
            />
        </>
    );
};
