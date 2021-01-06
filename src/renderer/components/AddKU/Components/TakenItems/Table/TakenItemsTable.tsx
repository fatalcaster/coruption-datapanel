import React, { useState } from "react";
import { ContextRow } from "../../ContextRow/ContextRow";
import { AddTakenItems } from "../Form/AddTakenItems";
import styles from "./style.css";

interface TakenItemsTableProps {}

export const TakenItemsTable: React.FC<TakenItemsTableProps> = ({}) => {
    const [addingItem, setAddingItem] = useState(true);
    const [takenItems, setItemsList] = useState<TakenItem[]>();
    const [removingRow, setRemovingRow] = useState<number | undefined>(
        undefined
    );
    const removeReported = (index: number) => {
        if (!takenItems) return;
        const newList = takenItems
            .slice(0, index)
            .concat(
                index + 1 < takenItems.length ? takenItems.slice(index + 1) : []
            );
        setItemsList(newList);
    };

    const toggleRemoveContextMenu = (index: number | undefined) => {
        setRemovingRow(index);
    };
    const addReported = (verification_number: string, item_name: string) => {
        const newList = takenItems
            ? takenItems.concat({
                  verification_number,
                  item_name,
              })
            : [{ verification_number, item_name }];
        setItemsList(newList);
    };
    return (
        <div className={styles.reportedCentered}>
            <div className={styles.reportedNL}>
                <div className={styles.tableScroll}>
                    <table className={styles.reportedTable}>
                        <thead className={styles.reportedHeader}>
                            <tr>
                                <th>Број потврде</th>
                                <th>Достављено</th>
                            </tr>
                        </thead>
                        <tbody>
                            {takenItems
                                ? takenItems.map((value: TakenItem, index) => {
                                      return removingRow != index ? (
                                          <tr
                                              key={index}
                                              onContextMenu={() =>
                                                  toggleRemoveContextMenu(index)
                                              }
                                          >
                                              <td>
                                                  {value.verification_number}
                                              </td>
                                              <td>{value.item_name}</td>
                                          </tr>
                                      ) : (
                                          <tr key={index}>
                                              <td colSpan={2}>
                                                  <ContextRow
                                                      id={`reported-row-${index}`}
                                                      key={index}
                                                      title={"Обриши"}
                                                      color={"#D9534F"}
                                                      onClick={() => {
                                                          removeReported(index);
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
                    {addingItem ? (
                        <button
                            className={styles.reportedButton}
                            onClick={() => setAddingItem(false)}
                        >
                            Додај
                        </button>
                    ) : (
                        <AddTakenItems
                            onClose={() => {
                                setAddingItem(true);
                            }}
                            onSubmit={addReported}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
