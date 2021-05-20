import React, { useState } from "react";
import { ContextRow } from "../AddKU/Components/ContextRow/ContextRow";
import styles from "./style.css";

interface DataTableProps {
    name: string;
    headers: string[];
    data: any;
    onDelete?: (index: number) => void;
    onInsert?: any;
    twoInserts?: any;
    children?: any;
}

export const DataTable: React.FC<DataTableProps> = ({
    headers,
    data,
    name,
    onDelete,
    onInsert,
    twoInserts,
    children,
}) => {
    console.log("NESTO ZA PROVERU\n" + JSON.stringify(data));
    const [removingRow, setRemovingRow] = useState<number | undefined>(
        undefined
    );
    const [addingRow, setAddingRow] = useState<boolean>(false);

    const setRemovalContext = (index: number) => {
        setRemovingRow(index);
    };
    const unsetRemovalContext = () => {
        setRemovingRow(undefined);
    };
    const AddBlock = children;
    return (
        <div className={styles.centerContainer}>
            <div>
                <table className={styles.headerTable}>
                    <tbody>
                        <tr>
                            {headers.map((value, index) => {
                                return (
                                    <td key={`${name}-header-${index}`}>
                                        {value}
                                    </td>
                                );
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.bodyContainer}>
                <table className={styles.bodyTable}>
                    <tbody>
                        {data
                            ? data.map((value: any, index: number) => {
                                  return removingRow != index ? (
                                      <tr
                                          key={`${name}-row-${index}`}
                                          onContextMenu={() => {
                                              if (onDelete)
                                                  setRemovalContext(index);
                                          }}
                                      >
                                          {typeof value !== "string" ? (
                                              Object.keys(value).map(
                                                  (
                                                      keyname: any,
                                                      colIndex: number
                                                  ) => {
                                                      return (
                                                          <td
                                                              key={`${name}-row-data-${colIndex}`}
                                                          >
                                                              {value[keyname]}
                                                          </td>
                                                      );
                                                  }
                                              )
                                          ) : (
                                              <td
                                                  key={`${name}-row-${index}-data-${index}`}
                                              >
                                                  {value}
                                              </td>
                                          )}
                                      </tr>
                                  ) : (
                                      <tr key={index}>
                                          <td colSpan={headers.length}>
                                              <ContextRow
                                                  id={`${name}-remove-row-${index}`}
                                                  key={index}
                                                  title={"Обриши"}
                                                  color={"#D9534F"}
                                                  onClick={() => {
                                                      onDelete!(index);
                                                      unsetRemovalContext();
                                                  }}
                                                  onClickOutside={() => {
                                                      unsetRemovalContext();
                                                  }}
                                              />
                                          </td>
                                      </tr>
                                  );
                              })
                            : undefined}
                    </tbody>
                </table>
                {onInsert || twoInserts ? (
                    <div className={styles.buttonDiv}>
                        {!addingRow ? (
                            <button
                                className={styles.addButton}
                                onClick={() => {
                                    setAddingRow(true);
                                }}
                            >
                                Додај
                            </button>
                        ) : AddBlock ? (
                            <AddBlock
                                onSubmit={twoInserts ? twoInserts : onInsert}
                                onClose={() => {
                                    setAddingRow(false);
                                }}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                ) : undefined}
            </div>
        </div>
    );
};
