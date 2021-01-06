import React, { useState } from "react";
import { ContextRow } from "../../ContextRow/ContextRow";
import { AddDamaged } from "../Prompt/AddDamaged";
import styles from "./style.css";

interface AddDamagedTableProps {}

export const AddDamagedTable: React.FC<AddDamagedTableProps> = ({}) => {
    const [addingReported, setAddingReported] = useState(true);
    const [damagedIndividuals, setDamagedIndividuals] = useState<
        DamagedIndividual[]
    >();
    const [damagedLegalEntities, setDamagedLegalEntities] = useState<
        DamagedLegalEntity[]
    >();
    const [removingRowIndividual, setRemovingRowIndividual] = useState<
        number | undefined
    >(undefined);
    const [removingRowEntity, setRemovingRowEntity] = useState<
        number | undefined
    >(undefined);
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

    const toggleRemoveContextMenuIndividual = (index: number | undefined) => {
        setRemovingRowIndividual(index);
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

    const toggleRemoveContextMenuEntity = (index: number | undefined) => {
        setRemovingRowEntity(index);
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
    return (
        <>
            <div className={styles.reportedCentered}>
                <div className={styles.reportedNL}>
                    <div className={styles.tableScroll}>
                        <table className={styles.reportedTable}>
                            <thead className={styles.reportedHeader}>
                                <tr>
                                    <th>Презиме</th>
                                    <th>Име оца</th>
                                    <th>Име</th>
                                    <th>ЈМБГ</th>
                                    <th>Пребивалиште</th>
                                </tr>
                            </thead>
                            <tbody>
                                {damagedIndividuals
                                    ? damagedIndividuals.map(
                                          (value: DamagedIndividual, index) => {
                                              return removingRowIndividual !=
                                                  index ? (
                                                  <tr
                                                      key={index}
                                                      onContextMenu={() =>
                                                          toggleRemoveContextMenuIndividual(
                                                              index
                                                          )
                                                      }
                                                  >
                                                      <td>{value.surname}</td>
                                                      <td>
                                                          {value.father_name}
                                                      </td>
                                                      <td>{value.name}</td>
                                                      <td>{value.id}</td>
                                                      <td>{value.address}</td>
                                                  </tr>
                                              ) : (
                                                  <tr key={index}>
                                                      <td colSpan={5}>
                                                          <ContextRow
                                                              id={`reported-row-${index}`}
                                                              key={index}
                                                              title={"Обриши"}
                                                              color={"#D9534F"}
                                                              onClick={() => {
                                                                  removeDamagedIndividual(
                                                                      index
                                                                  );
                                                                  toggleRemoveContextMenuIndividual(
                                                                      undefined
                                                                  );
                                                              }}
                                                              onClickOutside={() => {
                                                                  toggleRemoveContextMenuIndividual(
                                                                      undefined
                                                                  );
                                                              }}
                                                          />
                                                      </td>
                                                  </tr>
                                              );
                                          }
                                      )
                                    : undefined}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className={styles.reportedCentered}>
                <div className={styles.reportedNL}>
                    <div className={styles.tableScroll}>
                        <table className={styles.reportedTable}>
                            <thead className={styles.reportedHeader}>
                                <tr>
                                    <th>Назив</th>
                                    <th>МБ Лица</th>
                                    <th>Адреса</th>
                                </tr>
                            </thead>
                            <tbody>
                                {damagedLegalEntities
                                    ? damagedLegalEntities.map(
                                          (
                                              value: DamagedLegalEntity,
                                              index
                                          ) => {
                                              return removingRowEntity !=
                                                  index ? (
                                                  <tr
                                                      key={index}
                                                      onContextMenu={() =>
                                                          toggleRemoveContextMenuEntity(
                                                              index
                                                          )
                                                      }
                                                  >
                                                      <td>{value.name}</td>
                                                      <td>{value.id}</td>
                                                      <td>{value.address}</td>
                                                  </tr>
                                              ) : (
                                                  <tr key={index}>
                                                      <td colSpan={3}>
                                                          <ContextRow
                                                              id={`reported-row-${index}`}
                                                              key={index}
                                                              title={"Обриши"}
                                                              color={"#D9534F"}
                                                              onClick={() => {
                                                                  removeDamagedEntity(
                                                                      index
                                                                  );
                                                                  toggleRemoveContextMenuEntity(
                                                                      undefined
                                                                  );
                                                              }}
                                                              onClickOutside={() => {
                                                                  toggleRemoveContextMenuEntity(
                                                                      undefined
                                                                  );
                                                              }}
                                                          />
                                                      </td>
                                                  </tr>
                                              );
                                          }
                                      )
                                    : undefined}
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.reportedButtonDiv}>
                        {addingReported ? (
                            <button
                                className={styles.reportedButton}
                                onClick={() => setAddingReported(false)}
                            >
                                Додај
                            </button>
                        ) : (
                            <AddDamaged
                                onClose={() => {
                                    setAddingReported(true);
                                }}
                                onSubmitIndividual={addDamagedIndividuals}
                                onSubmitLegalEntity={addDamagedLegalEntities}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
