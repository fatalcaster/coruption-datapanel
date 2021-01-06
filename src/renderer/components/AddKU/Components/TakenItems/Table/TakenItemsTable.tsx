import React, { useState } from "react";
import { AddTakenItems } from "../Form/AddTakenItems";
import styles from "./style.css";

interface TakenItemsTableProps {}

export const TakenItemsTable: React.FC<TakenItemsTableProps> = ({}) => {
    const [addingItem, setAddingItem] = useState(true);
    const [takenItems, setItemsList] = useState<TakenItem[]>();

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
                                      return (
                                          <tr key={index}>
                                              <td>
                                                  {value.verification_number}
                                              </td>
                                              <td>{value.item_name}</td>
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
