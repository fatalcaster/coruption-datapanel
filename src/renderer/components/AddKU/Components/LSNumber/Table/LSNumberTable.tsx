import React, { useState } from "react";
import { AddLSNumber } from "../Form/AddLSNumber";
import styles from "./style.css";

interface LSNumberTableProps {}

export const LSNumberTable: React.FC<LSNumberTableProps> = ({}) => {
    const [addingLS, setAddingLS] = useState(true);
    const [LSNumbers, setLSNumbers] = useState<string[]>();

    const addAct = (name: string) => {
        if (LSNumbers && LSNumbers.includes(name)) return;
        const newList = LSNumbers ? LSNumbers.concat(name) : [name];
        console.log("proso");
        console.log(newList);
        setLSNumbers(newList);
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
                                      return (
                                          <tr key={index}>
                                              <td className={styles.textCenter}>
                                                  {value}
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
