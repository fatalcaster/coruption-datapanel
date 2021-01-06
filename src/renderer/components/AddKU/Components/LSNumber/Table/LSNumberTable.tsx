import React, { useState } from "react";
import { ContextRow } from "../../ContextRow/ContextRow";
import { AddLSNumber } from "../Form/AddLSNumber";
import styles from "./style.css";

interface LSNumberTableProps {}

export const LSNumberTable: React.FC<LSNumberTableProps> = ({}) => {
    const [addingLS, setAddingLS] = useState(true);
    const [LSNumbers, setLSNumbers] = useState<string[]>();

    const [removingRow, setRemovingRow] = useState<number | undefined>(
        undefined
    );
    const removeAct = (index: number) => {
        if (!LSNumbers) return;
        const newList = LSNumbers.slice(0, index).concat(
            index + 1 < LSNumbers.length ? LSNumbers.slice(index + 1) : []
        );
        setLSNumbers(newList);
    };
    const addAct = (name: string) => {
        if (LSNumbers && LSNumbers.includes(name)) return;
        const newList = LSNumbers ? LSNumbers.concat(name) : [name];
        setLSNumbers(newList);
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
                                    ЛС
                                    {` ( ${LSNumbers ? LSNumbers.length : 0} )`}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {LSNumbers
                                ? LSNumbers.map((value: string, index) => {
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
                    {addingLS ? (
                        <button
                            className={styles.reportedButton}
                            onClick={() => setAddingLS(false)}
                        >
                            Додај
                        </button>
                    ) : (
                        <AddLSNumber
                            onClose={() => {
                                setAddingLS(true);
                            }}
                            onSubmit={addAct}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
