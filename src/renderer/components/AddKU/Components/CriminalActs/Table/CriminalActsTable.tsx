import React, { useState } from "react";
import { AddCriminalActs } from "../Form/AddCriminalActs";
import styles from "./style.css";

interface CriminalActsTableProps {}

export const CriminalActsTable: React.FC<CriminalActsTableProps> = ({}) => {
    const [addingActs, setAddingActs] = useState(true);
    const [criminalActs, setActsList] = useState<string[]>();

    const addAct = (name: string) => {
        if (criminalActs && criminalActs.includes(name)) return;
        const newList = criminalActs ? criminalActs.concat(name) : [name];
        console.log("proso");
        console.log(newList);
        setActsList(newList);
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
