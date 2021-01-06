import React, { useState } from "react";
import { ContextRow } from "../../ContextRow/ContextRow";
import { AddCriminalActs } from "../Form/AddCriminalActs";
import styles from "./style.css";

interface CriminalActsTableProps {}

export const CriminalActsTable: React.FC<CriminalActsTableProps> = ({}) => {
    const [addingActs, setAddingActs] = useState(true);
    const [criminalActs, setActsList] = useState<string[]>();

    const [removingRow, setRemovingRow] = useState<number | undefined>(
        undefined
    );
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

    const toggleRemoveContextMenu = (index: number | undefined) => {
        setRemovingRow(index);
    };
    return (
        <div className={styles.reportedCentered}>
            <div className={styles.reportedNL}>
                <div className={styles.tableScroll}>
                    <table className={styles.reportedTable}>
                        <thead className={styles.reportedHeader}>
                            <tr>
                                <th>
                                    Кривична дела
                                    {` ( ${
                                        criminalActs ? criminalActs.length : 0
                                    } )`}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {criminalActs
                                ? criminalActs.map((value: string, index) => {
                                      return removingRow != index ? (
                                          <tr
                                              key={index}
                                              onContextMenu={() =>
                                                  toggleRemoveContextMenu(index)
                                              }
                                          >
                                              <td className={styles.textCenter}>
                                                  {value}
                                              </td>
                                          </tr>
                                      ) : (
                                          <tr key={index}>
                                              <td colSpan={1}>
                                                  <ContextRow
                                                      id={`reported-row-${index}`}
                                                      key={index}
                                                      title={"Обриши"}
                                                      color={"#D9534F"}
                                                      onClick={() => {
                                                          removeAct(index);
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
                                  })
                                : undefined}
                        </tbody>
                    </table>
                </div>

                <div className={styles.reportedButtonDiv}>
                    {addingActs ? (
                        <button
                            className={styles.reportedButton}
                            onClick={() => setAddingActs(false)}
                        >
                            Додај
                        </button>
                    ) : (
                        <AddCriminalActs
                            onClose={() => {
                                setAddingActs(true);
                            }}
                            onSubmit={addAct}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
