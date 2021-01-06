import React, { useState } from "react";
import { AddDamaged } from "../Prompt/AddDamaged";
import styles from "./style.css";

interface AddDamagedTableProps {}

export const AddDamagedTable: React.FC<AddDamagedTableProps> = ({}) => {
    const [addingReported, setAddingReported] = useState(true);
    const [reportedPeople, setReportedList] = useState<
        ReportedTableElements[]
    >();

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
        console.log("proso");
        console.log(newList);
        setReportedList(newList);
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
                                {reportedPeople
                                    ? reportedPeople.map(
                                          (
                                              value: ReportedTableElements,
                                              index
                                          ) => {
                                              return (
                                                  <tr key={index}>
                                                      <td>{value.surname}</td>
                                                      <td>
                                                          {value.father_name}
                                                      </td>
                                                      <td>{value.name}</td>
                                                      <td>{value.id}</td>
                                                      <td>
                                                          {value.birth_place}
                                                      </td>
                                                      <td>{value.residence}</td>
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
                                {reportedPeople
                                    ? reportedPeople.map(
                                          (
                                              value: ReportedTableElements,
                                              index
                                          ) => {
                                              return (
                                                  <tr key={index}>
                                                      <td>{value.surname}</td>
                                                      <td>
                                                          {value.father_name}
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
                                onSubmit={addReported}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
