import React, { useState } from "react";
import { ContextRow } from "../../ContextRow/ContextRow";
import { AddReported } from "../Form/AddReported";
import styles from "./style.css";

interface AddReportedTableProps {}

export const AddReportedTable: React.FC<AddReportedTableProps> = ({}) => {
    const [addingReported, setAddingReported] = useState(true);
    const [reportedPeople, setReportedList] = useState<
        ReportedTableElements[]
    >();
    const [removingRow, setRemovingRow] = useState<number | undefined>(
        undefined
    );
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

    const toggleRemoveContextMenu = (index: number | undefined) => {
        setRemovingRow(index);
        console.log(`switching context ${index}`);
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
    return (
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
                                <th>Место рођења</th>
                                <th>Пребивалиште</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportedPeople
                                ? reportedPeople.map(
                                      (value: ReportedTableElements, index) => {
                                          return removingRow != index ? (
                                              <tr
                                                  key={index}
                                                  onContextMenu={() =>
                                                      toggleRemoveContextMenu(
                                                          index
                                                      )
                                                  }
                                              >
                                                  <td>{value.surname}</td>
                                                  <td>{value.father_name}</td>
                                                  <td>{value.name}</td>
                                                  <td>{value.id}</td>
                                                  <td>{value.birth_place}</td>
                                                  <td>{value.residence}</td>
                                              </tr>
                                          ) : (
                                              <tr key={index}>
                                                  <td colSpan={6}>
                                                      <ContextRow
                                                          id={`reported-row-${index}`}
                                                          key={index}
                                                          title={"Обриши"}
                                                          color={"#D9534F"}
                                                          onClick={() => {
                                                              removeReported(
                                                                  index
                                                              );
                                                              toggleRemoveContextMenu(
                                                                  undefined
                                                              );
                                                          }}
                                                          onClickOutside={() => {
                                                              toggleRemoveContextMenu(
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
                        <AddReported
                            onClose={() => {
                                setAddingReported(true);
                            }}
                            onSubmit={addReported}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
